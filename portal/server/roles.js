/**
 * Single source of truth for the Clerk <-> app role contract.
 *
 * Clerk public metadata on the owner's user:
 *   { "role": "admin" }
 *
 * Everything else (customers, new sign-ups) is treated as a customer.
 * publicMetadata can only be written from the Backend API / Clerk dashboard,
 * never by the signed-in browser, which is why it is safe to trust here.
 */
export const ROLE = Object.freeze({ ADMIN: 'admin', CUSTOMER: 'customer' })

export const APP_ROLE = Object.freeze({ ADMIN: 'ADMIN', USER: 'USER' })

export function normalizeRole(value) {
  return typeof value === 'string' && value.trim() ? value.trim().toLowerCase() : ROLE.CUSTOMER
}

/** True only when Clerk publicMetadata.role === "admin" (case-insensitive). */
export function isAdminMetadata(metadata) {
  return normalizeRole(metadata?.role) === ROLE.ADMIN
}

/** Metadata patch used by the CLI script. Unknown roles are rejected. */
export function publicMetadataForRole(role) {
  const value = normalizeRole(role)
  if (value !== ROLE.ADMIN && value !== ROLE.CUSTOMER) {
    throw new Error(`Unknown role "${role}". Use "${ROLE.ADMIN}" or "${ROLE.CUSTOMER}".`)
  }
  return { role: value }
}

/** The role string sent to the browser by GET /api/auth/me. */
export function appRole(isAdmin) {
  return isAdmin ? APP_ROLE.ADMIN : APP_ROLE.USER
}
