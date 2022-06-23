export default () => ({
  mongo: {
    uri: process.env.MONGO_URI,
  },
  auth: {
    secret: process.env.JWT_SECRET,
  },
  features: {
    user: {
      baseUrl: process.env.USER_BASE_URL,
    },
  },
});
