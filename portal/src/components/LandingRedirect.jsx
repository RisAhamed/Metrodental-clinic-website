import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Spinner } from './ui'

/**
 * '/' is no longer a marketing home page: it just sends each visitor to the
 * page that matters to them. Server-side protection is unchanged — this is
 * only a convenient front-door redirect.
 */
export default function LandingRedirect() {
  const { user, loading } = useAuth()

  if (loading) return <Spinner label="Checking your session..." />
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/shop'} replace />
}
