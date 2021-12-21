import { Box, Heading, Text } from '@chakra-ui/layout'
import { Layout } from '~/src/components/Layout'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Input, Textarea } from '@chakra-ui/react'
import { useAuth } from '~/src/hooks/useAuth'
import { apiClient } from '~/src/utils/apiClient'
import { useRouter } from 'next/router'
import { useSnagBar } from '~/src/hooks/useToast'
import { useEffect, VFC } from 'react'
import useAspidaSWR from '@aspida/swr'

type Inputs = {
  title: string
  body: string
}

const PostsEdit: VFC = () => {
  const router = useRouter()
  const { postId } = router.query
  const { token } = useAuth()
  const { snagBar } = useSnagBar()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Inputs>()

  const { data: post, error } = useAspidaSWR(
    apiClient.posts._postId(Number(postId)),
    {
      headers: {
        authorization: `Bearer ${token}`
      },
      enabled: !!token
    }
  )

  const updatePost = async (title: string, body: string) => {
    if (token && postId) {
      await apiClient.posts._postId(+postId).patch({
        headers: {
          authorization: `Bearer ${token}`
        },
        body: {
          title,
          body
        }
      })
    } else {
      throw error
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (token) {
        await updatePost(data.title, data.body)
      }
      snagBar('更新しました', 'bottom', 'success')
      router.push(`/posts/${postId}`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (post) {
      setValue('title', post.title)
      setValue('body', post.body)
    }
  }, [post])

  return (
    <Layout>
      <Box w="100%" py={8}>
        <Box mb={4}>
          <Heading size="lg">投稿</Heading>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('title', { required: true })}
            placeholder="タイトル"
            mb={4}
          />
          <Textarea
            {...register('body', { required: true })}
            placeholder="本文"
            mb={4}
            rows={10}
          />
          <Button type="submit" colorScheme="teal">
            更新
          </Button>
          <Box>
            {errors.title ||
              (errors.body && (
                <Text color="red">タイトルと本文は必須です</Text>
              ))}
          </Box>
        </form>
      </Box>
    </Layout>
  )
}

export default PostsEdit
