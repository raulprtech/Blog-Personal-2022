import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SocialBanner({ title, link = '/', image, emoji, bgColor }) {
  if (!title) return null

  const colorSelect = (color) => {
    switch (color) {
      case 'blue':
        return 'bg-primary-700'
      case 'red':
        return 'bg-red-600'
      case 'yellow':
        return 'bg-yellow-500'
      case 'purple':
        return 'bg-purple-600'
      case 'orange':
        return 'bg-orange-600'
      case 'green':
        return 'bg-green-600'
      default:
        return 'bg-gray-950 dark:bg-gray-800'
    }
  }

  return (
    <Link
      className="cursor-pointer text-center font-bold text-gray-100"
      href={link || '/'}
      target={link?.startsWith('http') ? '_blank' : undefined}
      rel={link?.startsWith('http') ? 'noreferrer' : undefined}
    >
      <div
        className={`align-center flex w-full items-center rounded-md ${colorSelect(
          bgColor
        )} px-4 py-2`}
      >
        {image && (
          <Image src={image} alt="" width={800} height={200} className="h-10 w-20 rounded-lg" />
        )}
        <span className="text-md w-full md:text-lg">{title}</span>
        {emoji && <span className="text-2xl">{emoji}</span>}
      </div>
    </Link>
  )
}
