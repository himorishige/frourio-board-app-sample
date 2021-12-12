import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { apiClient } from '~/utils/apiClient'

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, error } =
    useAuth0()

  const [token, setToken] = useState('')

  if (isAuthenticated && !isLoading) {
    ;(async () => {
      await getAccessTokenSilently({
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope: 'read:user'
      }).then(setToken)
    })()
  }

  useEffect(() => {
    ;(async () => {
      if (token && user?.email && user?.name) {
        return apiClient.user.post({
          body: {
            email: user.email,
            name: user.name,
            icon: user.picture ?? ''
          },
          headers: {
            authorization: `Bearer ${token}`
          }
        })
      }
    })()
  }, [token])

  return { token, user, isAuthenticated, isLoading, error }
}
