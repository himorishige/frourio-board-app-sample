import { Comment, User } from '.prisma/client'
import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Box, Flex } from '@chakra-ui/layout'
import { Tag, TagLabel } from '@chakra-ui/tag'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import React, { VFC } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { echoLocalDateTime } from '../utils/dateUtil'

type Props = {
  userState: User
  comment: Comment & { owner?: User | null }
  scrollRef: React.RefObject<HTMLDivElement>
  deleteComment: (commentId: number) => Promise<void>
  length: number
  index: number
}

export const CommentItem: VFC<Props> = (props) => {
  const { userState, comment, scrollRef, length, index, deleteComment } = props

  return (
    <React.Fragment key={comment.id}>
      <Box ref={length - 1 === index ? scrollRef : null}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Tag py={1} size="md" colorScheme="gray" borderRadius="full">
              <Avatar
                src={comment.owner?.icon ?? 'https://bit.ly/broken-link'}
                size="xs"
                name={comment.owner?.name ?? 'NO NAME'}
                mr={2}
              />
              <TagLabel mr={1}>{comment.owner?.name}</TagLabel>
              <TagLabel>{echoLocalDateTime(comment.createdAt)}</TagLabel>
            </Tag>
          </Box>
          {comment.ownerId === userState.id && (
            <Box>
              <Button
                colorScheme="red"
                onClick={() => deleteComment(comment.id)}
              >
                削除
              </Button>
            </Box>
          )}
        </Flex>
        <Box p={4}>
          <ReactMarkdown
            components={ChakraUIRenderer()}
            remarkPlugins={[remarkGfm]}
            skipHtml
          >
            {comment.body}
          </ReactMarkdown>
        </Box>
      </Box>
    </React.Fragment>
  )
}
