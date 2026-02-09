require('dotenv').config();
const fs = require('fs-extra');

const steps = [
    {
        name: "Transpile Brighterscript (prod)",
        fn: require('./steps/transpile-brighterscript')
    },
    {
        name: "Minify Prod Output",
        fn: require('./steps/minify-prod-output')
    }
];

module.exports = (async () => {
    console.log('[Pipeline] Running production build pipeline:');

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
