import { Link, LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { VFC } from 'react'

export const WrappedLink: VFC<LinkProps> = (props) => {
  return (
    <NextLink href={props.href ?? ''}>
      <Link
        {...props}
        onClick={() => (document.activeElement as HTMLElement).blur()}
      />
    </NextLink>
  )
}
