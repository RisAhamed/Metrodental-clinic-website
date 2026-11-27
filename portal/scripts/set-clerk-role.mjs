/**
 * Grant or revoke the ADMIN role by writing Clerk publicMetadata.
 *
 * Run with the secret key loaded from .env:
 *   npm run admin:role -- --email owner@clinic.com --role admin
 *   npm run admin:role -- --email owner@clinic.com --revoke
 *   npm run admin:role -- --list
 *
 * Or directly:
 *   node --env-file=.env scripts/set-clerk-role.mjs --email owner@clinic.com --role admin
 *
 * The script never prints the secret key. It only uses it to call the Clerk
 * Backend API. publicMetadata is the ONLY place this app reads the role from.
 */
import { createClerkClient } from '@clerk/backend'
import { normalizeRole, publicMetadataForRole, ROLE } from '../server/roles.js'

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i]
    if (flag === '--list' || flag === '--revoke' || flag === '--help' || flag === '-h') {
      args[flag.replace(/^--?/, '')] = true
      continue
    }
    const value = argv[++i]
    if (value === undefined) throw new Error(`Missing value for ${flag}`)
    args[flag.replace(/^--?/, '')] = value
  }
  return args
}

function usage() {
  console.log(`Usage:
  npm run admin:role -- --email <address> [--role admin|customer]
  npm run admin:role -- --user-id <user_xxx> [--role admin|customer]
  npm run admin:role -- --email <address> --revoke
  npm run admin:role -- --list

Examples:
  npm run admin:role -- --email owner@clinic.com --role admin
  npm run admin:role -- --email owner@clinic.com --revoke
  npm run admin:role -- --list
`)
}

const emailOf = (entry) => (entry.emailAddress || '').toLowerCase()

function primaryEmail(user) {
  return (
    user.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId) || user.emailAddresses?.[0] || null
  )
}

function isVerified(user) {
  return primaryEmail(user)?.verification?.status === 'verified'
}

function describe(user) {
  const email = primaryEmail(user)?.emailAddress || '(no email)'
  return `${email}  ${user.id}  role=${normalizeRole(user.publicMetadata?.role)}  verified=${isVerified(user)}`
}

async function findUser(clerk, args) {
  if (args['user-id']) {
    return await clerk.users.getUser(args['user-id'])
  }
  if (!args.email) throw new Error('Provide --email <address> or --user-id <user_xxx>')

  const email = args.email.toLowerCase().trim()
  const { data } = await clerk.users.getUserList({ emailAddress: [email], limit: 10 })
  const exact = data.filter((u) => u.emailAddresses?.some((e) => emailOf(e) === email))

  if (exact.length === 0) throw new Error(`No Clerk user with email ${email}. Ask them to sign up first.`)
  if (exact.length > 1) {
    throw new Error(`More than one Clerk user has ${email}. Use --user-id to choose:\n${exact.map(describe).join('\n')}`)
  }
  return exact[0]
}

async function listUsers(clerk) {
  let offset = 0
  const limit = 100
  let total = 0
  while (true) {
    const { data, totalCount } = await clerk.users.getUserList({ limit, offset, orderBy: '+created_at' })
    for (const user of data) console.log(describe(user))
    total += data.length
    offset += data.length
    if (offset >= (totalCount ?? data.length) || data.length < limit) break
  }
  console.log(`\n${total} user(s). Role source: publicMetadata.role (admin = full access).`)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) return usage()

  const secretKey = process.env.CLERK_SECRET_KEY
  if (!secretKey) {
    throw new Error('CLERK_SECRET_KEY is missing. Run with --env-file=.env or set it in your shell.')
  }
  const clerk = createClerkClient({ secretKey })

  if (args.list) return listUsers(clerk)

  const role = args.revoke ? ROLE.CUSTOMER : normalizeRole(args.role || ROLE.ADMIN)
  const patch = publicMetadataForRole(role)
  const user = await findUser(clerk, args)

  if (role === ROLE.ADMIN && !isVerified(user)) {
    throw new Error(
      `The primary email ${primaryEmail(user)?.emailAddress || ''} is not verified in Clerk. ` +
        'Verify it in the Clerk dashboard first — the app deliberately ignores admin metadata on unverified accounts.',
    )
  }

  console.log(`Before: ${describe(user)}`)
  const updated = await clerk.users.updateUserMetadata(user.id, { publicMetadata: patch })
  console.log(`After:  ${describe(updated)}`)
  console.log(
    role === ROLE.ADMIN
      ? '\nAdmin access granted. The user must sign out and back in; allow up to 60s for the API cache to refresh.'
      : '\nAdmin access revoked. Allow up to 60s for the API cache to refresh.',
  )
}

main().catch((error) => {
  console.error(`\nError: ${error.message}`)
  if (error.status) console.error(`Clerk API status: ${error.status}`)
  process.exitCode = 1
})
