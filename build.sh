emcc ./sample/src/c/sample.c -o ./sample/src/wasm/sample.wasm -Wall -s WASM=1 -s SIDE_MODULE=1 -s ONLY_MY_CODE=1 -s EXPORTED_FUNCTIONS="['_calc']"
