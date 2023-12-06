#!/bin/bash

IMAGE_NAME=aes-etl-ftp-files
DOCKER_BUILDER=node:16-alpine
DOCKER_TAG=us-central1-docker.pkg.dev/hydro-dashboard-283320/aes-docker-repo/$IMAGE_NAME
VERSION=$1
GIT_TAG=$IMAGE_NAME/$VERSION

if [[ -z $VERSION ]]
then
  echo "Missing Version argument"
  exit 1
fi

VERSION_EXISTS=$(git tag --list | grep $GIT_TAG | wc -l)
if [[ $VERSION_EXISTS -gt 0 ]]
then
  echo "Version $GIT_TAG already exists"
  exit 1
fi

docker build -t $IMAGE_NAME:$VERSION .

docker tag $IMAGE_NAME:$VERSION $DOCKER_TAG:$VERSION

docker push $DOCKER_TAG:$VERSION

git tag $GIT_TAG
git push origin $GIT_TAG
