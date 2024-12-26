const ENV = {
    development: {
      API_URL: 'http://192.168.56.1:3000',
    },
    production: {
      API_URL: 'https://.com',
    },
  };
  
  const API_URL = () => {
    const releaseChannel = 'development';
    return ENV[releaseChannel] || ENV.development;
  };
  
  export default API_URL();
  