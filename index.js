'use strict'

const core = require('@actions/core');
const { promises: fs } = require('fs');

const main = async () => {
  const filePaths = JSON.parse(core.getInput('files'));
  console.log(filePaths);
  var output = "";

  filePaths.forEach(async(filePath) => {

    if(filePath.includes("migrations")){
      output += `========================== ${filePath} ==========================\n\n`;
      const content = await fs.readFile(process.env.GITHUB_WORKSPACE + "/" + filePath, 'utf8');
      output += content + "\n\n";

    }

  });
  core.setOutput('content', output);
}

main().catch(err => core.setFailed(err.message));
