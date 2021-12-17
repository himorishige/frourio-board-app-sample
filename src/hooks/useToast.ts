import { useToast } from '@chakra-ui/react'

type Position =
  | 'top'
  | 'top-right'
  | 'top-left'
  | 'bottom'
  | 'bottom-right'
  | 'bottom-left'

type Status = 'success' | 'error' | 'warning' | 'info'

export const useSnagBar = () => {
  const toast = useToast()

  const snagBar = (
    title = 'message',
    position: Position = 'bottom',
    status: Status = 'info'
  ) => {
    toast({
      title: title,
      position: position,
      status: status,
      isClosable: true
    })
  }

  return { snagBar }
}
