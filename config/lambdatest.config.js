const LT_USERNAME = process.env.LT_USERNAME || 'pushpalchakraborti2014';
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY || 'LT_22KXi0gCk9yvDkZTFhf60N7mxt3jsXVOo7dRZhOqU2SylOt';

/**
 * LambdaTest configuration for different browsers and platforms
 */
const lambdaTestConfig = {
  // Common LT options
  commonLTOptions: {
    user: LT_USERNAME,
    accessKey: LT_ACCESS_KEY,
    build: process.env.LT_BUILD_NAME || 'Playwright-Pushpal-Build',
    project: process.env.LT_PROJECT_NAME || 'Playwright-Automation',
    network: true,
    video: true,
    console: true,
    tunnel: false,
    tunnelName: process.env.LT_TUNNEL_NAME || '',
    selenium_version: '4.0.0'
  },

  // Chrome configurations
  chrome: {
    browserName: 'Chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      name: 'Playwright Test - Chrome'
    }
  },

  chromeLatest: {
    browserName: 'Chrome',
    browserVersion: '120',
    'LT:Options': {
      platform: 'Windows 11',
      name: 'Playwright Test - Chrome Latest'
    }
  },

  // Firefox configurations
  firefox: {
    browserName: 'Firefox',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      name: 'Playwright Test - Firefox'
    }
  },

  // Safari configurations
  safari: {
    browserName: 'Safari',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'macOS Monterey',
      name: 'Playwright Test - Safari'
    }
  },

  safariVentura: {
    browserName: 'Safari',
    browserVersion: '16',
    'LT:Options': {
      platform: 'macOS Ventura',
      name: 'Playwright Test - Safari Ventura'
    }
  },

  // Edge configurations
  edge: {
    browserName: 'MicrosoftEdge',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      name: 'Playwright Test - Edge'
    }
  },

  // Mobile configurations
  mobileChromeAndroid: {
    browserName: 'Chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Android',
      deviceName: 'Galaxy S21',
      name: 'Playwright Test - Mobile Chrome Android'
    }
  },

  mobileSafariiOS: {
    browserName: 'Safari',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'iOS',
      deviceName: 'iPhone 13',
      name: 'Playwright Test - Mobile Safari iOS'
    }
  }
};

/**
 * Generate LambdaTest capabilities with common options merged
 * @param {Object} config - Browser specific configuration
 * @returns {Object} Complete capabilities object
 */
function generateCapabilities(config) {
  return {
    ...config,
    'LT:Options': {
      ...lambdaTestConfig.commonLTOptions,
      ...config['LT:Options']
    }
  };
}

/**
 * Generate WebSocket endpoint for LambdaTest
 * @param {Object} capabilities - LambdaTest capabilities
 * @returns {string} WebSocket endpoint URL
 */
function generateWSEndpoint(capabilities) {
  return `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
}

/**
 * Get all available browser configurations
 * @returns {Object} Object containing all browser configurations
 */
function getAllConfigurations() {
  const configs = {};
  Object.keys(lambdaTestConfig).forEach(key => {
    if (key !== 'commonLTOptions') {
      configs[key] = {
        capabilities: generateCapabilities(lambdaTestConfig[key]),
        wsEndpoint: generateWSEndpoint(generateCapabilities(lambdaTestConfig[key]))
      };
    }
  });
  return configs;
}

/**
 * Get specific browser configuration
 * @param {string} browserKey - Browser configuration key
 * @returns {Object} Browser configuration with capabilities and wsEndpoint
 */
function getBrowserConfig(browserKey) {
  if (!lambdaTestConfig[browserKey]) {
    throw new Error(`Browser configuration '${browserKey}' not found`);
  }
  
  const capabilities = generateCapabilities(lambdaTestConfig[browserKey]);
  return {
    capabilities,
    wsEndpoint: generateWSEndpoint(capabilities)
  };
}

module.exports = {
  lambdaTestConfig,
  generateCapabilities,
  generateWSEndpoint,
  getAllConfigurations,
  getBrowserConfig,
  LT_USERNAME,
  LT_ACCESS_KEY
};