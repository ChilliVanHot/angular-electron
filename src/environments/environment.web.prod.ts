import { NgxLoggerLevel } from 'ngx-logger';


export const environment = {
    production: true,

    logging: {
        serverLogUrl: 'https://devdactic.free.beeceptor.com/logs',
        serverLogLevel: NgxLoggerLevel.OFF, // NgxLoggerLevel.ERROR,
        level: NgxLoggerLevel.DEBUG  // NgxLoggerLevel.WARN,
    },

    app: {
        version: require('../../package.json').version,

        language: 'en',
        isSideMenuHidden: false,

        idle: {
            time: 300,
            timeout: 30
        },

        logout: {
            warningTime: 30
        },

        serverUrl: 'https://dxs-dev-upd-api.dxs-systems.com',
        urlUpdate: 'https://axon-releases.dxs-services.com',
        urlEducation: 'https://edu.dxs-services.com',

        urlExpertCareAPI: 'https://pcptest.dxs-systems.com/AccessPoints/handleRecordAxon',
        urlExpertCareUI: 'https://pcptest.dxs-systems.com/ExpertCare_V2/index.html'
        // UrlExpertCareUI: 'http://localhost:5000/index.html?origin=axon'
    }
};
