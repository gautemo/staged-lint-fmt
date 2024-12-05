# staged-lint-fmt

Deno lint and format staged file

## Usage

Add `.git/hooks/pre-commit` with content:

```
#!/bin/sh

exec deno run --allow-read --allow-run jsr:@gaute/staged-lint-fmt
```

### Optional arguments

- `--only-fmt`: only run deno fmt (disabled deno lint)
- `--only-lint`: only run deno lint (disabled deno fmt)
