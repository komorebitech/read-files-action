'use strict'

const core = require('@actions/core')
const { promises: fs } = require('fs')

const main = async () => {
  const filePaths = JSON.parse(core.getInput('files'))
  const regularExpression = JSON.parse(core.getInput('pattern'))
  
  const pattern = new RegExp(regularExpression);

  console.log(filePaths, pattern)
  var output = ''

  filePaths.forEach(async filePath => {
    if (pattern.test(filePath)) {
      output += `========================== ${filePath} ==========================\n\n`
      const content = await fs.readFile(filePath, 'utf8')
      output += content + '\n\n'
    }
  })
  core.setOutput('content', output)
}

main().catch(err => core.setFailed(err.message))
