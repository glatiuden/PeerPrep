# Overlay Folder

The purpose of the overlay folder is to set the number of replicas per deployment.
It allows modification to the base manifest files by using Kustomization transformer or strategic merge patch. More information can be found [here](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/).

By default, there are no image name/tag in the default base/manifest. Therefore, before proceeding, you need to modify the manifest's deployment files of your choice's image name/tag.

Otherwise, please use the `clusters` folder where the image transformer is already set for CD's purpose.

If you have already done the above and you wish to deploy using this folder, please make sure you are in the respective folder (staging/production):

```bash
kustomize build . | kubectl apply -f -
```

## Configuration

By default, the staging server will have 1 replica set running per microservice. The production server will have 2 replica sets running per microservice.
These numbers can be modified via the respective `kustomization.yaml` file in the folder.