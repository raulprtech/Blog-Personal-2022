import Image from '@/components/Image'
import { CardLink, ContentBadge, ContentTags, RelatedLinks } from '@/components/ContentMeta'

const CredentialCard = ({ credential }) => {
  return (
    <article className="group h-full overflow-hidden rounded-md border border-gray-200 bg-white transition duration-300 hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-600">
      {credential.image && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
          <Image
            src={credential.image}
            alt={credential.imageAlt || credential.title}
            width={960}
            height={540}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="p-6 md:p-7">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <ContentBadge tone="accent">{credential.issuer}</ContentBadge>
          <ContentBadge tone="muted">{credential.credentialCategory}</ContentBadge>
        </div>
        <h3 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white">
          {credential.title}
        </h3>
        <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">{credential.summary}</p>
        {credential.skills && (
          <div className="mt-6">
            <ContentTags tags={credential.skills} />
          </div>
        )}
        <div className="mt-6 grid gap-5">
          <RelatedLinks title="Lineas de investigacion" items={credential.relatedResearchItems} />
          <RelatedLinks title="Proyectos" items={credential.relatedProjects} />
        </div>
        {credential.href && (
          <div className="mt-7">
            <CardLink href={credential.href}>Ver constancia</CardLink>
          </div>
        )}
      </div>
    </article>
  )
}

export default CredentialCard
