@echo off
setlocal

set PROTOC_GEN_TS_PATH=./node_modules/.bin/protoc-gen-ts
set PROTOC_GEN_TS_PLUGIN=protoc-gen-ts.cmd

"%PROTOC_GEN_TS_PATH%" ^
  --plugin=protoc-gen-ts="%PROTOC_GEN_TS_PLUGIN%" ^
  --js_out=import_style=commonjs,binary:%2 ^
  --ts_out=grpc:%2 ^
  -I %1 %1/*.proto

endlocal
