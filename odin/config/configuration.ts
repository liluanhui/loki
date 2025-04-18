export default () => ({
  version: '1.0.0',
  name: process.env.APP_NAME || 'Unknown',
  env: process.env.NODE_ENV || 'Unknown',
  aes_key: process.env.AES_KEY || '',
  oauth: {
    github: {
      access_token_url: 'https://github.com/login/oauth/access_token',
      user_url: 'https://api.github.com/user',
      client_id: process.env.OAUTH_GITHUB_CLIENT_ID || '',
      client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRET || '',
      redirect_uri: process.env.OAUTH_GITHUB_REDIRECT_URI || '',
    },
  },
  TX_APP: {
    secretId: process.env.TX_APP_SECRET_ID || '',
    secretKey: process.env.TX_APP_SECRET_KEY || '',
  },
  COS: {
    region: process.env.COS_REGION || '',
    bucket: process.env.COS_BUCKET || '',
  },
});
