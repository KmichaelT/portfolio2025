import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { getResume } from '@/lib/resume'
import AnimatedResumePages from '@/components/AnimatedResumePages'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: "Resume - My Professional Journey",
  description: "Explore my professional journey, projects, and expertise in software development.",
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default async function ResumePage() {
  const resumeData = await getResume()

  let resume = resumeData.workExperience.map((exp) => ({
    company: exp.company,
    title: exp.title,
    start: exp.period.split(' – ')[0],
    end: exp.period.split(' – ')[1],
    description: exp.description,
  }))

  const projects = resumeData.projects.map((proj) => ({
    title: proj.title,
    technologies: proj.technologies.split(', '),
    description: proj.description,
  }))

  const education = resumeData.education.map((edu) => ({
    degree: edu.degree,
    institution: edu.school,
    date: edu.date,
  }))

  const skills = {
    design: resumeData.technicalSkills.design,
    accessibility: resumeData.technicalSkills.accessibility,
    technical: resumeData.technicalSkills.technical,
    methodologies: resumeData.technicalSkills.methodologies,
  }

  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-[65%_32%]">
          <div className="flex flex-col justify-between">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              My professional journey and expertise in software development.
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              With a passion for creating impactful solutions and a track record of delivering successful projects,
              I've developed a diverse skill set across multiple technologies and domains. Below you'll find my professional
              experience, technical skills, and the value I can bring to your team.
            </p>
            <Button href="#" variant="primary" className="group w-36 mt-4">
              Download CV
              <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600" />
            </Button>
          </div>
          <div>
            <div className="hidden max-w-xs px-2.5 lg:block lg:max-w-none"></div>
          </div>
        </div>
      </Container>
      <div className="mt-16 w-full flex justify-center px-0">
        <AnimatedResumePages
          resume={resume}
          projects={projects}
          education={education}
          skills={skills}
        />
      </div>
    </>
  )
}
