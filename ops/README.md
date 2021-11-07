# Ops
This folder contains DevOps related files.

Folder Structure
- Microservices Manifest: `/base`, `/overlays` and `/clusters`
- CD Configuration: `/clusters`
- Autoscaling: `/autoscale` and respective manifest folder in `/base`
- Ingress: `/ingress`
- Monitoring & Logging: `/monitoring`
- EKS Setup: `/terraform-eks`
- GKE Setup: `/terraform-google`

Each folder will contain more deployment instructions.

## Deployment of Microservices

Kustomization is used to create base files, which will be used in both staging and production server without duplicating and modifying the files to suit each environment needs. Hence, the entry point of deployment should be from the `/clusters` folder, where the image transformer tags has already been set to the latest version.
If there's a need to add more resources or modify a certain label to fit deployment needs, please modify only either the Kustomization file in `/overlays` or `/clusters`.

