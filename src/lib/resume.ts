import glob from 'fast-glob'
import { StaticImageData } from 'next/image'

// Define interfaces for different resume sections
interface Education {
  degree: string
  school: string
  date: string
}

interface WorkExperience {
  company: string
  title: string
  period: string
  description: string[]
}

interface Project {
  title: string
  technologies: string
  description: string[]
}

interface TechnicalSkills {
  design: string[]
  accessibility: string[]
  technical: string[]
  methodologies: string[]
}

// Main Resume interface
export interface Resume {
  title: string
  description: string
  name: string
  role: string
  profileSummary: string
  workExperience: WorkExperience[]
  projects: Project[]
  education: Education[]
  technicalSkills: TechnicalSkills
}

export interface ResumeWithSlug extends Resume {
  slug: string
}

async function importResume(resumeFilename: string): Promise<ResumeWithSlug> {
  let { resume } = (await import(`../app/resume/page.mdx`)) as {
    default: React.ComponentType
    resume: Resume
  }

  return {
    slug: resumeFilename.replace(/(\/page)?\.mdx$/, ''),
    ...resume,
  }
}

export async function getResume() {
  // Since we know exactly where the resume MDX file is, we don't need glob
  return importResume('page.mdx')
}
