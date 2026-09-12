import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'sri-vpn-dev-secret-change-me'
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d'

export function hashPassword(password) {
  return bcrypt.hashSync(password, 12)
}

export function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })
}

export function authRequired(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' })
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = { id: decoded.sub, email: decoded.email }
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
