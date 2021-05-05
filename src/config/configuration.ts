export default () => ({
  database: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_KEY,
    signOptions: {
      expiresIn: '2d',
    },
  },
});
