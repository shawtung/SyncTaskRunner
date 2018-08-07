# SyncTaskRunner

#### A simple class that can run async tasks in order, and more importantly, sleep for specified duration between tasks.

Sometimes we want to sequentially process tasks async but non-promise, such as the UI automation. As we can't know when it is done, and we don't even have callbacks, the last approach is to set a timeout to wait for it to be done. Now that js is single-thread, it doesn't provide sleep-like apis...

## Usage
* `run` takes a normal or async function without parameters.
* `wait` takes a millisecond as the only parameter.
 
```javascript
new Runner()
  .run(() => {
    console.log(1)
  })
  .wait(1000)
  .run(async () => {
    console.log(2)
    await new Promise(r => setTimeout(r, 1000))
    console.log(3)
  })
  .wait(1000)
  .run(() => {
    console.log(4)
  })

// this will output 1 to 4 in order, with one second pause between each two numbers.
```
