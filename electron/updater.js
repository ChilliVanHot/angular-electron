const { autoUpdater } = require("electron-updater");
// const { dialog } = require('electron');
const log = require('electron-log');
const { EventEmitter } = require('events');


class Updater  extends EventEmitter {
    CLASS_NAME = 'Updater';

    constructor() {
        console.log('CONSTRUCTOR()');
        super();
        console.log(this.CLASS_NAME);

        autoUpdater.logger = require("electron-log");
        autoUpdater.logger.transports.file.level = "debug";
        autoUpdater.allowDowngrade = true;
        autoUpdater.autoDownload = false;

        const isSilent = true;

        autoUpdater.on('checking-for-update', () => {
            log.info('Checking for update...');

            super.emit('updater', { status: 'ok', message: 'Checking for update...' });
        });

        autoUpdater.on('error', (error) => {
            log.info('ERROR', error);

            super.emit('updater', { status: 'error', message: 'Updater Error', error: error });

            // dialog.showErrorBox('Error during the update', error);
            // dialog.showErrorBox('Error during the update', error.message);
        });

        autoUpdater.on('update-available', () => {
            log.info('update-available', isSilent);

            super.emit('updater', { status: 'update-available', message: 'Update available' });

            if (isSilent) {
                autoUpdater.downloadUpdate();
            }
        });

        autoUpdater.on('update-not-available', () => {
            log.info('update-not-available');

            super.emit('updater', { status: 'update-not-available', message: 'Update NOT available' });
        });

        autoUpdater.on('download-progress', (d) => {
            log.info('download-progress', d.percent);

            super.emit('updater', { status: 'download-progress', progress: d.percent });
        });

        autoUpdater.on('update-downloaded', () => {
            log.info('update-downloaded');

            super.emit('updater', { status: 'update-downloaded', message: 'Update downloaded' });
        });

    }

    quitAndInstall() {
        autoUpdater.quitAndInstall(true, true);
    }

    setFeedURL(url) {
        autoUpdater.setFeedURL(url);
    }

    checkForUpdates() {
        autoUpdater.checkForUpdates();
    }
}

module.exports = Updater;
