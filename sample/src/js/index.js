console.log('start!');

async function hoge() {
  const result = await fetch('./wasm/sample.wasm')
  const bytes = await result.arrayBuffer()
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

  console.log(instance.exports._add(10, 100))
}

hoge()

// fetch('./wasm/sample.wasm')
//   .then(response => response.arrayBuffer())
//   .then(bytes => WebAssembly.compile(bytes))
//   .then(module => WebAssembly.instantiate(module))
//   .then(instance => console.log(instance))
