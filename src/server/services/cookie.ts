import * as jwt from 'jsonwebtoken';

export const userFromCookie = (cookies: any) => {
  try {
    const { id, email }: any = jwt.verify(cookies.access_token, process.env.ACCESS_TOKEN_SECRET);
    return {
      id,
      email,
    };
  } catch (err) {
    return null;
  }
};
