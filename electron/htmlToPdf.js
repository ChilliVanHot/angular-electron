const { BrowserWindow } = require('electron');
const log = require('electron-log');
const isDev = require('electron-is-dev');
const os = require('os');
const fs = require('fs');
const path = require("path");


module.exports = {

    /**
     * @description This method is used to convert HTML to PDF from content
     * @param {String} typeOfFile Type of file you want to generate
     * @param {String} filePath Path of html content file
     * @param {String} fileName File name of the HTML content file
     * @param {String} toBeGenFilename File name of to be generated file
     *
     */
    generatePdf: async (htmlContent, filename) => {
        console.log('generatePdf:' + filename);
        // console.log('htmlContent:' + htmlContent);

        return new Promise((resolve, reject) => {

            const pdfPath = path.join(os.tmpdir(), filename + '.pdf');
            log.debug('====================== createPdf: pdfPath =============================', pdfPath);

            const htmlPath = path.join(os.tmpdir(), filename + '.html');
            log.debug('====================== createPdf: htmlPath =============================', htmlPath);

            fs.writeFileSync(htmlPath, htmlContent);

            let pdfWindow = new BrowserWindow({
                width: 800,
                height: 600,
                center: true,
             //   resizable: true,
                show: false,
                frame: true,
             //   transparent: false,
            });

            pdfWindow.setMenu(null);
            // pdfWindow.loadURL('data:text/html;charset=utf-8,' + encodeURI(htmlContent));
            pdfWindow.loadFile(htmlPath);
            log.debug('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'+htmlPath)
            // Only show devtools in development environment
            // if (isDev) {
            //     pdfWindow.show();
            //     pdfWindow.openDevTools();
            // }

            pdfWindow.on("closed", function () {
                pdfWindow = null;
            });

            pdfWindow.once('ready-to-show', () => {
                log.debug('pdfWindow.ready-to-show');

                const options = {
                    marginsType: 0,
                    pageSize: 'A4',
                    printBackground: true,
                    printSelectionOnly: false,
                    landscape: false
                };

                pdfWindow.webContents.printToPDF(options)
                    .then(data => {
                        fs.writeFileSync(pdfPath, data);
                        pdfWindow.close();

                        resolve(pdfPath);
                    })
                    .catch(error => {
                        log.debug('====================== printToPDF: ERROR =============================', error);

                        pdfWindow.close();

                        return reject(error);
                    }
                );
            });
        });
    }
}
