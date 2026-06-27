import Image from '@/components/Image'

function SkillIcon({ skill }) {
  if (skill.icon) {
    return (
      <Image
        src={skill.icon}
        alt={skill.imageAlt || skill.name}
        width="28"
        height="28"
        className="h-7 w-7 object-contain"
      />
    )
  }

  const label = (skill.iconKind || skill.name || '?').slice(0, 2).toUpperCase()

  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-[11px] font-black text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
      {label}
    </span>
  )
}

export default function AboutSkillGroups({ groups }) {
  if (!Array.isArray(groups) || groups.length === 0) return null

  return (
    <section className="not-prose mt-12 border-t border-gray-200 pt-10 dark:border-gray-800">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:text-secondary-400">
        Stack de trabajo
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.title}
            className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950"
          >
            <h2 className="text-lg font-black tracking-tight text-gray-950 dark:text-white">
              {group.title}
            </h2>
            {group.description && (
              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                {group.description}
              </p>
            )}
            {Array.isArray(group.skills) && group.skills.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={`${group.title}-${skill.name}`}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 dark:border-gray-700 dark:text-gray-200"
                  >
                    <SkillIcon skill={skill} />
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
