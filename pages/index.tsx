import { useAuth0 } from '@auth0/auth0-react'
import useSWR from 'swr'
import LoginButton from '~/components/LoginButton'
import LogoutButton from '~/components/LogoutButton'

const Home = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0()

  const { data, error } = useSWR(
    isLoading || !isAuthenticated ? null : `http://localhost:15584/api/user`,
    async (url) => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope: 'read:user'
      })
      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      })
      return res.json()
    }
  )
  console.log(data)

  if (isLoading) {
    return <div>Loading your user information...</div>
  }

  if (!isAuthenticated) {
    return (
      <div>
        You must first sign in to access your subscriptions.
        <LoginButton />
      </div>
    )
  }

  if (error) {
    return <div>There was an error loading your subscriptions.</div>
  }

  if (!data) {
    return (
      <div>
        <h1>Subscriptions for {user?.email}</h1>
        <div>Loading your subscriptions ...</div>
      </div>
    )
  }
  return (
    <div>
      <h1>Subscriptions for {user?.email}</h1>
      <div>You have subscribed to a total of {data.length} shows...</div>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <LogoutButton />
    </div>
  )
}

export default Home
