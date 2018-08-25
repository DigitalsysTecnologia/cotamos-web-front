$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t web-front .
docker tag web-front:latest 294895378661.dkr.ecr.us-east-1.amazonaws.com/web-front:latest
docker push 294895378661.dkr.ecr.us-east-1.amazonaws.com/web-front:latest