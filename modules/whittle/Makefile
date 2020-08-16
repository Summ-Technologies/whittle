# Last released = 0.2.12
version=latest
docker-user=jaredhanson11
name=${docker-user}/summn-admin-web

build:
	docker build . -t ${name}:${version}
push: build
	docker push ${name}:${version}
