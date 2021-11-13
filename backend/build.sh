# Used for local build only
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 694217600744.dkr.ecr.ap-southeast-1.amazonaws.com

for dir in */; 
do 
  cd $dir
  name="${dir%/}"    
  if [[ $name != "local-build" ]]
  then
    docker buildx build --platform=linux/amd64 -t 694217600744.dkr.ecr.ap-southeast-1.amazonaws.com/$name-ms:1.0.6 .
    docker push 694217600744.dkr.ecr.ap-southeast-1.amazonaws.com/$name-ms:1.0.6
    echo "Deployed $name-MS"
  fi
  cd ../
done
