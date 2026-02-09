const fs = require('fs-extra');
const path = require('path');

const name = 'MinifyProdOutput';
const repoRoot = path.join(__dirname, '..', '..');
const buildDir = path.join(repoRoot, 'out', 'transpiled');

module.exports = async () => {
    if (process.env.ENV !== 'prod') {
        return;
    }

    try {
        if (!await fs.pathExists(buildDir)) {
            return;
        }

        const files = await _getFiles(buildDir);
        const targets = files.filter((file) => /\.(brs|xml)$/i.test(file));

        for (const file of targets) {
            const ext = path.extname(file).toLowerCase();
            const contents = await fs.readFile(file, 'utf-8');
            const updated = ext === '.brs' ? _minifyBrs(contents) : _minifyXml(contents);

            if (updated !== contents) {
                await fs.writeFile(file, updated);
            }
        }
    } catch (err) {
        throw new Error(`[${name}] Failed to minify prod output (${err.message})`);
    }
};

async function _getFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...await _getFiles(fullPath));
        } else {
            files.push(fullPath);
        }
    }

    return files;
}

function _minifyBrs(contents) {
    const lines = contents.split(/\r?\n/);
    const output = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            continue;
        }

        if (trimmed.startsWith("'") || /^rem\b/i.test(trimmed)) {
            continue;
        }

        const stripped = _stripInlineBrsComment(line).replace(/\s+$/, '');
        if (stripped.trim().length === 0) {
            continue;
        }

        const strippedTrimmed = stripped.trim();
        if (strippedTrimmed.startsWith('?') || /^print\b/i.test(strippedTrimmed)) {
            continue;
        }

        output.push(stripped);
    }

    return output.join('\n');
}

function _stripInlineBrsComment(line) {
    let inString = false;
    let result = '';

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            if (inString && line[i + 1] === '"') {
                result += '""';
                i++;
                continue;
            }

            inString = !inString;
            result += ch;
            continue;
        }

        if (!inString && ch === "'") {
            break;
        }

        result += ch;
    }

    return result;
}

function _minifyXml(contents) {
    const withoutComments = contents.replace(/<!--[\s\S]*?-->/g, '');
    const lines = withoutComments.split(/\r?\n/);
    const output = [];

    for (const line of lines) {
        if (!line.trim()) {
            continue;
        }

        output.push(line.replace(/\s+$/, ''));
    }

    return output.join('\n');
}
