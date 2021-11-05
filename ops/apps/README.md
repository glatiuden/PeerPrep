# Apps Folder

This folder contains manifest (deployment, service, hpa) for each microservices and namespace.

To deploy all the services to your own cluster:

```bash
kustomize build . | kubectl apply -f -
```

Otherwise, go to each individual manifest/<SERVICE NAME> folder to apply the same command as above. Alternatively, you can also run the following command:
```bash
kubectl apply -f .
```

A script file is also included in the directory to create `regcreds` to pull the Docker image from ECR, in case you are deploying in other clusters other than EKS.