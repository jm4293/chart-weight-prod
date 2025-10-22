import jwt from 'jsonwebtoken';

export function jwtUtil<T>(): {
  sign: (payload: any, userUid: string, expiresIn: number) => string;
  verify: (token: string) => T;
} {
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY!;

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  return {
    sign: (payload: any, userUid: string, expiresIn: number) => {
      return jwt.sign(payload, secretKey, {
        expiresIn,
        algorithm: 'HS256',
        keyid: 'chart-weight-key',
        issuer: 'chart-weight-server',
        audience: 'chart-weight-client',
        subject: userUid,
        jwtid: generateUniqueId(),
        noTimestamp: false,
        allowInsecureKeySizes: false,
      });
    },
    verify: (token: string) => {
      return jwt.verify(token, secretKey) as T;
    },
  };
}
