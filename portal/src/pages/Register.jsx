import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { SignUp } from '@clerk/react'
import { useAuth } from '../context/AuthContext'
import { Spinner } from '../components/ui'
import { clearFrom, isValidCustomerDestination, peekFrom } from './Login'

export default function Register() {
  const { user, loading } = useAuth()
  useEffect(() => {
    if (user) clearFrom()
  }, [user])

  if (loading) return <Spinner label="Checking your session..." />
  if (user) {
    const from = peekFrom()
    const destination =
      user.role === 'ADMIN' ? '/admin' : isValidCustomerDestination(from) ? from : '/shop'
    return <Navigate to={destination} replace />
  }

  return (
    <div className="container-x flex min-h-[70vh] items-center justify-center py-12">
      <SignUp routing="path" path="/portal/register" signInUrl="/portal/login" fallbackRedirectUrl="/portal/login" />
    </div>
  )
}
