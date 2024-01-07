import jwt, { JsonWebTokenError, JwtPayload, Secret } from "jsonwebtoken";
import { InvalidTokenError, JwtDecodeOptions, jwtDecode } from "jwt-decode";

interface SignOption {
  expiresIn: string | number;
}

export class JwtError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JwtError";
  }
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

// export function signJwtAccessToken(
//   payload: JwtPayload,
//   options: SignOption = DEFAULT_SIGN_OPTION
// ) {
//   const secretKey = process.env.NEXTAUTH_SECRET as Secret;
//   const token = jwt.sign(payload, secretKey, options);
//   return token;
// }

/**
 * Verifies and decodes a JSON Web Token (JWT).
 *
 * @param {string} token - The JWT to be verified and decoded.
 * @returns {object | null} - The decoded JWT payload, or null if the token is invalid or expired.
 * @throws {Error} - Throws an error if the token is expired.
 */
export function verifyJwt(token: string) {
  // const secretKey = process.env.NEXTAUTH_SECRET as Secret;
  // const decoded = jwt.verify(token, secretKey);

  const secretKey = process.env.NEXTAUTH_SECRET as JwtDecodeOptions;

  const decoded = jwtDecode(token, secretKey);

  // Token expiration
  const { exp } = decoded as { exp: number };

  if (Date.now() >= exp * 1000) {
    throw new InvalidTokenError("Token expired");
  }

  return decoded;
}
