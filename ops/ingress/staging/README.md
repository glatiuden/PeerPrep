# GKE Ingress for HTTP(S) Load Balancing (GKE Ingress)

The setup instructions follow closely from the [Google official user guide](https://cloud.google.com/kubernetes-engine/docs/concepts/ingress). If there are any unclarity, please do follow the official user guide. This set of instructions is typed out to the developer's fullest knowledge.

## SSL Certificate
If you need it to be communicate over HTTPS, a certificate is required. AWS Certificate Manager do not allow certificate to be used in resources out of AWS.
Hence, the alternative is to use LetsEncrypt. Instructions are referenced from [here](https://kosyfrances.com/ingress-gce-letsencrypt/).

A template is included in the folder called `cert.yaml`. Please replace the placeholder values with your cert's CRT and key in base64.

## Deploying the Ingress 
Please run `kubectl apply -f gke-ingress.yaml` to create the ingress. 

To get the external IP of the ingress, you can run `kubectl get ingress -n peerprep`. After awhile, the external address should be available.

It should be in a format of XX.XXX.XXX.XXX.

If you have already deployed the microservices in the cluster, then you may test by going to `<INGRESS URL ENDPOINT>/user`, it should display a message `User Microservice is running`. Else, please refer to `./ops/README.md` for deployment instructions.