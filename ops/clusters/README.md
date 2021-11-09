# Clusters

This folder contains CD cluster configuration using Flux v2.

## Getting Started
Please ensure you have `Flux` installed on your machine. Please follow the instructions [here](https://fluxcd.io/docs/installation/).

In order to deploy the clusters, you’ll need a GitHub account and a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) that can create repositories (check all permissions under `repo`).

Export your GitHub personal access token:
```bash
export GITHUB_TOKEN=<your-token>
```

## Setup

The configuration files are split between `staging` and `production`.

`staging`
- CronJob required to re-create ECR credentials every 6 hours is required as the staging server is hosted in GKE
- Require ECR credentials to scan the images
- Scans for Docker image's tag that is the following format: `'^master-[a-fA-F0-9]+-(?P<ts>.*)'`

`production`
- CronJob is not required as it is deployed on EKS itself. However, a patch is required, which can be found in `production/flux-system/kustomization.yaml`.
- Scans for Docker image's tag that is the following format: `>=1.0.0`

As `staging` and `production` have a different set of tag requirements, to retain the original manifest files from `bases/manifest`, a `kustomization.yaml` file is created within each folder, and Flux will only update the `kustomization.yaml`.

## Installation
Please go to the respective folders for the installation command.