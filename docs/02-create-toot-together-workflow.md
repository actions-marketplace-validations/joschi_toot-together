[back to README.md](../README.md/#setup)

# Create a `.github/workflows/toot-together.yml` file

In your repository, open the Actions tab.

![](workflow-01-actions-tab.png)

Press the <kbd>Setup a new workflow yourself</kbd> button to open the file editor.

![](workflow-02-editor.png)

In the filename input above the code area, replace `main.yml` with `toot-together.yml`. Then replace the code:

```yml
on: [push, pull_request]
name: Toot, together!
jobs:
  preview:
    name: Preview
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: joschi/toot-together@v1.x
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  toot:
    name: Toot
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/master'
    steps:
      - name: checkout master
        uses: actions/checkout@v2
      - name: Toot
        uses: joschi/toot-together@v1.x
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # URL to the instance hosting your Mastodon account
          MASTODON_URL: https://www.mastodon.example/
          MASTODON_ACCESS_TOKEN: ${{ secrets.MASTODON_ACCESS_TOKEN }}
```

Make sure to replace `'master'` if you changed your repository's default branch.

![](workflow-04-commit.png)

To create the file, press the <kbd>Start commit</kbd> button. You can optionally set a custom commit message, then press <kbd>Commit new file</kbd>.

---

Nearly done! Shortly after creating or updating `.github/workflows/toot-together.yml` in your repository’s default branch, a pull request will be created with further instructions.

[back to README.md](../README.md/#setup)
