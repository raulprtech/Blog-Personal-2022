import siteMetadata from '@/data/siteMetadata'

const formatDate = (date, language = siteMetadata.locale) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }
  const locale = language === 'en' ? 'en-US' : language === 'es' ? siteMetadata.locale : language
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) return date

  return parsedDate.toLocaleDateString(locale, options)
}

export default formatDate
