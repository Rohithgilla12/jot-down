const config = {
  // Backend config
  s3: {
    REGION: import.meta.env.VITE_APP_REGION,
    BUCKET: import.meta.env.VITE_APP_BUCKET,
  },
  apiGateway: {
    REGION: import.meta.env.VITE_APP_REGION,
    URL: import.meta.env.VITE_APP_API_URL,
  },
  cognito: {
    REGION: import.meta.env.VITE_APP_REGION,
    USER_POOL_ID: import.meta.env.VITE_APP_USER_POOL_ID,
    APP_CLIENT_ID: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: import.meta.env.VITE_APP_IDENTITY_POOL_ID,
  },
  MAX_ATTACHMENT_SIZE: 5000000,
};

export default config;
