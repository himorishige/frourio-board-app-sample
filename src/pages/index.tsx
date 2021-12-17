import LogoutButton from '~/src/components/LogoutButton'
import { useAuth } from '~/src/hooks/useAuth'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/src/utils/apiClient'
import { Layout } from '~/src/components/Layout'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import { WrappedLink } from '~/src/components/Link'
import { echoLocalDateTime } from '../utils/dateUtil'
import { Avatar } from '@chakra-ui/avatar'
import { Tag, TagLabel } from '@chakra-ui/tag'
import { ChatIcon } from '@chakra-ui/icons'

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
      <div>
        {posts?.map((post) => (
          <Box key={post.id} overflow="hidden" py={4}>
            <Box>
              <WrappedLink href={`/posts/${post.id}`}>
                <Heading size="lg">{post.title}</Heading>
              </WrappedLink>
            </Box>
            <Flex py={4} alignItems="center">
              <Tag size="lg" colorScheme="blue" borderRadius="full">
                <Avatar
                  src={post.author?.icon ?? 'https://bit.ly/broken-link'}
                  size="xs"
                  name={post.author?.name ?? 'NO NAME'}
                  ml={-1}
                  mr={2}
                />
                <TagLabel>{post.author?.name ?? 'NO NAME'}</TagLabel>
                <TagLabel ml={2}>{echoLocalDateTime(post.createdAt)}</TagLabel>
                <TagLabel ml={2}>
                  <ChatIcon mr={2} />
                  {post.comment?.length}
                </TagLabel>
              </Tag>
            </Flex>
          </Box>
        ))}
      </div>
    </Layout>
  )
}

export default Home
