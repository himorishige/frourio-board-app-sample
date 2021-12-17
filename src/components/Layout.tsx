import { useRouter } from 'next/router'
import { useAuth } from '~/src/hooks/useAuth'
import { Header } from './Header'
import { Footer } from './Footer'
import LoginButton from './LoginButton'
import { Container } from '@chakra-ui/layout'

type Props = {
  children: React.ReactNode
}

export const Layout: React.VFC<Props> = (props) => {
  const router = useRouter()
  const { isAuthenticated, isLoading, error, token } = useAuth()

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

  return (
    <>
      <Header />
      <Container maxW="container.lg">{props.children}</Container>
      <Footer />
    </>
  )
}
