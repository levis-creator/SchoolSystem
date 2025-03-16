import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/" className="block mb-4">
    <Image
      width={231}
      height={48}
      src="./images/logo/auth-logo.svg"
      alt="Logo"
    />
  </Link>
  )
}

export default Logo