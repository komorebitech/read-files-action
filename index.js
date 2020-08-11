'use strict'

const core = require('@actions/core');
const { promises: fs } = require('fs');

const main = async () => {
  const filePaths = core.getInput('files').split(" ");
  console.log(filePaths);
  var output = "";
  filePaths.forEach(async(filePath) =>{
    console.log(filePath);
    if(filePath.includes("migrations")){
      output += `==========================${filePath}==========================\n\n`;
      const content = await fs.readFile(filePath, 'utf8');
      output += content + "\n\n";
      console.log(content);
    }
  });
  core.setOutput('content', output);
}

main().catch(err => core.setFailed(err.message));
