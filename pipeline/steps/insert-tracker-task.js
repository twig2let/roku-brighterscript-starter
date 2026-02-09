module.exports = async () => {
    const fs = require('fs-extra');

    const trackerTaskPath = './TrackerTask-3.2.0.xml';
    const targetPath = './out/transpiled/components/TrackerTask.xml';

    console.log('[Pipeline|Info] Running: Insert Tracker Task...');

    try {
        await fs.copy(trackerTaskPath, targetPath);
    } catch (err) {
        throw new Error('Failed to insert Tracker Task');
    }

    console.log('[Pipeline|Info] Finished: Insert Tracker Task');
};
