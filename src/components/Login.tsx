import { Container, Flex, Heading } from '@chakra-ui/layout'
import { VFC } from 'react'
import LoginButton from '~/src/components/LoginButton'

export const Login: VFC = () => {
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
