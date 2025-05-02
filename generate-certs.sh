#!/bin/bash

##### FRONTEND #####
cd frontend

# install mkcert
mkcert -install

# make certs folder
mkdir certs

# do the things
mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost

echo "frontend certs generated"


##### BACKEND #####
cd ../backend

# clean existing dev certificates
dotnet dev-certs https --clean

# trust the HTTPS dev certificate
dotnet dev-certs https --trust

# make certs folder
mkdir certs

# export the dev certificate to a .pfx file with password 'rekt123'
dotnet dev-certs https -ep certs/aspnet-dev.pfx -p rekt123

echo "backend certs generated"
