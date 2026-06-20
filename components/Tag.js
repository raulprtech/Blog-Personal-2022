import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text, children }) => {
  return (
    <Link
      className="group m-1 mt-2 cursor-pointer text-center"
      href={`/tags/${kebabCase(text)}`}
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

{
  /* <Link href={`/tags/${kebabCase(text)}`}>
<span className="mr-3 text-sm font-medium uppercase text-primary-700 hover:text-primary-700 dark:hover:text-primary-400">
  {text.split(' ').join('-')}
</span>
</Link> */
}
