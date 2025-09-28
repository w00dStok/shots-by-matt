/** @jsx jsx */
import * as React from "react"
import { Flex, jsx, Container, Heading } from "theme-ui"
import { Themed } from "@theme-ui/mdx"
import { animated, useSpring, config } from "react-spring"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

type HeaderProjectProps = {
  title: string
  areas: string[]
  description?: string
  date: string
}

type AvatarStaticQuery = {
  file: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

const HeaderProject = ({ title, areas, description = ``, date }: HeaderProjectProps) => {
  const name = "Matthew Wood Photography"
  const avatar = useStaticQuery<AvatarStaticQuery>(graphql`
    query {
      file(name: { eq: "avatar" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 40, height: 40, quality: 100)
        }
      }
    }
  `)

  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(0, -30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const backButtonProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(-30px, 0, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const infoProps = useSpring({ config: config.slow, delay: 500, from: { opacity: 0 }, to: { opacity: 1 } })

  const formattedDate = React.useMemo(() => {
    if (!date) return "";

    // Try parsing normally
    let dt = new Date(date);

    // If parsing failed or looks European (DD/MM/YYYY), fix it
    if (isNaN(dt.getTime()) && /^\d{1,2}[./-]\d{1,2}[./-]\d{4}$/.test(date)) {
      const parts = date.split(/[./-]/);
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      dt = new Date(year, month, day);
    }

    if (isNaN(dt.getTime())) return date;

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(dt);
  }, [date]);

  return (
    <Flex as="header" variant="layout.header">
      <Container sx={{ textAlign: `center`, my: 4, zIndex: 10 }}>
        <animated.div style={backButtonProps}>
          <Link
            to="/"
            aria-label={`${name} - Back to homepage`}
            sx={{
              display: `flex`,
              alignItems: `center`,
              color: `text`,
              textDecoration: `none`,
              svg: {
                transition: `transform 0.25s cubic-bezier(0.455, 0.03, 0.515, 0.955)`,
              },
              "&:hover, &:focus": { svg: { transform: `translateX(-6px)` } },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <div
              sx={{
                overflow: `hidden`,
                borderRadius: `full`,
                width: `40px`,
                height: `40px`,
                display: `inline-block`,
                boxShadow: `md`,
                mx: 2,
              }}
            >
              {avatar?.file?.childImageSharp?.gatsbyImageData && (
                <GatsbyImage image={avatar.file.childImageSharp.gatsbyImageData} alt="Avatar" />
              )}
            </div>
            <span sx={{ fontWeight: `medium` }}>{name}</span>
          </Link>
        </animated.div>
        <div sx={{ mt: 4, mb: [6, 6, 7] }}>
          <animated.div style={titleProps}>
            <Heading as="h1" variant="styles.h1">
              {title}
            </Heading>
          </animated.div>
          <animated.div style={infoProps}>
            {formattedDate && (
              <Themed.p sx={{ mb: 0, mt: 4 }}>{formattedDate}</Themed.p>
            )}
            <div>
              {areas.map((area, index) => (
                <React.Fragment key={area}>
                  {index > 0 && `, `}
                  {area}
                </React.Fragment>
              ))}
            </div>
            {description && (
              <div sx={{ maxWidth: `900px`, mx: `auto`, mt: 5, p: { textAlign: `left`, overflowWrap: `break-word` } }}>
                {description}
              </div>
            )}
          </animated.div>
        </div>
      </Container>
    </Flex>
  )
}

export default HeaderProject
