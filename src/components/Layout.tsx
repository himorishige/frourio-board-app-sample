import { useRouter } from 'next/router'
import { useAuth } from '~/src/hooks/useAuth'
import { Header } from './Header'
import { Footer } from './Footer'
import { Container, Flex } from '@chakra-ui/layout'
import { Login } from './Login'
import { Loading } from './Loading'

type Props = {
  children: React.ReactNode
}

export const Layout: React.VFC<Props> = (props) => {
  const router = useRouter()
  const { isAuthenticated, isLoading, error, token } = useAuth()

  if (isLoading) {
    return (
      <Flex h="100vh" w="100%" alignItems="center" justifyContent="center">
        <Loading />
      </Flex>
    )
  }

  if (!isAuthenticated) {
    return <Login />
  }

  if (error) {
    console.log(error)
    return <div>There was an error loading your subscriptions.</div>
  }

  return (
    <>
      <Header />
      <Container maxW="container.lg" minH="calc(100vh - 80px - 56px)">
        {props.children}
      </Container>
      <Footer />
    </>
  )
}
