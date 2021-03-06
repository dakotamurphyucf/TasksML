open Jest
open Task

open Task.Operators;

let timeout = value =>
  Task(
    (_, res) => {
      let timer = Js.Global.setTimeout(() => res(value), value);
      Cancel(() => Js.Global.clearTimeout(timer));
    },
  );
let notTimeout = value =>
  Task(
    (_, res) => {
      res(value);
      NoCancel;
    },
  );
let p =
  ([1, 2, 3, 4, 5, 6, 7, 8, 9] |> List.map(timeout))
  @ (
    Array.make(10000, 1)
    |> Array.mapi((index, _) => index + 10)
    |> Array.map(notTimeout)
    |> Array.to_list
  )
  |> parallel
  >>| List.fold_left((a, b) => a + b, 0)

let makeTask = i =>
  switch (i) {
  | i when i >= 100000 => (i + 1) -> Done |> pure
  | i when i < 0 => reject("i must be positive")
  | i => pure(Next(i + 1))
  };

let t =
  p
  >>= chainRec(makeTask)
  >>| (m => m + 10)
  >>= (m => pure(m + 100))
  >>|! (_ => 100)
  >>= reject
  >>=! (m => pure(m + 100))
  >>> fun
       | Rejection(v) => Js.log(v)
       | Success(s) => Js.log(s)

let () =

describe("Testing Task", () => {
  open Expect;

  testAsync("basic run", cb => {
    let simpleTask = Task(
      (_, res) => {
        res(10)
        NoCancel
      }
    )
    simpleTask ->
      run(status => cb(expect(status) |> toEqual(Success(10)))) |> ignore
  });

  testAsync("Cancelation Test", cb => {
    let cancel = timeout(100) ->
      run(fun | Rejection(_) => cb(fail("should not reject")) | Success(_) => cb(fail("should not run")))
    cancel()
    Js.Global.setTimeout(() => cb(pass), 110) |> ignore
  });

});