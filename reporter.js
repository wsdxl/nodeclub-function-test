const report = require('multiple-cucumber-html-reporter');

report.generate({
	jsonDir: './report',
	reportPath: './report/',
	metadata:{
        browser: {
            name: 'chrome',
            version: '60'
        },
        device: 'Local test machine',
        platform: {
            name: 'win7*64',
            version: '16.04'
        }
    }
});