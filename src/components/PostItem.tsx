import { Comment, Post, User } from '.prisma/client'
import { Avatar } from '@chakra-ui/avatar'
import { ChatIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading } from '@chakra-ui/layout'
import { Tag, TagLabel } from '@chakra-ui/tag'
import React, { VFC } from 'react'
import { WrappedLink } from '~/src/components/Link'
import { echoLocalDateTime } from '~/src/utils/dateUtil'

type Props = {
  post: Post & {
    comment?: Comment[] | undefined
  } & {
    author?: User | null | undefined
  }
}

export const PostItem: VFC<Props> = ({ post }) => {
  return (
    <Box
      key={post.id}
      overflow="hidden"
      p={4}
      border="1px"
      borderRadius={8}
      borderColor="gray.100"
      mb={4}
    >
      <Flex alignItems="center">
        <Avatar
          src={post.author?.icon ?? 'https://bit.ly/broken-link'}
          size="sm"
          name={post.author?.name ?? 'NO NAME'}
          mr={2}
        />
        <WrappedLink href={`/posts/${post.id}`}>
          <Heading size="md" d="inline">
            {post.title}
          </Heading>
        </WrappedLink>
      </Flex>
      <Flex alignItems="center" mt={4}>
        <Tag size="lg" colorScheme="gray" borderRadius="full">
          <TagLabel ml={2}>{echoLocalDateTime(post.createdAt)}</TagLabel>
          <TagLabel ml={2}>
            <ChatIcon mr={2} />
            {post.comment?.length}
          </TagLabel>
        </Tag>
      </Flex>
    </Box>
  )
}
