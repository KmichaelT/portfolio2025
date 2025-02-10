import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects - Innovative Digital Creations & Open-Source Portfolio',
  description:
    "Explore a portfolio of cutting-edge projects where creative design meets robust development. Discover interactive web apps, transformative open-source contributions, and digital masterpieces that leave a lasting impact.",
  openGraph: {
    title: 'Projects - Innovative Digital Creations & Open-Source Portfolio',
    description:
      "Explore a portfolio of cutting-edge projects where creative design meets robust development. Discover interactive web apps, transformative open-source contributions, and digital masterpieces that leave a lasting impact.",
    url: 'https://yourdomain.com/projects',
    siteName: 'YourName',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Innovative Digital Creations & Open-Source Portfolio',
    description:
      "Explore a portfolio of cutting-edge projects where creative design meets robust development. Discover interactive web apps, transformative open-source contributions, and digital masterpieces that leave a lasting impact.",
  },
}

// Killer hero section integrated in your layout
export default async function Projects() {
  const projects = await getAllProjects()

  return (
    <SimpleLayout
      title="Building Tools That Make a Difference"
      intro="Over time, I've worked on various projects, but these are the ones that excite me most. Each application started with a simple question: 'How can I make this better?' Whether it's simplifying time tracking or helping people connect, these projects reflect my attempt to create meaningful solutions through code."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.slug}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={`/projects/${project.slug}`}>
                {project.title}
              </Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
