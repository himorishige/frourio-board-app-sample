import { useAuth } from '~/src/hooks/useAuth'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/src/utils/apiClient'
import { Layout } from '~/src/components/Layout'
import { Box, Text } from '@chakra-ui/layout'
import { PostItem } from '~/src/components/PostItem'

const Home: React.VFC = () => {
  const { token } = useAuth()

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
          posts?.map((post) => <PostItem key={post.id} post={post} />)
        ) : (
          <Text>loading...</Text>
        )}
      </Box>
    </Layout>
  )
}

export default Home
