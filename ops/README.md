# Ops
This folder contains DevOps related files.

## Set-Up Requirement
The project heavily relies on `Kustomize`, `Helm`, `Terraform` and `Flux`.
It is recommended to install these applications on your machine before proceeding.
The installation link are as of follow:
- [Kustomize](https://kubernetes-sigs.github.io/kustomize/installation/)
- [Helm](https://helm.sh/docs/intro/install/)
- [Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html)
- [Flux v2](https://fluxcd.io/docs/installation/)

## Setting the Project Up
**Folder Structure**
- Microservices Manifest: `/base`, `/overlays` and `/clusters`
- CD Configuration: `/clusters`
- AWS Setup: `/terraform-aws`
- GCP's GKE Setup: `/terraform-gke`
- Load Balancer & Ingress: `/ingress`
- Autoscaling: `/autoscaler` and respective manifest folder in `/base`
- Monitoring & Logging: `/monitoring`

A recommended sequence of deployment is given as below:
1. (Optional) Obtain a domain name. If there is no domain name, we will be using the default endpoints (e.g. 35.244.207.XXX or xxxxxx.cloudfront.net) 
1. Set-up ECR repository (Refer to the instructions below)
1. Create Staging Cluster (Optional) in `./terraform-gke` (Refer to the instructions below)
1. Deploy the microservices to the staging environment manually in `./clusters/staging/manifest`. (Refer to the instructions below)
1. Create the IAM policy by following the IAM in the `./ingress/alb-policy` as it is best to create before creating the Production Cluster. Please set the values to the Terraform files.
1. Create a SSL Certificate (Refer to the instructions below)
1. Create Production Cluster in `./terraform-aws` (Refer to the instructions below)
1. Create the ALB & Ingress Controller in `./ingress`
1. (Optional) Apply autoscaler in `./autoscaler`
1. (Optional) Apply monitoring & logging in `/monitoring`

The folders without additional instructions in this README will contain **detailed deployment instructions** in their respective folder. 

## Additional Instructions

## ECR Repository
ECR Repository is used in both environments. It is recommended to set it up.

This is an example:
```bash
# Retrieve an authentication token and authenticate your Docker client to your registry.
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 694217600744.dkr.ecr.ap-southeast-1.amazonaws.com

# Build your Docker image using the following command. For information on building a Docker file
docker build -t chat-ms .

# After the build completes, tag your image so you can push the image to this repository:
docker tag chat-ms:latest 694217600744.dkr.ecr.ap-southeast-1.amazonaws.com/chat-ms:latest

# Run the following command to push this image to your newly created AWS repository:
docker push 694217600744.dkr.ecr.ap-southeast-1.amazonaws.com/chat-ms:latest
```

Copy and paste the repository link to `./clusters/staging/manifest/kustomization.yaml` or `./clusters/production/manifest/kustomization.yaml`.
Change the `newName` and `newTag` accordingly. 

## SSL Certificate

Create an SSL Certificate under your domain name in the AWS console. It is recommended to create 2 certificates
- one in `ap-southeast-asia-1` (for ALB) 
- one in `us-east-1` (for CloudFront). 

The certificate is best to have 2 names, one with an asterisk in front (e.g *.peerprep.tech) and one without (e.g. peerprep.tech). 
Copy the ARN to `./terraform-aws/variables.tf`.

### Deployment of Microservices

Kustomization is used to create base files, which will be used in both staging and production servers without duplicating and modifying the files to suit each environment needs. Hence, the entry point of deployment should be from the `/clusters` folder, where the image transformer tags have already been set to the latest version.

If there's a need to [add more resources or modify a certain label](https://github.com/kubernetes-sigs/kustomize/blob/master/examples/transformerconfigs/README.md) to fit deployment needs, please modify only either the Kustomization file in `/overlays` or `/clusters`.

## Creating the Staging Cluster (GKE)
The `terraform-gke` folder is included in this folder. This folder includes the required configuration to set up GKE on your GCP account.

1. Install [Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html) if you haven't.
1. Open `variables.tf` and fill in any required variables that don't have a default.
1. Run `terraform init`
1. Run `terraform get`.
1. Run `terraform plan`.
1. If the plan looks good, run `terraform apply`.

Once it has been deployed successfully, please run the following command to set the config to your kubeconfig:
```bash
gcloud container clusters get-credentials terraform-gke --region asia-southeast1-a --project peerprep-330408
```

## Creating the Production Environment (AWS)
The `terraform-aws` folder is included in this folder. This folder includes the services and specification that was used to create this project.

1. Install [Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html) if you haven't.
1. Open `variables.tf` and fill in any required variables that don't have a default. 
1. There are areas over the files which you should change, namely `eks-cluster.tf`, `eks-worker-nodes.tf` for the Account ID and the OIDC URL. The domain name needs to be changed in `user-cloudfront.tf` and `admin-cloudfront.tf`.
1. Run `terraform init`
1. Run `terraform get`.
1. Run `terraform plan`.
1. If the plan looks good, run `terraform apply`.

Once it has been deployed successfully, please run the following command to set the config to your kubeconfig:
```bash
terraform output kubeconfig > ~/.kube/config
```
