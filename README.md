# read-migration-files-action

Read Django migration files content.

## Usage

```yaml
steps:
  - name: Read migrations
    id: migrations
    uses: komorebitech/read-migration-files-action@v1.4
    with:
      files: '["/migrations/001_initial.py", "/migrations/002_auto_2020_08_11_545462.py"]'
  - name: Echo migrations
    run: echo ${{ steps.migrations.outputs.content }}
```

## License

MIT
