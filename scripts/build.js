(async () => {
    try {
        const buildMode = process.env.ENV === 'prod' ? 'prod' : 'dev';
        const pipeline =
            buildMode === 'prod'
                ? require('../pipeline/production-pipeline')
                : require('../pipeline/debug-pipeline');

        await pipeline;
    } catch (err) {
        console.error('[Pipeline|Error]', err.message);
        process.exitCode = 1;
    }
})();
