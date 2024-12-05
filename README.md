# staged-lint-fmt

Deno lint and format staged file

## Usage

Add `.git/hooks/pre-commit` with content:

```
#!/bin/sh

exec deno run --allow-read --allow-run jsr:@gaute/staged-lint-fmt
```
