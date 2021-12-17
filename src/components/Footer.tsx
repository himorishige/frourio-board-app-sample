import { Box, Container, Flex, Text } from '@chakra-ui/layout'
import { NextComponentType } from 'next'

export const Footer: NextComponentType = () => {
  return (
    <Container maxW="container.lg">
      <Flex>
        <Box>
          <Text>Footer</Text>
        </Box>
      </Flex>
    </Container>
  )
}
