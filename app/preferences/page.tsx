// app/preferences/page.tsx
'use client'

import Image from 'next/image'
import Avatar from '@/components/ui/avatar'

export default function Preferences() {
  return (
    <div>
      <Avatar>
        <Image
          src="https://github.com/shadcn.png"
          alt="Avatar"
          width={42}
          height={42}
        />
      </Avatar>
      <h1>Hi, there,</h1>
      <h2>How are you feeling now?</h2>
    </div>
  )
}
