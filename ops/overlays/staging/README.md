# CronJob to fetch AWS ECR Credentials

Please create a secrets named `aws-credentials` before applying this folder. A yaml template is included in this folder. 
It is required to create cronjob to fetch ECR credentials.

A cronjob `ecr-credentials-sync` is created upon deploying this folder.

Since the cronjob will not create a job right away, after applying the manifest, you can manually create an init job using the following command:

```bash
kubectl create job --from=cronjob/ecr-credentials-sync -n peerprep ecr-credentials-sync-init
```