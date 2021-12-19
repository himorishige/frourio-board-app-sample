import { Box, Container, Flex, Text } from '@chakra-ui/layout'
import { VFC } from 'react'

export const Footer: VFC = () => {
  return (
    <Box bg="cyan.900">
      <Container maxW="container.lg">
        <Flex py={4}>
          <Box alignItems="center">
            <Text color="white">Footer</Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
