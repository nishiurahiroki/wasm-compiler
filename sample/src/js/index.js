async function main() {
  const wasm = await fetch('./wasm/sample.wasm')
  const bytes = await wasm.arrayBuffer()
  const module = await WebAssembly.compile(bytes)

  const instance = new WebAssembly.Instance(module, {
    env : {
      STACKTOP : 0,
      STACK_MAX : 256,
      abortStackOverflow : i32 => console.log('stack overflow'),
      memory : new WebAssembly.Memory({ initial : 256, maximum : 256 }),
      table : new WebAssembly.Table({
        initial : 0,
        maximum : 0,
        element : 'anyfunc'
      }),
      memoryBase : 0,
      tableBase : 0
    }
  })

  console.log(instance.exports._calc(10, 100))
}


main()
