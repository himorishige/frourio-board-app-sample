import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Box, Container, Flex, Heading, Spacer } from '@chakra-ui/layout'
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/popover'
import { Portal } from '@chakra-ui/portal'
import { WrappedLink } from './Link'
import { useRouter } from 'next/router'
import { useAuth } from '../hooks/useAuth'

export const Header: React.VFC = () => {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleNewPost = () => {
    router.push('/posts/create')
  }

  return (
    <Box bgColor="cyan.800">
      <Container maxW="container.lg">
        <Flex py={4}>
          <Box>
            <WrappedLink href="/" style={{ textDecoration: 'none' }}>
              <Heading color="white" _hover={{ opacity: '0.9' }}>
                Board App
              </Heading>
            </WrappedLink>
          </Box>
          <Spacer />
          <Flex alignItems="center">
            <Box mr={4}>
              <Button colorScheme="teal" onClick={handleNewPost}>
                Post
              </Button>
            </Box>
            <Popover>
              <PopoverTrigger>
                <Avatar
                  role="button"
                  src={user?.picture ?? 'https://bit.ly/broken-link'}
                />
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>ログイン情報</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Heading size="sm">{user?.name}</Heading>
                  </PopoverBody>
                  <PopoverFooter d="flex" justifyContent="flex-end">
                    <Button
                      colorScheme="teal"
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                    >
                      Logout
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Portal>
            </Popover>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
