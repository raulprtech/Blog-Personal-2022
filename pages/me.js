import React from 'react'
import Image from 'next/image'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'
import LayoutWrapper from '@/components/LayoutWrapper'
import SocialBanner from '@/components/Banner'
import BannersData from '@/data/bannersData'
import { PageSEO } from '@/components/SEO'

export default function me() {
  return (
    <>
      <PageSEO
        title={`Links - ${siteMetadata.author} - ${siteMetadata.nickname}`}
        description={`Encuentra los sitios mas relevantes de ${siteMetadata.author}`}
      />
      <LayoutWrapper header={false}>
        <div className="flex-block md:pd-8 mx-auto mt-2 max-w-xl p-4">
          <div className="overflow-hidden rounded-md">
            <div className="flex flex-col justify-between px-4 py-2 align-middle sm:px-6">
              <div className="flex justify-center">
                <Image
                  src="/static/images/avatar_nblue.png"
                  alt="Raul Pacheco Rodriguez"
                  width={300}
                  height={300}
                  className=" m-2 w-40 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-center text-2xl font-bold leading-6 text-gray-900 dark:text-gray-100">
                  {siteMetadata.author}
                </h1>
                <h2 className="-mt-1 text-center text-sm leading-6  text-gray-900 dark:text-gray-100">
                  {siteMetadata.nickname}
                </h2>
                <p className="mt-1 max-w-2xl text-center text-sm  text-gray-900 dark:text-gray-100">
                  🔥 Fanático de la Ciencia 🧪, la Tecnología ⚙️ y de la cultura Hacker, buscando
                  nuevos retos, aprendizajes y compartir lo que aprendo. La tecnología no para de
                  mejorar y quiero estar siempre en primera fila para verlo.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 dark:border-gray-200">
              <div className="flex justify-center py-5">
                <div className="flex space-x-4">
                  <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
                  <SocialIcon kind="instagram" href={siteMetadata.instagram} size="6" />
                  <SocialIcon kind="facebook" href={siteMetadata.facebook} size="6" />
                  <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
                  <SocialIcon kind="youtube" href={siteMetadata.youtube} size="6" />
                  <SocialIcon kind="github" href={siteMetadata.github} size="6" />
                  <SocialIcon kind="researchgate" href={siteMetadata.researchgate} size="6" />
                </div>
              </div>
              <div className="flex-col justify-around">
                {BannersData.map((banner) => (
                  <div className="mb-4" key={banner.title}>
                    <SocialBanner
                      title={banner.title}
                      link={banner.link}
                      image={banner.image}
                      emoji={banner.emoji}
                      bgColor={banner.bgColor}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </>
  )
}
