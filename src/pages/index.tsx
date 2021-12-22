import useAspidaSWR from '@aspida/swr'
import { Box, Flex } from '@chakra-ui/layout'
import { VFC } from 'react'
import { Layout } from '~/src/components/Layout'
import { Loading } from '~/src/components/Loading'
import { PostItem } from '~/src/components/PostItem'
import { useAuth } from '~/src/hooks/useAuth'
import { apiClient } from '~/src/utils/apiClient'

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
      {posts?.length ? (
        <Box py={8} w="100%">
          {posts?.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </Box>
      ) : (
        <Flex alignItems="center" justifyContent="center" w="100%">
          <Loading />
        </Flex>
      )}
    </Layout>
  )
}

export default Home
