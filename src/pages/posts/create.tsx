import { Box, Heading, Text } from '@chakra-ui/layout'
import { Layout } from '~/src/components/Layout'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Input, Textarea } from '@chakra-ui/react'
import { useAuth } from '~/src/hooks/useAuth'
import { apiClient } from '~/src/utils/apiClient'
import { useRouter } from 'next/router'
import { useSnagBar } from '~/src/hooks/useToast'
import { VFC } from 'react'

type Inputs = {
  title: string
  body: string
}

const PostsCreate: VFC = () => {
  const { token, userState } = useAuth()
  const { snagBar } = useSnagBar()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>()

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
          {...register('body', { required: true })}
        />
        <Button type="submit" colorScheme="teal">
          Post
        </Button>
        <Box>
          {errors.title ||
            (errors.body && <Text color="red">タイトルと本文は必須です</Text>)}
        </Box>
      </form>
    </Layout>
  )
}

export default PostsCreate
