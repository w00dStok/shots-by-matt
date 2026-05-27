/** @jsx jsx */
import React, { useState } from "react"
import type { HeadFC, PageProps } from "gatsby"
import { jsx, Container, Box } from "theme-ui"
import { animated, useSpring, config } from "react-spring"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import Layout from "./layout"
import HeaderProject from "./header-project"
import ProjectPagination from "./project-pagination"
import Seo from "./seo"
import PhotoModal from "./photo-modal"

export type EmiliaProjectProps = {
  project: {
    excerpt: string
    date: string
    slug: string
    title: string
    areas: string[]
    contentFilePath: string
    photos: string[] | null
    cover: {
      childImageSharp: {
        resize: { src: string }
      }
    }
  }
  images: {
    nodes: {
      name: string
      childImageSharp: { gatsbyImageData: IGatsbyImageData }
    }[]
  }
}

export type EmiliaProjectPageContext = {
  prev: {
    slug: string
    contentFilePath: string
    title: string
    cover: { childImageSharp: { gatsbyImageData: IGatsbyImageData } }
  }
  next: {
    slug: string
    contentFilePath: string
    title: string
    cover: { childImageSharp: { gatsbyImageData: IGatsbyImageData } }
  }
}

export type PhotoEntry = {
  name: string
  url?: string
  gatsbyImageData?: IGatsbyImageData
}

const BASE_URL = process.env.GATSBY_PHOTOS_BASE_URL

const Project: React.FC<React.PropsWithChildren<PageProps<EmiliaProjectProps, EmiliaProjectPageContext>>> = ({
  data: { project, images },
  pageContext: { prev, next },
  children,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const gridFade = useSpring({ config: config.slow, delay: 400, from: { opacity: 0 }, to: { opacity: 1 } })

  const folderName = project.contentFilePath.split("/").slice(-2, -1)[0]
  const isR2Mode = !!BASE_URL && !!project.photos?.length

  const photos: PhotoEntry[] = isR2Mode
    ? project.photos!.map((filename) => ({
        name: filename,
        url: `${BASE_URL}/${folderName}/${encodeURIComponent(filename)}`,
      }))
    : images.nodes.map((img) => ({
        name: img.name,
        gatsbyImageData: img.childImageSharp.gatsbyImageData,
      }))

  return (
    <Layout>
      <HeaderProject title={project.title} description={children} areas={project.areas} date={project.date} />
      <Container sx={{ mt: [`-6rem`, `-6rem`, `-8rem`] }}>
        <animated.div style={gridFade}>
          <div
            sx={{
              display: `grid`,
              gridTemplateColumns: [`repeat(2, 1fr)`, `repeat(3, 1fr)`, `repeat(4, 1fr)`],
              gap: [`2px`, `4px`, `6px`],
              mb: [4, 4, 5],
            }}
          >
            {photos.map((photo, i) => (
              <Box
                key={photo.name}
                onClick={() => setSelectedIndex(i)}
                sx={{
                  position: `relative`,
                  overflow: `hidden`,
                  aspectRatio: `1`,
                  cursor: `pointer`,
                  bg: `gray`,
                  "&:hover .thumb-overlay": { opacity: 1 },
                  "&:hover img": { transform: `scale(1.04)` },
                }}
              >
                {photo.gatsbyImageData ? (
                  <GatsbyImage
                    image={photo.gatsbyImageData}
                    alt={photo.name}
                    style={{ width: `100%`, height: `100%` }}
                    imgStyle={{ objectFit: `cover`, transition: `transform 0.35s ease` }}
                  />
                ) : (
                  <img
                    src={photo.url}
                    alt={photo.name}
                    loading="lazy"
                    style={{
                      width: `100%`,
                      height: `100%`,
                      objectFit: `cover`,
                      transition: `transform 0.35s ease`,
                      display: `block`,
                    }}
                  />
                )}
                <div
                  className="thumb-overlay"
                  sx={{
                    position: `absolute`,
                    inset: 0,
                    bg: `rgba(0,0,0,0.25)`,
                    opacity: 0,
                    transition: `opacity 0.25s ease`,
                  }}
                />
              </Box>
            ))}
          </div>
        </animated.div>
        <ProjectPagination prev={prev} next={next} />
      </Container>

      {selectedIndex !== null && (
        <PhotoModal
          photos={photos}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </Layout>
  )
}

export default Project

export const Head: HeadFC<EmiliaProjectProps> = ({ data: { project } }) => (
  <Seo
    title={project.title}
    description={project.excerpt}
    pathname={project.slug}
    image={project.cover.childImageSharp.resize.src}
  />
)
