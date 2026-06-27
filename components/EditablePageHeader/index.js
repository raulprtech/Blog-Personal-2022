import Image from 'next/image'
import { Eyebrow } from '@/components/ContentMeta'

export default function EditablePageHeader({
  content,
  titleFallback,
  descriptionFallback,
  children,
}) {
  const title = content?.title || titleFallback
  const description = content?.description || descriptionFallback
  const hasImage = Boolean(content?.image)

  return (
    <div className="grid gap-10 border-b border-gray-200 pb-12 dark:border-gray-800 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
      <div>
        {content?.eyebrow && (
          <div className="mb-5">
            <Eyebrow>{content.eyebrow}</Eyebrow>
          </div>
        )}
        <h1 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-6xl">
          {title}
        </h1>
      </div>
      <div>
        {description && (
          <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
        {children}
        {hasImage && (
          <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
            <div className="relative aspect-[16/9]">
              <Image
                src={content.image}
                alt={content.imageAlt || title || 'Page visual'}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                quality={76}
                className="object-cover object-center"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
