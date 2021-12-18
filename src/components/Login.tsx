import { Container, Flex, Heading } from '@chakra-ui/layout'
import LoginButton from './LoginButton'

export const Login = () => {
  return (
    <Container maxW="container.lg">
      <Flex
        h="100vh"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <Heading>You must first sign in to access your subscriptions.</Heading>
        <LoginButton />
      </Flex>
    </Container>
  )
}
