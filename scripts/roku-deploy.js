require('dotenv').config();

const rokuDeploy = require('roku-deploy');
const runDevelopmentPipeline = require('../pipeline/debug-pipeline');

async function deployWithPipeline() {
    await runDevelopmentPipeline;
    await rokuDeploy.zipPackage({
        outDir: 'out',
        stagingDir: 'out/transpiled',
        outFile: 'roku-deploy.zip'
    })

    await rokuDeploy.publish({
        outDir: 'out',
        outFile: 'roku-deploy.zip',
        host: process.env.ROKU_IP,
        password: process.env.ROKU_DEV_PASSWORD
    });
}

module.exports = deployWithPipeline;

if (require.main === module) {
    deployWithPipeline().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
