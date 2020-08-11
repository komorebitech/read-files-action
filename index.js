"use strict";

const core = require("@actions/core");
const { promises: fs } = require("fs");

const main = () => {
  const filePaths = JSON.parse(core.getInput("files"));
  const regularExpression = core.getInput("pattern");

  const pattern = new RegExp(regularExpression);

  console.log(filePaths, pattern);

  const matchingFilePaths = filePaths
  .filter((filePath) => pattern.test(filePath));

  return Promise.all([
    Promise.resolve(matchingFilePaths),
    ...matchingFilePaths.map((filePath) => fs.readFile(process.env.GITHUB_WORKSPACE + "/" + filePath, "utf8"))
  ]);

};

main()
  .then((response) => {

    const [matchingFilePaths, ...fileContents] = response;

    let output = '';

    fileContents.forEach((content, index) => {
      output += `========================== ${matchingFilePaths[index]} ==========================\n\n`;
      output += content + "\n\n";
    })

    core.setOutput("content", output);

  })
  .catch((err) => core.setFailed(err.message));
