const fs = require('fs-extra');
const { groupBy } = require('lodash');
const { ProgramBuilder, DiagnosticSeverity } = require('brighterscript');
const bsConfig = require('../../bsconfig.json');

module.exports = async () => {
    console.log('[Pipeline] Running: Transpiling BrighterScript...');

    try {
        const builder = new ProgramBuilder();
        const isProduction = process.env.ENV === 'prod';
        const config = {
            ...bsConfig,
            sourceMap: isProduction ? false : bsConfig.sourceMap
        };

        await builder.run(config);

        const diagnostics = groupBy(builder.program.getDiagnostics(), 'severity');
        const errors = diagnostics[DiagnosticSeverity.Error] || { length: 0 };
        if (errors.length > 0) {
            throw new Error(`found ${errors.length} error${errors.length !== 1 ? 's' : ''} during compilation`);
        }
    } catch (err) {
        await fs.remove('out');
        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Failed to transpile BrighterScript');
    }

    console.log('[Pipeline] Finished: Transpiling BrighterScript');
};
