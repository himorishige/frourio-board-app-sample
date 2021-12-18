import { Box, Container, Flex, Text } from '@chakra-ui/layout'
import { NextComponentType } from 'next'

export const Footer: NextComponentType = () => {
  return (
    <Box bg="gray.300">
      <Container maxW="container.lg">
        <Flex py={4}>
          <Box alignItems="center">
            <Text>Footer</Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
