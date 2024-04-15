#!/bin/bash

IMAGE_NAME=node
DOCKER_BASE_IMAGE=$IMAGE_NAME:18-alpine
DOCKER_TAG=us-central1-docker.pkg.dev/hydro-dashboard-283320/aes-docker-repo/$IMAGE_NAME

VERSION=$1
if [[ -z $VERSION ]]
then
  echo "Missing Version argument (format YYYYMMDD)"
  exit 1
fi

docker pull $DOCKER_BASE_IMAGE
docker tag $DOCKER_BASE_IMAGE $DOCKER_TAG:$VERSION
docker push $DOCKER_TAG:$VERSION
