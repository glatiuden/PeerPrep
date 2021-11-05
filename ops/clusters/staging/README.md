CI/CD for Staging Server

```bash
flux bootstrap github \
  --components-extra=image-reflector-controller,image-automation-controller \
  --owner=CS3219-SE-Principles-and-Patterns \
  --repository=cs3219-project-ay2122-2122-s1-g22 \
  --path=./ops/clusters/staging \
  --branch=master \
  --token-auth
```