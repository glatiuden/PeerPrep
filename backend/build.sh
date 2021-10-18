# Used for CI/CD locally only
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 694217600744.dkr.ecr.ap-southeast-1.amazonaws.com
for dir in */; 
do 
  cd $dir
  name="${dir%/}"    
  docker buildx build --platform=linux/amd64 -t $name-ms:latest .
  docker tag $name-ms:latest 694217600744.dkr.ecr.ap-southeast-1.amazonaws.com/$name-ms:latest
  docker push 694217600744.dkr.ecr.ap-southeast-1.amazonaws.com/$name-ms:latest
  echo "Deployed to $name-MS"
done
