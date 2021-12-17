import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { apiClient } from '~/src/utils/apiClient'
import { useRecoilState } from 'recoil'
import { userInitialState } from '../recoil/atoms'

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    error,
    logout
  } = useAuth0()

  const [token, setToken] = useState('')

  const [userState, setUserState] = useRecoilState(userInitialState)

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
        await apiClient.user
          .post({
            body: {
              email: user.email,
              name: user.name,
              icon: user.picture ?? ''
            },
            headers: {
              authorization: `Bearer ${token}`
            }
          })
          .then((state) => setUserState(state.body))
      }
    })()
  }, [token])

  return { token, user, isAuthenticated, isLoading, error, logout, userState }
}
