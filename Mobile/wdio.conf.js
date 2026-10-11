
const path = require('path');

exports.config = {
  runner: 'local',

  specs: ['./test/specs/**/*.spec.js'],

  maxInstances: 1,

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',

      'appium:deviceName': process.env.DEVICE_NAME || 'emulator-5554',

      'appium:platformVersion':
        process.env.PLATFORM_VERSION || undefined,

      'appium:app':
        process.env.APP_PATH ||
        path.join(process.cwd(), 'app', 'loja-ebac.apk'),

      'appium:appPackage': 'com.woocommerce.android',
'appium:appActivity': 'com.woocommerce.android.ui.main.MainActivity',
'appium:appWaitActivity': 'com.woocommerce.android.*',
      'appium:appWaitDuration': 60000,

      'appium:autoGrantPermissions': true,

      'appium:noReset': false,

      'appium:newCommandTimeout': 240,
    },
  ],

  services: [
    [
      'appium',
      {
        args: {
          address: '127.0.0.1',
          port: 4723,
        },
        command: 'appium',
      },
    ],
  ],

  port: 4723,

  logLevel: 'info',

  waitforTimeout: 15000,

  framework: 'mocha',

  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  reporters: [
    'spec',

    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
};
