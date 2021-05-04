export const sessionExtractor = (req): string => {
  let jwt = null;
  if (req && req.session) {
    jwt = req.session.jwt;
  }
  return jwt;
};
