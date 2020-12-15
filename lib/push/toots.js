module.exports = toot;

const mastojs = require("masto");

const parseTootFileContent = require("../common/parse-toot-file-content");

async function toot({ mastodonCredentials }, tootFile) {
  const client = await mastojs.Masto.login({
    uri: mastodonCredentials.uri,
    accessToken: mastodonCredentials.accessToken,
  });

  const toot = parseTootFileContent(tootFile.text);

  const result = await client.createStatus({
    status: toot.text,
    poll: toot.poll,
  });
  return {
    text: result.status,
    url: result.url,
  };
}
