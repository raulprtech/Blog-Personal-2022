import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import { localizedPath } from '@/lib/i18n'

const Tag = ({ text, children, lang = 'es' }) => {
  return (
    <Link
      className="group m-1 mt-2 cursor-pointer text-center"
      href={localizedPath(`/tags/${kebabCase(text)}`, lang)}
      rel="noreferrer"
    >
      {text && (
        <div className="flex w-full content-center justify-between rounded-md border border-primary-700 bg-white px-2 py-1 font-sans text-xs text-primary-700 group-hover:bg-primary-700 group-hover:text-gray-100 dark:border-primary-700 dark:bg-gray-900">
          <span className="">{text.split(' ').join('-')}</span>
          {children && (
            <span className="flex items-center space-x-3 pl-2 group-hover:text-white">
              {children}
            </span>
          )}
        </div>
      )}
    </Link>
  )
}

export default Tag
