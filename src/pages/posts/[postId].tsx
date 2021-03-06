import useAspidaSWR from '@aspida/swr'
import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { ChatIcon } from '@chakra-ui/icons'
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/layout'
import { Tag, TagLabel } from '@chakra-ui/tag'
import { Textarea } from '@chakra-ui/textarea'
import { yupResolver } from '@hookform/resolvers/yup'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import Error from 'next/error'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import * as yup from 'yup'
import { CommentItem } from '~/src/components/CommentItem'
import { Layout } from '~/src/components/Layout'
import { useAuth } from '~/src/hooks/useAuth'
import { useSnagBar } from '~/src/hooks/useToast'
import { apiClient } from '~/src/utils/apiClient'
import { echoLocalDateTime } from '~/src/utils/dateUtil'

type Inputs = {
  body: string
}

const schema = yup.object({
  body: yup
    .string()
    .max(200, '200文字以内で登録をしてください。')
    .required('コメントを入力してください。')
})

const PostsDetail: VFC = () => {
  const router = useRouter()
  const { postId } = router.query
  const { token, userState } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })
  const { snagBar } = useSnagBar()
  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    data: post,
    error,
    revalidate
  } = useAspidaSWR(apiClient.posts._postId(Number(postId)), {
    headers: {
      authorization: `Bearer ${token}`
    },
    enabled: !!token
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
      revalidate().then(() => {
        const top = scrollRef?.current?.getBoundingClientRect().top ?? 0
        const offsetTop = window.pageYOffset
        const buffer = 0
        window.scrollTo({
          top: top + offsetTop + buffer,

          behavior: 'smooth'
        })
      })
    },
    [token]
  )

  const editPost = () => {
    router.push(`/posts/edit/${postId}`)
  }

  const deletePost = async () => {
    try {
      if (window.confirm('投稿を削除しますか？')) {
        if (token && postId) {
          await apiClient.posts._postId(+postId).delete({
            headers: {
              authorization: `Bearer ${token}`
            }
          })
          snagBar('投稿を削除しました', 'bottom', 'success')
          router.push('/')
        } else {
          throw error
        }
      } else {
        return
      }
    } catch (error) {
      snagBar('投稿の削除に失敗しました', 'bottom', 'error')
      console.log(error)
    }
  }

  const deleteComment = async (commentId: number) => {
    try {
      if (window.confirm('コメントを削除しますか？')) {
        if (token && commentId) {
          await apiClient.comments._commentId(commentId).delete({
            headers: {
              authorization: `Bearer ${token}`
            }
          })
          snagBar('コメントを削除しました', 'bottom', 'success')
          revalidate()
        } else {
          throw error
        }
      } else {
        return
      }
    } catch (error) {
      snagBar('コメントの削除に失敗しました', 'bottom', 'error')
      console.log(error)
    }
  }

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
      <Box w="100%" py={8}>
        <Box key={post.id} overflow="hidden" w="100%">
          <Flex alignItems="center">
            <Avatar
              src={post.author?.icon ?? 'https://bit.ly/broken-link'}
              size="md"
              name={post.author?.name ?? 'NO NAME'}
              mr={2}
            />
            <Heading size="lg">{post.title}</Heading>
          </Flex>
          <Flex py={4} alignItems="center" justifyContent="space-between">
            <Tag size="lg" colorScheme="gray" borderRadius="full">
              <TagLabel>{post.author?.name ?? 'NO NAME'}</TagLabel>
              <TagLabel ml={2}>{echoLocalDateTime(post.createdAt)}</TagLabel>
              <TagLabel ml={2}>
                <ChatIcon mr={2} />
                {post.comment?.length}
              </TagLabel>
            </Tag>
            <Box>
              {post.authorId === userState.id && (
                <Box>
                  <Button
                    type="button"
                    colorScheme="yellow"
                    mr={2}
                    onClick={editPost}
                  >
                    編集
                  </Button>
                  <Button type="button" colorScheme="red" onClick={deletePost}>
                    削除
                  </Button>
                </Box>
              )}
            </Box>
          </Flex>
        </Box>
        <Box p={4} mb={8} border="1px" borderColor="gray.200" borderRadius={4}>
          <ReactMarkdown
            components={ChakraUIRenderer()}
            remarkPlugins={[remarkGfm]}
            skipHtml
          >
            {post.body}
          </ReactMarkdown>
        </Box>
        <Box pb="240px">
          {!!post.comment.length && (
            <Box mb={4}>
              <Heading size="md">
                <ChatIcon mr={2} />
                Comment
              </Heading>
            </Box>
          )}
          {!!post.comment.length &&
            post.comment.map((item, i, array) => (
              <CommentItem
                key={item.id}
                scrollRef={scrollRef}
                userState={userState}
                comment={item}
                deleteComment={deleteComment}
                length={array.length}
                index={i}
              />
            ))}
        </Box>
        <Box pos="fixed" bottom="0" left="0" w="100%" bgColor="cyan.800" py={6}>
          <Container maxW="container.lg">
            <Box mb={4}>
              <Heading size="md" color="white">
                コメントの投稿
              </Heading>
            </Box>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Textarea
                  bgColor="white"
                  mb={4}
                  {...register('body', { required: true })}
                />
                <Button type="submit" colorScheme="teal">
                  コメントの投稿
                </Button>
                <Box mt={4}>
                  {'body' in errors && (
                    <Text color="white">{errors.body?.message}</Text>
                  )}
                </Box>
              </form>
            </Box>
          </Container>
        </Box>
      </Box>
    </Layout>
  )
}

export default PostsDetail
