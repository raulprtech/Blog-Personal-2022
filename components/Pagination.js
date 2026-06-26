import Link from 'next/link'
import { localizedPath } from '@/lib/i18n'

export default function Pagination({ totalPages, currentPage, lang = 'es' }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {lang === 'en' ? 'Previous' : 'Anterior'}
          </button>
        )}
        {prevPage && (
          <Link
            href={localizedPath(
              currentPage - 1 === 1 ? '/blog/' : `/blog/page/${currentPage - 1}`,
              lang
            )}
          >
            <button rel="previous">{lang === 'en' ? 'Previous' : 'Anterior'}</button>
          </Link>
        )}
        <span>
          {currentPage} {lang === 'en' ? 'of' : 'de'} {totalPages}
        </span>
        {!nextPage && (
          <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {lang === 'en' ? 'Next' : 'Siguiente'}
          </button>
        )}
        {nextPage && (
          <Link href={localizedPath(`/blog/page/${currentPage + 1}`, lang)}>
            <button rel="next">{lang === 'en' ? 'Next' : 'Siguiente'}</button>
          </Link>
        )}
      </nav>
    </div>
  )
}
