import Link from 'next/link'
import React from 'react'

export default function index({ text, link, children }) {
  const isInternalLink = link && link.startsWith('/')
  const isAnchorLink = link && link.startsWith('#')
  let target

  if (isInternalLink) {
    target = '_self'
  }

  if (isAnchorLink) {
    target = '_blank'
  }

  return (
    <Link
      className="group cursor-pointer text-center"
      href={link}
      aria-label={target}
      target={target}
      rel="noreferrer"
    >
      {text && (
        <div className="flex w-full text-gray-900 content-center justify-between border-2 border-gray-700 border-opacity-60 px-6 py-2 text-lg font-medium group-hover:border-gray-800 group-hover:bg-primary-700 group-hover:text-white dark:border-primary-400 dark:bg-gray-900 dark:text-primary-400">
          {children && (
            <span className="flex items-center space-x-5 pr-1 group-hover:text-white lg:pr-4">
              {children}
            </span>
          )}
          <span className=" w-full py-1 text-sm md:text-lg lg:text-4xl">{text}</span>
        </div>
      )}
    </Link>
  )
}
