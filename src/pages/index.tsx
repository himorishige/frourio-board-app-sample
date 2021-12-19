import { useAuth } from '~/src/hooks/useAuth'
import useAspidaSWR from '@aspida/swr'
import { apiClient } from '~/src/utils/apiClient'
import { Layout } from '~/src/components/Layout'
import { Box, Text } from '@chakra-ui/layout'
import { PostItem } from '~/src/components/PostItem'
import { VFC } from 'react'

const Home: VFC = () => {
  const { token } = useAuth()

  const { data: posts } = useAspidaSWR(apiClient.posts, {
    headers: {
      authorization: `Bearer ${token}`
    },
    enabled: !!token,
    revalidateOnFocus: false
  })

  return (
    <Layout>
      <Box py={4}>
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
