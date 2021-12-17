import { useRouter } from 'next/router'
import useAspidaSWR from '@aspida/swr'
import { useAuth } from '~/src/hooks/useAuth'
import { apiClient } from '~/src/utils/apiClient'
import { Layout } from '~/src/components/Layout'
import Error from 'next/error'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import { WrappedLink } from '~/src/components/Link'
import { echoLocalDateTime } from '~/src/utils/dateUtil'
import { Avatar } from '@chakra-ui/avatar'
import { Tag, TagLabel } from '@chakra-ui/tag'
import { ChatIcon } from '@chakra-ui/icons'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSnagBar } from '~/src/hooks/useToast'
import { Textarea } from '@chakra-ui/textarea'
import { Button } from '@chakra-ui/button'
import { useCallback, useEffect } from 'react'

type Inputs = {
  body: string
}

const PostsDetail: React.VFC = () => {
  const router = useRouter()
  const { postId } = router.query
  const { token, userState } = useAuth()
  console.log(postId)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<Inputs>()
  const { snagBar } = useSnagBar()

  const {
    data: post,
    error,
    isValidating,
    revalidate
  } = useAspidaSWR(apiClient.posts._postId(Number(postId)), {
    headers: {
      authorization: `Bearer ${token}`
    },
    enabled: !!token
    // revalidateOnFocus: false
    // revalidateOnMount: true
  })

  const createComment = useCallback(
    async (ownerId: number, postId: number, body: string) => {
      await apiClient.comments.post({
        headers: {
          authorization: `Bearer ${token}`
        },
        body: {
          ownerId,
          postId,
          body
        }
      })
      revalidate()
    },
    [token]
  )

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (token && postId) {
        await createComment(userState.id, +postId, data.body)
      }
      snagBar('コメントを投稿しました', 'bottom', 'success')
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  if (!post) {
    return <Heading>loading...</Heading>
  }

  if (error) {
    return <Error statusCode={404} />
  }

  return (
    <Layout>
      <Box key={post.id} overflow="hidden" py={4}>
        <Box>
          <Heading size="lg">{post.title}</Heading>
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
      <Box py={4}>{post.body}</Box>
      {!!post.comment.length &&
        post.comment.map((item) => <Box key={item.id}>{item.body}</Box>)}
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea {...register('body', { required: true })} />
          {errors.body && <span>required</span>}
          <Button type="submit">submit</Button>
        </form>
      </Box>
    </Layout>
  )
}

export default PostsDetail
