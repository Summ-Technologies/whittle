# Last released = 0.2.2
version=0.2.2
docker-user=jaredhanson11
name=${docker-user}/whittle

build:
	docker build . -t ${name}:${version}
push: build
	docker push ${name}:${version}
