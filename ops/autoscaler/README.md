# Autoscaler

## Cluster Autoscaler
The cluster autoscaler follows closely from the [AWS official user guide](https://docs.aws.amazon.com/eks/latest/userguide/cluster-autoscaler.html)

## IAM Policy

The IAM Policy required is included in the folder itself.
You can choose to create on AWS web console or via the following command
```bash
aws iam create-policy \
    --policy-name AmazonEKSClusterAutoscalerPolicy \
    --policy-document file://cluster-autoscaler-policy.json
```

Next, you need to create an IAM service account on your cluster using the following command:
```bash
eksctl create iamserviceaccount \
  --cluster=<your-cluster-name> \
  --namespace=kube-system \
  --name=cluster-autoscaler \
  --attach-policy-arn=arn:aws:iam::<AWS_ACCOUNT_ID>:policy/<AmazonEKSClusterAutoscalerPolicy> \
  --override-existing-serviceaccounts \
  --approve
```

A service account should be created in your EKS cluster. You can verify by using `kubectl get serviceaccounts -n kube-system`.

To apply the cluster autoscaler, please change the areas marked with comments in the `cluster-autoscaler.yaml`. The changes are mainly your IAM ARN and your cluster name.

Once its done, you can apply it to your cluster by typing
```bash
kubectl apply -f cluster-autoscaler.yaml
```

## Horizontal Pod Autoscaler (HPA)

Please apply run:
```bash
kubectl apply -f metric-server.yaml
```

To scale up any of the pods, you may go to base/manifest/<SERVICE NAME>, and you will find the hpa.yaml in the folder itself.
To apply, uncomment the `hpa.yaml` in the `kustomization.yaml` file in the service's folder.
Then, go to `clusters/production` or `clusters/staging` to apply the changes.

To verify whether the HPA is deployed, you may do `kubectl get hpa -n peerprep`.