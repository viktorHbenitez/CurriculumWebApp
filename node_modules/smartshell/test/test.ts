import { expect, tap } from 'tapbundle'

import * as smartshell from '../dist/index'
import * as smartq from 'smartq'

let testSmartshell: smartshell.Smartshell

tap.test('smartshell should run async', async () => {
  let execResult = await smartshell.exec('npm -v')
  expect(execResult.stdout).to.match(/[0-9\.]*/)
})

tap.test('smartshell should run async and silent', async () => {
  let execResult = await smartshell.execSilent('npm -v')
  expect(execResult.stdout).to.match(/[0-9\.]*/)
})

tap.test('smartshell should stream a shell execution', async () => {
  let done = smartq.defer()
  let execStreamingResponse = smartshell.execStreaming('npm -v')
  execStreamingResponse.childProcess.stdout.on('data', data => {
    done.resolve(data)
  })
  let data = await done.promise
  expect(data).to.match(/[0-9\.]*/)
  await execStreamingResponse.finalPromise
})

tap.test('it should execute and wait for a line in the output', async () => {
  await smartshell.execAndWaitForLine('echo "5.0.4"', /5.0.4/)
})

// Smartshell class

tap.test('smartshell should create a Smartshell instance', async () => {
  testSmartshell = new smartshell.Smartshell({
    executor: 'bash',
    sourceFilePaths: []
  })
  expect(testSmartshell).to.be.instanceof(smartshell.Smartshell)
})

tap.test('smartshell should run async', async () => {
  return testSmartshell.execSilent('sleep 1 && npm -v').then(async (execResult) => {
    console.log(execResult.stdout)
  })
})

tap.start({
  throwOnError: true
})
