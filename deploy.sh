echo "Starting to deploy docker image.."
DOCKER_IMAGE=ayoubmoujane/awi-web-front
docker pull $DOCKER_IMAGE
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker run -d -p 5000:80 $DOCKER_IMAGE