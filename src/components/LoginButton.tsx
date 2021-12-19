import { VFC } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/button'

const LoginButton: VFC = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button colorScheme="teal" mt={4} onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  )
}

export default LoginButton
