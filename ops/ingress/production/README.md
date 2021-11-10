# AWS Load Balancer Controller (ALB)

The setup instructions follow closely from the [AWS official user guide](https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html). If there are any unclarity, please do follow the official user guide. This set of instructions is typed out to the developer's fullest knowledge.

## OIDC
If you have not set up an OIDC, you may run the following command or create on the AWS console.

```bash
eksctl utils associate-iam-oidc-provider \
    --region <region> \
    --cluster <eks cluster name> \
    --approve
```

## IAM 
The IAM Policy required is included in the folder itself.
You can choose to create on AWS web console or via the following command:

```bash
aws iam create-policy \
    --policy-name AWSLoadBalancerControllerIAMPolicy \
    --policy-document file://alb-policy.json
```

To create the service account, please change the areas marked with comments in the `rbac-role-alb-ingress-controller.yaml`. The changes are mainly your IAM arn.
Next, you need to create the service account in the cluster:
```bash
kubectl apply -f rbac-role-alb-ingress-controller.yaml
```

Next, you need to set the OIDC in your AWS IAM role. You may do it directly on AWS console, or you can go to `terraform-aws/eks-cluster` and modify the `"aws_iam_role" "main-cluster"`, replace the OIDC link with your own and run `terraform apply` to update the IAM role in your cluster.

## ALB Ingress Controller
Lastly, it is the configuration of the ALB Ingress Controller. Change the required fields in the `alb-ingress-controller.yaml` to your own such as cluster name, region and VPC ID.

Once it's done, please run
```bash
kubectl apply -f alb-ingress-controller.yaml
```

## SSL Certificate
An SSL certificate is required before proceeding. If you have not created one yet, please follow the instruction in `./ops/README.md`.
Copy the certificate ARN to replace the one in `ingress.yaml`.

Once it's done, please run `kubectl apply -f ingress.yaml` to create the ingress. 

To get the external IP of the ingress, you can run `kubectl get ingress -n peerprep`. After awhile, the external address should be available.

You may test by going to `<URL ENDPOINT>/user`, it should display a message `User Microservice is running`