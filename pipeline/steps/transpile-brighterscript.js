const { groupBy } = require('lodash');
const { ProgramBuilder, DiagnosticSeverity } = require('brighterscript');
const bsConfig = require('../../bsconfig.json');

module.exports = async () => {
    console.log('Running: Transpiling BrighterScript...');

    try {
        const builder = new ProgramBuilder();
        await builder.run(bsConfig).finally(() => {
            const diagnostics = groupBy(builder.program.getDiagnostics(), 'severity');
            const errors = diagnostics[DiagnosticSeverity.Error] || { length: 0 };
            if (errors.length > 0) {
                return new Error(`found ${errors.length} error${errors.length !== 1 ? 's' : ''} during compilation`);
            }
        });
    } catch (err) {
        throw new Error('Failed to transpile BrighterScript');
    }

    console.log('Finished: Transpiling BrighterScript');
};
