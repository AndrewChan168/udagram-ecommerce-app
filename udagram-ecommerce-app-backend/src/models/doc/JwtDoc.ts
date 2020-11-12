import { JwtHeader } from 'jsonwebtoken'

/**
 * A payload of a JWT token
 */
export interface JwtPayload {
    iss: string
    sub: string
    iat: number
    exp: number
  }

export interface Jwt {
    header: JwtHeader,
    payload: JwtPayload
}