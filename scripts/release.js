const fs = require('fs-extra');
const rokuDeploy = require('roku-deploy');
const pkg = require('../package.json');

function slugify(value) {
    return String(value)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

async function release() {
    const name = slugify(pkg.name || 'roku-app');
    const version = pkg.version;
    const outDir = 'releases';
    const outFile = `${name}-v${version}.zip`;

    await fs.ensureDir(outDir);

    await rokuDeploy.zipPackage({
        outDir,
        stagingDir: 'out/transpiled',
        outFile
    });
}

module.exports = release;

if (require.main === module) {
    release().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
