import wasmInit from './pkg/webassembly_linear_memory.js'
const runWasm = async () => {
    const rustWasm = await wasmInit("./pkg/webassembly_linear_memory_bg.wasm");
  
    /**
     * Part one: Write in Wasm, Read in JS
     */
    console.log("Write in Wasm, Read in JS, Index 0:");
  
    // First, let's have wasm write to our buffer
    rustWasm.store_value_in_wasm_memory_buffer_index_zero(24);
  
    // Next, let's create a Uint8Array of our wasm memory
    let wasmMemory = new Uint8Array(rustWasm.memory.buffer);
  
    // Then, let's get the pointer to our buffer that is within wasmMemory
    let bufferPointer = rustWasm.get_wasm_memory_buffer_pointer();
  
    // Then, let's read the written value at index zero of the buffer,
    // by accessing the index of wasmMemory[bufferPointer + bufferIndex]
    console.log(wasmMemory[bufferPointer + 0]); // Should log "24"
  
    /**
     * Part two: Write in JS, Read in Wasm
     */
    console.log("Write in JS, Read in Wasm, Index 1:");
  
    // First, let's write to index one of our buffer
    wasmMemory[bufferPointer + 1] = 15;
  
    // Then, let's have wasm read index one of the buffer,
    // and return the result
    console.log(rustWasm.read_wasm_memory_buffer_and_return_index_one()); // Should log "15"
  
    /**
     * NOTE: if we were to continue reading and writing memory,
     * depending on how the memory is grown by rust, you may have
     * to re-create the Uint8Array since memory layout could change.
     * For example, `let wasmMemory = new Uint8Array(rustWasm.memory.buffer);`
     * In this example, we did not, but be aware this may happen :)
     */
  };
  runWasm();