 * This test checks the happy path of pull request adding a new *.toot file
process.env.GITHUB_ACTION = "toot-together";
  .get("/repos/joschi/toot-together/pulls/123/files")
      filename: "toots/hello-world.toot",
  .get("/repos/joschi/toot-together/pulls/123")
    `diff --git a/toots/progress.toot b/toots/progress.toot
+++ b/toots/hello-world.toot