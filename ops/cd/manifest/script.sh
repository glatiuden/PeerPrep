kubectl create secret docker-registry regcred \
  --docker-server=694217600744.dkr.ecr.ap-southeast-1.amazonaws.com \
  --docker-username=AWS \
  --docker-password=$(aws ecr get-login-password --region ap-southeast-1) \
  --namespace=peerprep
