# TasksML

TasksML offers a system similar to Promises, Tasks, etc. We call them tasks.
Like promises, tasks represent the result stemming from the success or failure of an asynchronous call (Input/output). Tasks are lazy.

(Documentation is a work in progress)
Make sure you have bs-platform >= 4.0.18. Then install with npm:
``npm install --save tasks-ml``

Then add "tasks-ml" to your bsconfig.json dev dependencies:

{
  ...
  "bs-dependencies": [
    "tasks-ml"
  ]
}
<!-- Some of the features provided by Fluture include: -->

<!-- * [Cancellation](#cancellation).
* [Resource management utilities](#resource-management).
* [Stack safe composition and recursion](#stack-safety).
* [Integration](#sanctuary) with [Sanctuary][S].
* [A pleasant debugging experience](#debugging).

For more information:

* [API documentation](#documentation)
* [Wiki: Compare Futures to Promises][wiki:promises]
* [Article: Why Promises shouldn't be used][10]
* [Wiki: Compare Fluture to similar libraries][wiki:similar]
* [Video: Monad a Day - Futures by @DrBoolean][5] -->

## Usage

### Open Module

TasksML is written as modular reasonML. In reasonML modules are like mini files! They can contain type definitions, let bindings, nested modules, etc. A module's contents (including types!) can be accessed much like a record's, using the . notation. This demonstrates modules' utility for namespacing. Constantly referring to a value/type in a module can be tedious. Instead, we can "open" a module and refer to its contents without always prepending them with the module's name.

```reason
Open Task
let timeout = value => Task((rej, res) => {
  let timer = Js.Global.setTimeout(() => {res(value)}, 1000)
  Cancel(() => Js.Global.clearTimeout(timer))
})
```

## Creating Tasks

### Tasks

Creates a tasks with the given computation. A computation is a function which takes two callbacks. Both are continuations for the computation. The first is reject, commonly abbreviated to rej; The second is resolve, or res. When the computation is finished (possibly asynchronously) it may call the appropriate continuation with a failure or success value.
Additionally, the computation may return a nullary function containing cancellation logic. See Cancellation.

```reason
let timeout = value => Task((rej, res) => {
  let timer = Js.Global.setTimeout(() => {res(value)}, 1000)
  Cancel(() => Js.Global.clearTimeout(timer))
})
```

### Reject

Creates a task which immediately rejects with the given value.

```reason
let sampleReject = Task.reject("Sample reject text!");
sampleReject |> run (
    status  =>
        switch (status) {
        | Rejection(e) => Js.log("Rejection Case", e)
        | Success(s) => Js.log("This will never run", s) //this sample immediately rejects
    }
);
//! "Rejection Case! Sample reject text!"
```

### Identity

Creates a task which immediately resolves with the given value

```reason
let sampleReject = Task.reject("Sample resolve text!");
sampleReject |> run (
    status  =>
        switch (status) {
        | Rejection(e) => Js.log("This will never run", e) //this sample immediately resolves
        | Success(s) => Js.log("Success Case", s)
    }
);
//! "Success Case! Sample resolve text!"
```

Note: The Compiled Javascript is located in the lib/js folder
