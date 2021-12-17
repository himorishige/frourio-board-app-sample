import { Box } from '@chakra-ui/layout'
import { Layout } from '~/src/components/Layout'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Input, Textarea } from '@chakra-ui/react'
import { useAuth } from '~/src/hooks/useAuth'
import { apiClient } from '~/src/utils/apiClient'
import { useRouter } from 'next/router'
import { useSnagBar } from '~/src/hooks/useToast'

type Inputs = {
  title: string
  body: string
}

const PostsCreate = () => {
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

  console.log('state', userState)

  console.log(watch('body'))

  return (
    <Layout>
      <Box>create</Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('title', { required: true })} />
        <Textarea {...register('body', { required: true })} />
        {errors.title && <span>required</span>}
        <Button type="submit">submit</Button>
      </form>
    </Layout>
  )
}

export default PostsCreate