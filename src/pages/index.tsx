import LogoutButton from '~/src/components/LogoutButton'
import { useAuth } from '~/src/hooks/useAuth'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/src/utils/apiClient'
import { Layout } from '~/src/components/Layout'
import { Box, Container, Flex, Heading, Text, VStack } from '@chakra-ui/layout'
import { WrappedLink } from '~/src/components/Link'
import { echoLocalDateTime } from '../utils/dateUtil'
import { Avatar } from '@chakra-ui/avatar'
import { Tag, TagLabel } from '@chakra-ui/tag'
import { ChatIcon } from '@chakra-ui/icons'
import { Loading } from '../components/Loading'

const Home: React.VFC = () => {
  const { token, user } = useAuth()

  const { data: posts } = useAspidaSWR(apiClient.posts, {
    headers: {
      authorization: `Bearer ${token}`
    },
    enabled: !!token,
    revalidateOnFocus: false
  })
  console.log(posts)

  return (
    <Layout>
      <Box>
        {posts ? (
          posts?.map((post) => (
            <Box
              key={post.id}
              overflow="hidden"
              p={4}
              border="1px"
              borderRadius={8}
              borderColor="gray.100"
              my={4}
            >
              <Flex alignItems="center">
                <Avatar
                  src={post.author?.icon ?? 'https://bit.ly/broken-link'}
                  size="md"
                  name={post.author?.name ?? 'NO NAME'}
                  mr={2}
                />
                <WrappedLink href={`/posts/${post.id}`}>
                  <Heading size="lg" d="inline">
                    {post.title}
                  </Heading>
                </WrappedLink>
              </Flex>
              <Flex alignItems="center" mt={4}>
                <Tag size="lg" colorScheme="gray" borderRadius="full">
                  <TagLabel ml={2}>
                    {echoLocalDateTime(post.createdAt)}
                  </TagLabel>
                  <TagLabel ml={2}>
                    <ChatIcon mr={2} />
                    {post.comment?.length}
                  </TagLabel>
                </Tag>
              </Flex>
            </Box>
          ))
        ) : (
          <Text>loading...</Text>
        )}
      </Box>
    </Layout>
  )
}

export default Home
