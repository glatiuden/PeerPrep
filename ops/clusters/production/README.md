# Flux for Production

Please ensure you have already export your `GITHUB_TOKEN` as instructed in `/clusters/README.md`.

```bash
flux bootstrap github \
  --components-extra=image-reflector-controller,image-automation-controller \
  --owner=CS3219-SE-Principles-and-Patterns \
  --repository=cs3219-project-ay2122-2122-s1-g22 \
  --path=./ops/clusters/production \
  --branch=master \
  --token-auth
```

Tell Flux to pull and apply the changes
```bash
flux reconcile kustomization flux-system --with-source
```

To configure image repository settings, please go to `config/images`.
If you need to add an additional service, you may copy one of the yaml files and change the spec/image.