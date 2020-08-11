# read-files-action

Reads the content of files which match the pattern.

## Usage

```yaml
steps:
  - name: Read migrations
    id: migrations
    uses: komorebitech/read-files-action@v1.5
    with:
      files: '["/migrations/001_initial.py", "/migrations/002_auto_2020_08_11_545462.py"]'
  - name: Echo migrations
    run: echo "${{ steps.migrations.outputs.content }}"
```

## Example Usecase

Here is an example if you want to get all the changes in the migration files of a project and notify some of your team members about the schema changes.
It gets changed files using an action, reads the content of the new migration files using this action and then sends emails to a list.

```yaml
name: Detect Schema Change

on:
  pull_request:
    types: [closed]
    branches:
      - master
    paths:
      - '**migrations**'

jobs:
  detect-schema-change:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - uses: lots0logs/gh-action-get-changed-files@2.1.4
      id: get_changed_files
      with:
        token: "${{secrets.GITHUB_TOKEN}}"
    - uses: komorebitech/read-files-action@v1.5
      id: read_migration_files
      with:
        files: ${{ steps.get_changed_files.outputs.added }}
        pattern: 'migrations'
    - name: Send email
      uses: dawidd6/action-send-mail@v2
      with:
        server_address: ${{secrets.SMTP_SERVER}}
        server_port: ${{secrets.SMTP_PORT}}
        username: ${{secrets.SMTP_USER}}
        password: ${{secrets.SMTP_PASSWORD}}
        subject: Database Schema Changed
        to: xyz@example.com, abc@example.com
        from: "Team Example <team@example.com>"
        content_type: text/plain
        body: ${{ steps.read_migration_files.outputs.content }}
```

## License

MIT
