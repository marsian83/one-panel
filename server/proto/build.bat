protoc --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts.cmd --js_out=import_style=commonjs,binary:./node --ts_out=grpc:./node -I proto proto/*.proto
