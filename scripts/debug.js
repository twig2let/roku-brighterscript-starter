(async () => {
    try {
        await require('../pipeline/debug-pipeline');
    } catch (err) {
        console.error('[Debug|Error]', err.message);
        process.exitCode = 1;
    }
})();
