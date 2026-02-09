(async () => {
    try {
        await require('../pipeline/debug-pipeline');
    } catch (err) {
        console.error('[Pipeline|Error]', err.message);
        process.exitCode = 1;
    }
})();
