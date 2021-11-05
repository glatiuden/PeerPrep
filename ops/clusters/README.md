# Clusters

This folder contain CD cluster configuration using Flux v2.

The configuration files is split between `staging` and `production`.

`staging`
- CronJob required to re-create ECR credentials every 6 hours is required as staging server is hosted in GKE
- Require ECR credentials to scan the images
- Scans for Docker image's tag that is the following format: `'^master-[a-fA-F0-9]+-(?P<ts>.*)'`

`production`
- No CronJob required as it is deployed on EKS itself, however, a patch is required, which can be found in `production/flux-system/kustomization.yaml`.
- Scans for Docker image's tag that is the following format: `>=1.0.0`

As `staging` and `production` have different set of tag requirement, to retain the original manifest files from `apps/manifest`, a `kustomization.yaml` file is created within each folder and Flux will only update the `kustomization.yaml`.