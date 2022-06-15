module.exports = {
  src_folders: ['tests'],
  page_objects_path: 'pageObjects',
  webdriver: {
    start_process: true,
    //port: 4444
    port: 9090 //Added because my machine has troubles with ports
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome'
      },
      webdriver: { server_path: require('chromedriver').path }
    }
  }
};