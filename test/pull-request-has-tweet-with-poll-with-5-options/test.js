/**
 * This test checks the happy path of pull request adding a new *.toot file
 */

const assert = require("assert");

const nock = require("nock");
const tap = require("tap");

// SETUP
process.env.GITHUB_EVENT_NAME = "pull_request";
process.env.GITHUB_TOKEN = "secret123";
process.env.GITHUB_EVENT_PATH = require.resolve("./event.json");

// set other env variables so action-toolkit is happy
process.env.GITHUB_REF = "";
process.env.GITHUB_WORKSPACE = "";
process.env.GITHUB_WORKFLOW = "";
process.env.GITHUB_ACTION = "toot-together";
process.env.GITHUB_ACTOR = "";
process.env.GITHUB_REPOSITORY = "";
process.env.GITHUB_SHA = "";

// MOCK
nock("https://api.github.com", {
  reqheaders: {
    authorization: "token secret123",
  },
})
  // get changed files
  .get("/repos/joschi/toot-together/pulls/123/files")
  .reply(200, [
    {
      status: "added",
      filename: "toots/hello-world.toot",
    },
  ]);

// get pull request diff
nock("https://api.github.com", {
  reqheaders: {
    accept: "application/vnd.github.diff",
    authorization: "token secret123",
  },
})
  .get("/repos/joschi/toot-together/pulls/123")
  .reply(
    200,
    `diff --git a/toots/progress.toot b/toots/progress.toot
new file mode 100644
index 0000000..0123456
--- /dev/null
+++ b/toots/hello-world.toot
@@ -0,0 +6 @@
+Here is my poll
+
+( ) option 1
+( ) option 2
+( ) option 3
+( ) option 4
+( ) option 5`
  );

// create check run
nock("https://api.github.com")
  // get changed files
  .post("/repos/joschi/toot-together/check-runs", (body) => {
    tap.equal(body.name, "preview");
    tap.equal(body.head_sha, "0000000000000000000000000000000000000002");
    tap.equal(body.status, "completed");
    tap.equal(body.conclusion, "success");
    tap.deepEqual(body.output, {
      title: "1 toot(s)",
      summary: `### ❌ Invalid

> Here is my poll

The toot includes a poll, but it has 5 options. A poll must have 2-4 options.`,
    });

    return true;
  })
  .reply(201);

process.on("exit", (code) => {
  assert.equal(code, 0);
  assert.deepEqual(nock.pendingMocks(), []);
});

require("../../lib");
