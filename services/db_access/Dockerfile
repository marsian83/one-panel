FROM golang:alpine as BUILD_IMAGE

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY main.go .
COPY src src
COPY configs configs

RUN go build -o app


FROM scratch 

COPY --from=BUILD_IMAGE /app/app /

CMD [ "/app" ]
