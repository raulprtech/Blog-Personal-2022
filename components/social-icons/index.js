import Mail from './mail.svg'
import Github from './github.svg'
import Facebook from './facebook.svg'
import Youtube from './youtube.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'
import Whatsapp from './whatsapp.svg'
import Instagram from './instagram.svg'
import Telegram from './telegram.svg'
import Pinterest from './pinterest.svg'
import Platzi from './platzi.svg'
import StackOverflow from './stackoverflow.svg'
import Feedly from './feedly.svg'
import Patreon from './patreon.svg'
import RSS from './rss.svg'
import GoogleNews from './googlenews.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  whatsapp: Whatsapp,
  instagram: Instagram,
  telegram: Telegram,
  pinterest: Pinterest,
  feedly: Feedly,
  stackoverflow: StackOverflow,
  platzi: Platzi,
  patreon: Patreon,
  rss: RSS,
  googlenews: GoogleNews,
}

const SocialIcon = ({ kind, href, size = 8 }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]
  if (!SocialSvg) return null

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
