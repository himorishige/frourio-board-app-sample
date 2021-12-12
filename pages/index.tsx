import LoginButton from '~/components/LoginButton'
import LogoutButton from '~/components/LogoutButton'
import { useAuth } from '~/hooks/useAuth'

const Home = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth()

  // const { data: data2 } = useAspidaSWR(apiClient.user, {
  //   query: { id: 1 },
  //   headers: {
  //     authorization: `Bearer ${token}`
  //   },
  //   enabled: !!token
  // })
  // console.log(data2)

  // const { data, error } = useSWR<User>(
  //   isLoading || !isAuthenticated
  //     ? null
  //     : `${process.env.NEXT_PUBLIC_API_URI}/user?id=1`,
  //   async (url) => {
  //     const accessToken = await getAccessTokenSilently({
  //       audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
  //       scope: 'read:user'
  //     })
  //     const res = await fetch(url, {
  //       headers: {
  //         authorization: `Bearer ${accessToken}`
  //       }
  //     })
  //     return res.json()
  //   }
  // )
  // console.log(data)
  // console.log(user)

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
    console.log(error)
    return <div>There was an error loading your subscriptions.</div>
  }

  // if (!data) {
  //   return (
  //     <div>
  //       <h1>Subscriptions for {user?.email}</h1>
  //       <div>Loading your subscriptions ...</div>
  //     </div>
  //   )
  // }
  return (
    <div>
      <h1>Subscriptions for {user?.email}</h1>
      <div>You have subscribed to a total of shows...</div>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <LogoutButton />
    </div>
  )
}

export default Home
