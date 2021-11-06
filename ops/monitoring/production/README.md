# Monitoring
Monitoring is done through Prometheus Operator, which comes with Prometheus and Grafana.

To install monitoring on the cluster, run the following command:
```bash
helm install prometheus --namespace monitoring prometheus-community/kube-prometheus-stack --create-namespace
```

Port Forwarding Method:

To view the Prometheus and Grafana Dashboard,
```bash
kubectl -n monitoring port-forward prometheus-prometheus-kube-prometheus-prometheus-0 9090
kubectl -n monitoring port-forward prometheus-grafana-55464db9f4-5kb2f 3000
```

- Prometheus Dashboard will be available at [http://localhost:9090](http://localhost:9090)
- Grafana Dashboard will be available at [http://localhost:3030](http://localhost:3030)

Logs
```bash
helm install loki --namespace=monitoring grafana/loki
```

Loki is used as a centralized log collectors across the different pods deployed in cluster.
