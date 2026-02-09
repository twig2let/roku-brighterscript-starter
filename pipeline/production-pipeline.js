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
    console.log('[Pipeline|Info] Running production build pipeline:');

    try {
        for (const step of steps) {
            console.log(`[Pipeline|Info] Step: ${step.name}...\n`);
            await step.fn();
        }
    } catch (err) {
        console.error('[Pipeline|Error]', err.message);
        await fs.remove('out');

        throw new Error('Production build pipeline failed.');
    }
})();
