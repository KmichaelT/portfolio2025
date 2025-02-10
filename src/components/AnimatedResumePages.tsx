"use client";

import { useRef, useState, useEffect } from 'react'
interface Role {
  company: string
  title: string
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
  description?: string[]
}

interface Project {
  title: string
  description: string[]
  technologies: string[]
  link?: string
}

interface Education {
  degree: string
  institution: string
  date: string
  details?: string[]
}

interface AnimatedResumePagesProps {
  resume: Role[]
  projects: Project[]
  education: Education[]
  skills: {
    design: string[]
    accessibility: string[]
    technical: string[]
    methodologies: string[]
  }
}

// Helper components – you can import these if they are defined in separate files.
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="relative py-4">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-zinc-200"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-gray-50 px-3 text-sm font-semibold text-zinc-900">
          {title}
        </span>
      </div>
    </div>
  )
}

function RoleItem({ role }: { role: Role }) {
  let startLabel = typeof role.start === 'string' ? role.start : role.start.label
  let startDate = typeof role.start === 'string' ? role.start : role.start.dateTime
  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex flex-col gap-2">
      <div className="flex flex-col">
        <dl className="flex flex-auto flex-wrap gap-x-2">
          <dt className="sr-only">Company</dt>
          <dd className="w-full flex-none text-sm font-medium dark:text-zinc-900">
            {role.company}
          </dd>
          <dt className="sr-only">Role</dt>
          <dd className="text-xs text-zinc-500">
            {role.title}
          </dd>
          <dt className="sr-only">Date</dt>
          <dd
            className="ml-auto text-xs text-zinc-400"
            aria-label={`${startLabel} until ${endLabel}`}
          >
            <time dateTime={startDate}>{startLabel}</time>{' '}
            <span aria-hidden="true">—</span>{' '}
            <time dateTime={endDate}>{endLabel}</time>
          </dd>
        </dl>
      </div>
      {role.description && (
        <ul className="list-disc text-sm text-zinc-600 ml-4 pl-4">
          {role.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </li>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="flex flex-col gap-2">
      <div className="flex flex-col">
        <dl className="flex flex-auto flex-wrap gap-x-2">
          <dt className="sr-only">Project</dt>
          <dd className="w-full flex-none text-sm font-medium text-zinc-900">
            {project.title}
          </dd>
          <dd className="text-xs text-zinc-500">
            {project.technologies.join(' • ')}
          </dd>
        </dl>
      </div>
      <ul className="list-disc text-sm text-zinc-600 ml-4 pl-4">
        {project.description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </li>
  )
}

function EducationItem({ education }: { education: Education }) {
  return (
    <li className="flex flex-col gap-2">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-zinc-900">
            {education.degree}
          </h3>
          <span className="text-sm text-zinc-500">
            {education.date}
          </span>
        </div>
        <p className="text-sm text-zinc-500">
          {education.institution}
        </p>
      </div>
      {education.details && (
        <ul className="list-disc text-sm text-zinc-600 ml-4 pl-4">
          {education.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default function AnimatedResumePages({
    resume,
    projects,
    education,
    skills,
  }: AnimatedResumePagesProps) {
    // Create a wrapper ref to measure available width
    const wrapperRef = useRef<HTMLDivElement>(null)
    // State for our uniform scale factor
    const [scale, setScale] = useState(1)
    const page1Ref = useRef<HTMLDivElement>(null)
    const page2Ref = useRef<HTMLDivElement>(null)
  
    useEffect(() => {
      function updateScale() {
        if (wrapperRef.current) {
          const availableWidth = wrapperRef.current.clientWidth
          // Base design is 900px wide.
          const newScale = Math.min(1, availableWidth / 900)
          setScale(newScale)
        }
      }
      updateScale()
      window.addEventListener('resize', updateScale)
      return () => window.removeEventListener('resize', updateScale)
    }, [])
  
    function handleSwap() {
      if (!page1Ref.current || !page2Ref.current) return
  
      // Determine which card is currently on top.
      const topPage = page1Ref.current.classList.contains('card-top')
        ? page1Ref.current
        : page2Ref.current
      const bottomPage = page1Ref.current.classList.contains('card-top')
        ? page2Ref.current
        : page1Ref.current
  
      // Before animating, change the bottom page’s rotation so it matches the top's rotation.
      // This ensures both have the same rotation (rotate-6) during the swap animation.
      bottomPage.classList.remove('-rotate-2')
      bottomPage.classList.add('rotate-3')
  
      // Animate the top page moving completely off (using a transform).
      topPage.classList.add('translate-x-1/2')
      bottomPage.classList.add('-translate-x-2/3')
  
      // After the transition completes (1000ms), swap roles and reset transforms.
      setTimeout(() => {
        // Swap z-index so that the bottom page comes forward.
        if (topPage.classList.contains('z-20')) {
          topPage.classList.replace('z-20', 'z-10')
          bottomPage.classList.replace('z-10', 'z-20')
        }
        // Remove the translation so the card slides back into place.
        topPage.classList.remove('translate-x-1/2')
        bottomPage.classList.remove('-translate-x-2/3')
        // Swap the role classes.
        topPage.classList.toggle('card-top')
        topPage.classList.toggle('card-bottom')
        bottomPage.classList.toggle('card-top')
        bottomPage.classList.toggle('card-bottom')
  
        // Restore proper rotations:
        // The card with the "card-top" role should have rotate-6,
        // and the card with "card-bottom" should have -rotate-2.
        if (topPage.classList.contains('card-top')) {
          topPage.classList.remove('-rotate-2')
          topPage.classList.add('rotate-3')
        } else {
          topPage.classList.remove('rotate-3')
          topPage.classList.add('-rotate-2')
        }
        if (bottomPage.classList.contains('card-top')) {
          bottomPage.classList.remove('-rotate-2')
          bottomPage.classList.add('rotate-3')
        } else {
          bottomPage.classList.remove('rotate-3')
          bottomPage.classList.add('-rotate-2')
        }
      }, 500)
    }
  
    // Define the two "pages" of content
    const page1Content = (
      <div>
        <header className="flex flex-col">
          <div className="flex w-full">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 w-[400px]">
              Michael Bekele
            </h1>
            <p className="text-base text-zinc-600 w-[300px] text-right">
              UX/UI Designer & Web Developer
            </p>
          </div>
          <div className="my-4 w-full border-t border-gray-300"></div>
          <div className="flex w-full">
            <a href="tel:+19723718483" className="text-sm text-zinc-500 w-[160px]">
              +1 972-371-8483
            </a>
            <a href="mailto:your.email@example.com" className="text-sm text-zinc-500 w-[160px]">
              Email
            </a>
            <a href="https://github.com/yourusername" className="text-sm text-zinc-500 w-[160px]">
              Github
            </a>
            <a href="https://linkedin.com/in/yourusername" className="text-sm text-zinc-500 w-[160px]">
              LinkedIn
            </a>
            <a href="https://yourwebsite.com" className="text-sm text-zinc-500 w-[160px]">
              Website
            </a>
          </div>
          <div className="my-4 w-full border-t border-gray-300"></div>
        </header>
  
        <section>
          <SectionHeader title="WORK EXPERIENCE" />
          <ol className="space-y-3">
            {resume.map((role, idx) => (
              <RoleItem key={idx} role={role} />
            ))}
          </ol>
        </section>
  
        <section className="mt-6">
          <SectionHeader title="PROJECTS" />
          <ol className="space-y-3">
            {projects.slice(0, 3).map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </ol>
        </section>
      </div>
    )
  
    const page2Content = (
      <div>
        <section>
          <SectionHeader title="EDUCATION" />
          <ol className="space-y-4">
            {education.map((edu, idx) => (
              <EducationItem key={idx} education={edu} />
            ))}
          </ol>
        </section>
  
        <section>
          <SectionHeader title="TECHNICAL SKILLS" />
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="text-sm font-medium capitalize text-zinc-900 mb-2">
                  {category}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {skillList.join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </section>
  
        <div className="mt-12">
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-zinc-200"></div>
            </div>
          </div>
        </div>
      </div>
    )
  
    return (
      <div ref={wrapperRef} style={{ width: '100%' }}>
        <div
          id="pages-container"
          onClick={handleSwap}
          className="relative w-[900px] h-[1100px] cursor-pointer mx-auto"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left'
          }}
        >
          <div
            ref={page1Ref}
            id="page1"
            className="card card-top absolute inset-0 bg-gray-50 border border-zinc-100 p-12 shadow-lg transform transition-all duration-500 rotate-3 z-20 overflow-hidden"
          >
            {page1Content}
          </div>
          <div
            ref={page2Ref}
            id="page2"
            className="card card-bottom absolute inset-0 bg-gray-50 border border-zinc-100 p-12 shadow-sm transform transition-all duration-500 -rotate-2 z-10 overflow-hidden"
          >
            {page2Content}
          </div>
        </div>
      </div>
    )
  }