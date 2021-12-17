import NextLink from 'next/link'
import { Link, LinkProps } from '@chakra-ui/react'

export const WrappedLink: React.FC<LinkProps> = (props) => {
  return (
    <NextLink href={props.href ?? ''}>
      <Link
        {...props}
        onClick={() => (document.activeElement as HTMLElement).blur()}
      />
    </NextLink>
  )
}
