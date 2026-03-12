/** @jsx jsx */
import { jsx, Heading, Box } from "theme-ui"
import { Link } from "gatsby"
import { rgba } from "polished"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

type CardProps = {
  item: {
    slug: string
    cover: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
    title: string
    contentFilePath?: string
  }
  overlay?: string
  shadow?: string[]
  eager?: boolean
}

const px = [`64px`, `32px`, `16px`, `8px`, `4px`]
const shadowArray = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

const Card = ({ item, overlay = `#000`, shadow = shadowArray, eager }: CardProps) => (
  <Link
    aria-label={`Visit ${item.title} project page`}
    sx={(t) => ({
      ...t.styles?.a,
      outline: `none`,
      display: `block`,
      overflow: `hidden`,
      "&:focus": {
        boxShadow: `${shadow.join(`, `)}, ${rgba(overlay, 0.5)} 0px 0px 0px 10px`,
      },
      "&:hover, &:focus": {
        "[data-name='card-overlay']": {
          opacity: 1,
        },
      },
      boxShadow: shadow.join(`, `),
      position: `relative`,
    })}
    to={item.slug}
  >
    <Box
      sx={{
        position: `relative`,
        width: `100%`,
        aspectRatio: `4 / 3`,
        overflow: `hidden`,
      }}
    >
      <div
        sx={{
          zIndex: 20,
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`,
          opacity: 0,
          transition: `all 0.3s ease-in-out`,
          color: `white`,
          backgroundColor: rgba(overlay, 0.9),
          position: `absolute`,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        data-name="card-overlay"
      >
        <Heading
          variant="styles.h2"
          sx={{
            my: 0,
            px: 3,
            textShadow: `rgba(0, 0, 0, 0.2) 0px 2px 12px`,
            color: `white`,
            textAlign: `center`,
          }}
        >
          {item.title}
        </Heading>
      </div>

      <GatsbyImage
        loading={eager ? `eager` : `lazy`}
        image={item.cover.childImageSharp.gatsbyImageData}
        alt=""
        sx={{
          width: `100%`,
          height: `100%`,
          "& img": {
            objectFit: `cover`,
          },
        }}
      />
    </Box>
  </Link>
)

export default Card