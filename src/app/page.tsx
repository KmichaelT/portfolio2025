

import { type Metadata } from 'next'
import Link from 'next/link'
import clsx from 'clsx'
import Image, { type ImageProps } from 'next/image'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import { Button } from '@/components/Button'
import logoAirbnb from '@/images/logos/airbnb.svg'
import logoFacebook from '@/images/logos/facebook.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'
import logoStarbucks from '@/images/logos/starbucks.svg'
import logoEmprata from '@/images/logos/emprata.svg'
import logoResolveSoft from '@/images/logos/resolvesoft.svg'
import logoCodingTemple from '@/images/logos/coding-temple.svg'
import logoTripleA from '@/images/logos/triple-a.svg'

// Import your projects getter and Card (used for previews).
import { getAllProjects, type ProjectWithSlug } from '@/lib/projects'
import { Card } from '@/components/Card'

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'Emprata',
      title: 'UX/UI Design Lead',
      logo: logoEmprata, // You'll need to add this logo
      start: '2023',
      end: '2024',
    },
    {
      company: 'ResolveSoft',
      title: 'UX/UI Developer',
      logo: logoResolveSoft, // You'll need to add this logo
      start: '2022',
      end: '2023',
    },
    {
      company: 'Coding Temple',
      title: 'Front-end Developer',
      logo: logoCodingTemple, // You'll need to add this logo
      start: '2021',
      end: '2022',
    },
    {
      company: 'Triple-A Auto LLC',
      title: 'Graphic Designer & Front-end Developer',
      logo: logoTripleA, // You'll need to add this logo
      start: '2018',
      end: '2021',
    },
  ]

  function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        <path
          d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
          className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
        />
        <path
          d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
          className="stroke-zinc-400 dark:stroke-zinc-500"
        />
      </svg>
    )
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

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 max-w-md dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work Experience</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-sky-500 dark:text-zinc-200 dark:hover:text-sky-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-sky-500" />
        {children && <span className="ml-4">{children}</span>}
      </Link>
    </li>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm Spencer Sharp. I live in New York City, where I design the future.",
}

// A preview component very similar to your Article component—each project preview
// links to its corresponding project page (which is wrapped by ProjectLayout).
function ProjectPreview({ project }: { project: ProjectWithSlug }) {
  return (
    <Card as="article">
      <div className="flex gap-4">
      <div className="relative z-10 flex h-12 w-12 items-center flex-none justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image
          src={project.logo}
          alt={`${project.title} logo`}
          width={32}
          height={32}
          unoptimized
          className="h-8 w-8"
        />
      </div>
      <div><div className="mt-3 flex items-center space-x-4">
        <Card.Title href={`/projects/${project.slug}`}>
          {project.title}
        </Card.Title>
      </div>
      <Card.Description>{project.description}</Card.Description>
      <Card.Cta>Read project</Card.Cta></div>
      </div>
    </Card>
  )
}

export default async function Home() {
  // Fetch all projects similar to how you fetch articles on your Home page.
  const projects = await getAllProjects()

  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-[65%_32%]">
          <div className='flex flex-col justify-between'>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              UX/UI Developer crafting accessible digital experiences
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              I'm Michael Bekele, a UI/UX designer and web developer with over 5
              years of experience creating user-centric digital solutions.
              Currently, I'm working at Emprata for the Federal Communication
              Commission (FCC), where I develop 508-compliant design systems
              that make technology accessible to everyone.
            </p>
            <ul className="mt-6 flex gap-6">
              <SocialLink href="#" aria-label="Follow on X" icon={XIcon} />
              <SocialLink
                href="#"
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
              />
              <SocialLink
                href="#"
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
              />
              <SocialLink
                href="#"
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              />
            </ul>
          </div>
          <div>
            <div className="hidden max-w-xs px-2.5 lg:block lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mt-16 lg:justify-between">
          <div className="w-full ">
            <h2 className="pt-16 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
              Recent Projects
            </h2>
            <div className="mt-8 grid max-w-md grid-cols-1 gap-y-8">
              {projects.map((project) => (
                <ProjectPreview key={project.slug} project={project} />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-7/12">
            <div className="space-y-10 pt-16">
              <Resume />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
