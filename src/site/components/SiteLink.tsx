import Link from 'next/link'
import React from 'react'

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string }

/** next/link for internal paths, a plain <a> for external, tel:, mailto: and '#'. */
export function SiteLink({ href, children, ...rest }: Props) {
  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link href={href} prefetch={false} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}
