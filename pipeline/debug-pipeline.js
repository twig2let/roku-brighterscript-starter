require('dotenv').config();
const fs = require('fs-extra');

const steps = [
    {
        name: "Transpile Brighterscript",
        fn: require('./steps/transpile-brighterscript')
    },
    {
        name: "Insert Tracker Task",
        fn: require('./steps/insert-tracker-task')
    }
];

module.exports = (async () => {
    const buildMode = process.env.ENV === 'prod' ? 'prod' : 'dev';
    const buildLabel = buildMode === 'prod' ? 'production' : 'development';

    console.log(`[Pipeline] Running ${buildLabel} build pipeline:`);

    try {
        for (const step of steps) {
            console.log(`[Pipeline] Step: ${step.name}...\n`);
            await step.fn();
        }
    } catch (err) {
        await fs.remove('out');
        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Build pipeline failed.');
    }
})();
