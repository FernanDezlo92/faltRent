const ENV = {
    development: {
      API_URL: 'http://192.168.56.1:3000',
    },
    production: {
      API_URL: 'https://.com',
    },
  };
  
  const API_URL = () => {
    return ENV.development.API_URL;
  };
  
  export default API_URL();
  