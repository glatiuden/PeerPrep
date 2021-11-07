# Clusters

This folder contains CD cluster configuration using Flux v2.

The configuration files are split between `staging` and `production`.

`staging`
- CronJob required to re-create ECR credentials every 6 hours is required as the staging server is hosted in GKE
- Require ECR credentials to scan the images
- Scans for Docker image's tag that is the following format: `'^master-[a-fA-F0-9]+-(?P<ts>.*)'`

`production`
- CronJob is not required as it is deployed on EKS itself. However, a patch is required, which can be found in `production/flux-system/kustomization.yaml`.
- Scans for Docker image's tag that is the following format: `>=1.0.0`

As `staging` and `production` have a different set of tag requirements, to retain the original manifest files from `bases/manifest`, a `kustomization.yaml` file is created within each folder, and Flux will only update the `kustomization.yaml`.