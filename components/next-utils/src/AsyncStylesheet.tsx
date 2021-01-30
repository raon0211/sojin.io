import Head from 'next/head'
import React, { useEffect, useState } from 'react'

interface Props {
  href: string
}

export function AsyncStylesheet({ href }: Props) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Head>
      <link rel="preconnect" href={new URL(href).origin} />
      <link rel="preload" as="style" href={href} />
      <link
        rel="stylesheet"
        type="text/css"
        href={href}
        media={isMounted ? 'all' : 'print'}
      />
      <noscript>
        <link rel="stylesheet" type="text/css" href={href} />
      </noscript>
    </Head>
  )
}
