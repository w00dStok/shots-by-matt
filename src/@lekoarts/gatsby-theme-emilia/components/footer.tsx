/** @jsx jsx */
import { Box, jsx, Container, Flex, Link, useColorMode } from "theme-ui"
// import SocialMediaList from "./social-media-list"
import AboutMeMDX from "../texts/about-me.mdx"

const Footer = () => {
  const [colorMode] = useColorMode<"light" | "dark">()
  const isDark = colorMode === `dark`

  return (
    <Box
      as="footer"
      variant="layout.footer"
      sx={{
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, ${isDark ? `0.35` : `0.15`}) 100%)`,
      }}
    >
      <Container>
        <div sx={{ display: `grid`, gridGap: 4, gridTemplateColumns: [`1fr`, `1fr`, `1fr`, `2fr 1fr`] }}>
          <div
            sx={{
              p: { mb: 0 },
              h2: {
                mt: 0,
                mb: 1,
              },
            }}
          >
            <AboutMeMDX />
          </div>
          <Flex
            sx={{
              textAlign: [`center`, `center`, `center`, `right`],
              flexDirection: `column`,
              justifyContent: `flex-end`,
            }}
          >
            <div sx={{ mt: [4, 4, 4, 0] }}>
              <div sx={{ a: { ml: [1, 1, 1, 2], mr: [1, 1, 1, 0] } }}>
                <a
                  href="https://instagram.com/w00dstok"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    mx: 2,
                    color: `text`,
                    textDecoration: `none`,
                    fontSize: 1,
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
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: 8 }}
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                  </svg>
                  Instagram
                </a>
              </div>
              <div sx={{ color: `textMuted`, fontSize: 1 }}>
                Copyright &copy; {new Date().getFullYear()}. All rights reserved.
                <div sx={{ color: `textMuted`, fontSize: 1, mt: 2 }}>
                  Theme by <Link href="https://www.lekoarts.de?utm_source=emilia&utm_medium=Theme">LekoArts</Link>
                </div>
              </div>
            </div>
          </Flex>
        </div>
      </Container>
    </Box>
  )
}

export default Footer
