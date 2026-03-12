/** @jsx jsx */
import type { HeadFC, PageProps } from "gatsby"
import { jsx, Container, Box } from "theme-ui"
import { animated, useSpring, config } from "react-spring"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import Layout from "./layout"
import HeaderProject from "./header-project"
import ProjectPagination from "./project-pagination"
import Seo from "./seo"

export type EmiliaProjectProps = {
  project: {
    excerpt: string
    date: string
    slug: string
    title: string
    areas: string[]
    cover: {
      childImageSharp: {
        resize: {
          src: string
        }
      }
    }
  }
  images: {
    nodes: {
      name: string
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }[]
  }
}

export type EmiliaProjectPageContext = {
  prev: {
    slug: string
    contentFilePath: string
    title: string
    cover: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
  next: {
    slug: string
    contentFilePath: string
    title: string
    cover: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}

const Project: React.FC<React.PropsWithChildren<PageProps<EmiliaProjectProps, EmiliaProjectPageContext>>> = ({
  data: { project, images },
  pageContext: { prev, next },
  children,
}) => {
  const imageFade = useSpring({ config: config.slow, delay: 800, from: { opacity: 0 }, to: { opacity: 1 } })

  return (
    <Layout>
      <HeaderProject title={project.title} description={children} areas={project.areas} date={project.date} />
      <Container sx={{ mt: [`-6rem`, `-6rem`, `-8rem`] }}>
        {images.nodes.map((image) => (
          <animated.div key={image.name} style={imageFade}>
            <Box
              sx={{
                mb: [4, 4, 5],
                display: `flex`,
                justifyContent: `center`,
              }}
          >
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        alt={image.name}
        style={{
          maxHeight: `80vh`,
          maxWidth: `90%`,
          marginLeft: `auto`,
          marginRight: `auto`,
        }}
        imgStyle={{
          objectFit: `contain`,
        }}
      />
    </Box>
  </animated.div>
))}
        <ProjectPagination prev={prev} next={next} />
      </Container>
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