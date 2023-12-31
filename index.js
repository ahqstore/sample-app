module.exports = async function () {
  const { Octokit } = require("octokit");

  const { version } = require("./tauri/package.json");

  const client = new Octokit({
    auth: process.env.token,
  });

  const release = await client.rest.repos.createRelease({
    owner: "ahqstore",
    repo: "sample-app",
    tag_name: `v${version}`,
    name: `AHQ Store Sample App v${version}`,
    draft: true,
  });

  return release.data.id;
};

module.exports.release = async function () {
  const { Octokit } = require("octokit");

  const client = new Octokit({
    auth: process.env.token,
  });

  await client.rest.repos.updateRelease({
    owner: "ahqstore",
    repo: "sample-app",
    release_id: process.env.release_id,
    draft: false,
  });
};
