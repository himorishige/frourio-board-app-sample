import { Box, Container, Flex, Text } from '@chakra-ui/layout'
import { NextComponentType } from 'next'

export const Footer: NextComponentType = () => {
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
