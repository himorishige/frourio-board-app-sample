import { Container, Flex } from '@chakra-ui/layout'
import { VFC } from 'react'
import { Footer } from '~/src/components/Footer'
import { Header } from '~/src/components/Header'
import { Loading } from '~/src/components/Loading'
import { Login } from '~/src/components/Login'
import { useAuth } from '~/src/hooks/useAuth'

type Props = {
  children: React.ReactNode
}

export const Layout: VFC<Props> = (props) => {
  const { isAuthenticated, isLoading, error } = useAuth()

  if (isLoading) {
    return (
      <Flex h="100vh" w="100%" alignItems="center" justifyContent="center">
        <Loading />
      </Flex>
    )
  }

  if (error) {
    console.log(error)
    return <div>There was an error loading your subscriptions.</div>
  }

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <>
      <Header />
      <Container maxW="container.lg" minH="calc(100vh - 80px - 56px)" d="flex">
        {props.children}
      </Container>
      <Footer />
    </>
  )
}
