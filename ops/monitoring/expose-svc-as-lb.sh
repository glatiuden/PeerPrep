# STEP 1: Accessing Grafana via a Load Balancer
kubectl patch svc prometheus-kube-prometheus-prometheus -p '{"spec": {"type": "LoadBalancer"}}' -n monitoring

# STEP 2: Getting the Load Balancer Endpoint -> Copy and paste into your browser
kubectl get svc prometheus-kube-prometheus-prometheus -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' -n monitoring

# STEP 3: Accessing Grafana via a Load Balancer
kubectl patch svc prometheus-grafana -p '{"spec": {"type": "LoadBalancer"}}' -n monitoring

# STEP 4: Getting the Load Balancer Endpoint -> Copy and paste into your browser
kubectl get svc prometheus-grafana -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' -n monitoring

# STEP 5: Getting the admin username and password 
kubectl get secret loki-grafana -o go-template='{{range $k,$v := .data}}{{printf "%s: " $k}}{{if not $v}}{{$v}}{{else}}{{$v | base64decode}}{{end}}{{"\n"}}{{end}}' -n monitoring
