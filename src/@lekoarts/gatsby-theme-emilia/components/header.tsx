/** @jsx jsx */
import { jsx, Heading, Flex } from "theme-ui"
import { animated, useSpring, config } from "react-spring"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

// NOTE: This shadowed header intentionally avoids importing theme-internal files
// like ../hooks/use-emilia-config, ./header-background, ./social-media-list, and ./svg.
// This makes the component self-contained so it compiles without additional shadow files.

type AvatarStaticQuery = {
  file: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

const Header = () => {
  // If you want to pull name/location from config later, you can hardcode for now
  const name = "Matthew Wood Photography"
  const location = "Michigan"
  const assetsPath = "content/assets"

  const avatar = useStaticQuery<AvatarStaticQuery>(graphql`
    query {
      file(name: { eq: "avatar" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 140, height: 140, quality: 100)
        }
      }
    }
  `)

  const fadeUpProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(0, 30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const fadeUpPropsDelay = useSpring({
    config: config.slow,
    delay: 250,
    from: { opacity: 0, transform: `translate3d(0, 30px, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
  })
  const fadeProps = useSpring({ config: config.slow, from: { opacity: 0 }, to: { opacity: 1 } })
  const fadeLongProps = useSpring({ config: config.slow, delay: 600, from: { opacity: 0 }, to: { opacity: 1 } })

  return (
    <Flex as="header" variant="layout.projectHead">
      {/* Simplified background: remove HeaderBackground to avoid theme-internal imports */}
      <div sx={{ textAlign: `center`, my: 5, zIndex: 10 }}>
        <animated.div style={fadeProps}>
          <div
            sx={{
              overflow: `hidden`,
              borderRadius: `full`,
              height: [`100px`, `140px`],
              width: [`100px`, `140px`],
              display: `inline-block`,
              boxShadow: `lg`,
              "> div:not([data-placeholder='true'])": {
                height: [`100px !important`, `140px !important`],
                width: [`100px !important`, `140px !important`],
              },
            }}
          >
            {avatar?.file?.childImageSharp?.gatsbyImageData ? (
              <GatsbyImage image={avatar.file.childImageSharp.gatsbyImageData} alt="Avatar" />
            ) : (
              <div
                sx={{
                  fontSize: 0,
                  position: `absolute`,
                  top: 0,
                  left: 0,
                  width: `100% !important`,
                  right: 0,
                  p: 3,
                  backgroundColor: `red.2`,
                }}
                data-placeholder="true"
              >
                Place an image with the name "avatar" inside the directory "{assetsPath}"
              </div>
            )}
          </div>
        </animated.div>
        <animated.div style={fadeUpProps}>
          <Heading as="h1" variant="styles.h1">
            {name}
          </Heading>
        </animated.div>
        <animated.div style={fadeUpPropsDelay}>
          <Flex
            sx={{
              justifyContent: `center`,
              alignItems: `center`,
              color: `text`,
              fontSize: 2,
              mt: 2,
            }}
          >
            {/* Replace Svg/location icon with a simple emoji to avoid theme-internal Svg */}
            <span role="img" aria-label="Location" sx={{ mr: 2 }}>📍</span>
            {location}
          </Flex>
        </animated.div>
        {/* Socials removed to avoid importing theme-internal SocialMediaList. */}
        {/* You can add your own links here later. */}
        <div data-testid="social-header" sx={{ mt: 4, mb: 6 }}>
          <animated.div style={fadeLongProps}>
            {/* Example placeholder links */}
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mx: 2,
                color: `text`,
                textDecoration: `none`,
                fontSize: 2,
                display: `inline-flex`,
                alignItems: `center`,
                transition: `color 0.3s ease`,
                ":hover": { color: `primary` },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                sx={{ mr: 2 }}
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608.975-.975 2.242-1.263 3.608-1.325C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.17 0-3.552.012-4.805.07-1.042.048-1.608.218-1.98.362-.498.193-.855.425-1.23.8-.375.375-.607.732-.8 1.23-.144.372-.314.938-.362 1.98-.058 1.253-.07 1.635-.07 4.805s.012 3.552.07 4.805c.048 1.042.218 1.608.362 1.98.193.498.425.855.8 1.23.375.375.732.607 1.23.8.372.144.938.314 1.98.362 1.253.058 1.635.07 4.805.07s3.552-.012 4.805-.07c1.042-.048 1.608-.218 1.98-.362.498-.193.855-.425 1.23-.8.375-.375.607-.732.8-1.23.144-.372.314-.938.362-1.98.058-1.253.07-1.635.07-4.805s-.012-3.552-.07-4.805c-.048-1.042-.218-1.608-.362-1.98-.193-.498-.425-.855-.8-1.23-.375-.375-.732-.607-1.23-.8-.372-.144-.938-.314-1.98-.362-1.253-.058-1.635-.07-4.805-.07zm0 3.905a5.933 5.933 0 1 1 0 11.867 5.933 5.933 0 0 1 0-11.867zm0 9.8a3.867 3.867 0 1 0 0-7.733 3.867 3.867 0 0 0 0 7.733zm6.406-10.845a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88z" />
              </svg>
              Instagram
            </a>
            {/* <a href="https://bsky.app/profile/yourhandle">BlueSky</a> */}
          </animated.div>
        </div>
      </div>
    </Flex>
  )
}

export default Header
