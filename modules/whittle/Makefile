# Last released = 0.1.0
version=latest
docker-user=jaredhanson11
name=${docker-user}/whittle

build:
	docker build . -t ${name}:${version}
push: build
	docker push ${name}:${version}
