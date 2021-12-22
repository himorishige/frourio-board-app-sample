import useAspidaSWR from '@aspida/swr'
import { Box, Heading, Text } from '@chakra-ui/layout'
import { Button, Input, Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useEffect, VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Layout } from '~/src/components/Layout'
import { useAuth } from '~/src/hooks/useAuth'
import { useSnagBar } from '~/src/hooks/useToast'
import { apiClient } from '~/src/utils/apiClient'

type Inputs = {
  title: string
  body: string
}

const schema = yup.object({
  title: yup
    .string()
    .max(200, '200文字以内で登録をしてください。')
    .required('タイトルを入力してください。'),
  body: yup
    .string()
    .max(2000, '2000文字以内で登録をしてください。')
    .required('コメントを入力してください。')
})

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
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })

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
          <Box mt={4}>
            {'title' in errors && (
              <Text color="red">{errors.title?.message}</Text>
            )}
            {'body' in errors && (
              <Text color="red">{errors.body?.message}</Text>
            )}
          </Box>
        </form>
      </Box>
    </Layout>
  )
}

export default PostsEdit
