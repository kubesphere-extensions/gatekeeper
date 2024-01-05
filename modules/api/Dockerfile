FROM golang:1.20 as build_context

WORKDIR /workspace
ADD . /workspace/

RUN CGO_ENABLED=0 go build -o bin/apiserver .

FROM scratch

COPY --from=build_context /workspace/bin/apiserver /usr/local/bin/apiserver

WORKDIR /app

CMD ["apiserver"]