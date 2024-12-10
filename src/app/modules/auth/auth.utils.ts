import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userEmail: string; role: string },
  secret: string,
) => {
  return jwt.sign(jwtPayload, secret);
};