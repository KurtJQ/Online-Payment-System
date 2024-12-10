import jwt from 'jsonwebtoken';

const generateToken = (userId, role) => {
  const payload = { userId, role };
  const secretKey = process.env.JWT_SECRET_KEY; // Store secret in .env
  const options = { expiresIn: '1d' }; // Token expiration time set to 1 day

  return jwt.sign(payload, secretKey, options);
};

export default generateToken;
