'use strict'

const core = require('@actions/core');
const { promises: fs } = require('fs');

const main = async () => {
  const filePaths = core.getInput('files');
  const output = "";
  for (var filePath in filePaths){
    if(filePaths.includes("migrations")){
      output += `==========================${filePath}==========================\n\n`;
      const content = await fs.readFile(filePath, 'utf8');
      output += content + "\n\n";
    }
  }
  core.setOutput('content', output);
}

main().catch(err => core.setFailed(err.message));
