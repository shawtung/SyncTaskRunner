import Runner from './Runner'

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
