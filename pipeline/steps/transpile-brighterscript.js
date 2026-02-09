const { groupBy } = require('lodash');
const { ProgramBuilder, DiagnosticSeverity } = require('brighterscript');
const bsConfig = require('../../bsconfig.json');

module.exports = async () => {
    console.log('[Pipeline|Info] Running: Transpiling BrighterScript...');

    try {
        const builder = new ProgramBuilder();
        const isProduction = process.env.ENV === 'prod';
        const config = {
            ...bsConfig,
            sourceMap: isProduction ? false : bsConfig.sourceMap
        };

        await builder.run(config).finally(() => {
            const diagnostics = groupBy(builder.program.getDiagnostics(), 'severity');
            const errors = diagnostics[DiagnosticSeverity.Error] || { length: 0 };
            if (errors.length > 0) {
                return new Error(`found ${errors.length} error${errors.length !== 1 ? 's' : ''} during compilation`);
            }
        });
    } catch (err) {
        throw new Error('Failed to transpile BrighterScript');
    }

    console.log('[Pipeline|Info] Finished: Transpiling BrighterScript');
};
