require('dotenv').config();

const steps = [
    require('./steps/transpile-brighterscript'),
    require('./steps/insert-tracker-task')
];

module.exports = (async () => {
    console.log(`\nRunning: Development build pipeline...\n`);

    try {
        for (const step of steps) {
            console.log('\n');
            await step();
        }
    } catch (err) {
        console.error('Error: Development build pipeline:', err.message);
        throw new Error('Pipeline execution failed');
    }

    console.log(`\nFinished: Development build pipeline.\n`);
})();
