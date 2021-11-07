# Base

This folder contains manifest (deployment, service, horizontal pod autoscaler) for each microservices and namespace.

By default, there are no image name/tag in the default base/manifest. Therefore, before proceeding, you need to modify the respective manifest's deployment files of your choice's image name/tag.

Otherwise, please use the `clusters` folder where the image transformer is already set for CD's purpose.

If you have already done the above and you wish to deploy using this folder, please make sure you are in the respective folder (staging/production):
```bash
kustomize build . | kubectl apply -f -
```

Otherwise, go to each individual manifest/<SERVICE NAME> folder to apply the same command as above. Alternatively, you can also run the following command:
```bash
kubectl apply -f .
```

A script file (`script.sh`) is also included in the directory to create `regcreds` to pull the Docker image from ECR, in case you are deploying in other clusters other than EKS.

A minimal modification should be done within the manifest files as it serves as the base for Kustomization. If there is a need for additional resources, please use the `overlays` folder to modify the required resources.

## Horizontal Pod Autoscaling
For each service in the manifest folder, `hpa.yaml` is commented out in the `kustomization.yaml` by default.
If you are using horizontal pod autoscaling, please make sure you have `metric-server.yaml` applied to your cluster, then uncomment `- hpa.yaml` within each folder and rebuild by running the command above.
