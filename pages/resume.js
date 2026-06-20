// import ProjectResume from '../components/ProjectResume'
import LayoutWrapper from '@/components/LayoutWrapper'
import { PageSEO } from '@/components/SEO'
import Timeline from '@/components/Profile/Timeline'
import siteMetadata from '@/data/siteMetadata'
import eduData from '@/data/eduData'
import jobsData from '@/data/jobsData'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import Skills from '@/components/Skills'

const skills = {
  html: 0,
  css: 0,
  react: 0,
  next: 0,
  tailwind: 0,
  python: 0,
}

const Resume = () => {
  return (
    <>
      <LayoutWrapper>
        <PageSEO
          title={`Curriculum - ${siteMetadata.author} - ${siteMetadata.nickname}`}
          description={`Curriculum de ${siteMetadata.author}`}
        />
        <div className="container mx-auto mb-10">
          <div className="mt-10 flex w-full flex-col items-center">
            <div className="w-full max-w-4xl rounded-xl border-2 border-primary-700 bg-gray-200 p-5 text-gray-900 shadow-sm dark:bg-gray-800 dark:text-primary-100 md:px-20 md:py-16">
              <div className="mb-6 grid grid-cols-3 gap-x-4">
                <div className="max-w-none items-start xl:col-span-1">
                  <Image
                    src="/static/images/avatar_nblue.png"
                    alt="avatar"
                    width="192"
                    height="192"
                    className="h-48 w-48 rounded-full"
                  />
                </div>
                <div className="max-w-full xl:col-span-2">
                  <h1 className="mt-3 text-4xl font-bold">{siteMetadata.author}</h1>
                  <h2 className="mt-3 text-2xl font-bold text-primary-700">Desarrollador Web</h2>
                  <h3 className="text-md mt-3">{siteMetadata.authorDescription}</h3>
                  <div className="my-6 flex space-x-4">
                    <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
                    <SocialIcon kind="whatsapp" href={siteMetadata.whatsapp} size="6" />
                    <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
                    <SocialIcon kind="github" href={siteMetadata.github} size="6" />
                    <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
                  </div>
                </div>
              </div>
              <div className="mt-2">{/* <Socials /> */}</div>
              <div className="items-start space-y-2 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:space-y-0">
                <div className="max-w-none pt-4 xl:col-span-2">
                  <Timeline title="Educación" jobs={eduData} />
                </div>
                <div className="max-w-none pt-4 xl:col-span-2">
                  <Timeline title="Experiencia" jobs={jobsData} />
                  <Skills tags={skills} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </>
  )
}

export default Resume

{
  /* <div className="mt-5">
                <h1 className="text-2xl font-bold">Skills</h1>
                <div className="mob:flex-col desktop:flex-row flex justify-between">
                  {resume.languages && (
                    <div className="mob:mt-5 mt-2">
                      <h2 className="text-lg">Lenguajes</h2>
                      <ul className="">
                        {resume.languages.map((language, index) => (
                          <Tag key={index} text={language} />
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.frameworks && (
                    <div className="mob:mt-5 mt-2">
                      <h2 className="text-lg">Frameworks</h2>
                      <ul className="list-disc">
                        {resume.frameworks.map((framework, index) => (
                          <li key={index} className="ml-5 py-2">
                            {framework}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resume.others && (
                    <div className="mob:mt-5 mt-2">
                      <h2 className="text-lg">Others</h2>
                      <ul className="list-disc">
                        {resume.others.map((other, index) => (
                          <li key={index} className="ml-5 py-2">
                            {other}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div> */
}
