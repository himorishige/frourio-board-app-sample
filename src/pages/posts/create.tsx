import { Box, Heading, Text } from '@chakra-ui/layout'
import { Button, Input, Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { VFC } from 'react'
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

const PostsCreate: VFC = () => {
  const { token, userState } = useAuth()
  const { snagBar } = useSnagBar()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })

  const createPost = async (authorId: number, title: string, body: string) =>
    await apiClient.posts.post({
      headers: {
        authorization: `Bearer ${token}`
      },
      body: {
        authorId,
        title,
        body
      }
    })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (token) {
        await createPost(userState.id, data.title, data.body)
      }
      snagBar('投稿しました', 'bottom', 'success')
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <Box w="100%" py={8}>
        <Box mb={4}>
          <Heading size="lg">投稿</Heading>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="タイトル"
            mb={4}
            {...register('title', { required: true })}
          />
          <Textarea
            placeholder="本文"
            mb={4}
            rows={10}
            {...register('body', { required: true })}
          />
          <Button type="submit" colorScheme="teal">
            Post
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

export default PostsCreate
