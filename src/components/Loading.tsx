import { Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'

export const Loading = () => {
  return (
    <Flex justifyContent="center" alignItems="center" minH="100%">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    </Flex>
  )
}