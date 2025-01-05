jest.mock('../Config/db.js', () => jest.fn(() => Promise.resolve()));
jest.mock('../Middleware/authToken.js', () => ({
  verifyToken: (req, res, next) => {
    req.user = { id: 'test-user-id' };
    next();
  },
}));
