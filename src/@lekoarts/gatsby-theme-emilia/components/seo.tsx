import * as React from "react"
import { withPrefix } from "gatsby"

type SEOProps = {
  title?: string
  description?: string
  pathname?: string
  image?: string
  children?: React.ReactNode
}

const Seo = ({ title = ``, description = ``, pathname = ``, image = ``, children = null }: SEOProps) => {
  const seo = {
    title: title || "Matthew Wood Photography",
    description: description || "Photography portfolio of Matthew Wood",
    url: pathname ? `https://www.shotsbymatt.com${pathname}` : "https://www.shotsbymatt.com",
    image: image || "https://www.shotsbymatt.com/avatar.png",
  }
  return (
    <>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content={seo.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.description} />
      <meta name="twitter:creator" content="" />
      <meta name="gatsby-theme" content="@lekoarts/gatsby-theme-emilia" />
      <link rel="icon" type="image/png" sizes="32x32" href={withPrefix(`/favicon-32x32.png`)} />
      <link rel="icon" type="image/png" sizes="16x16" href={withPrefix(`/favicon-16x16.png`)} />
      <link rel="apple-touch-icon" sizes="180x180" href={withPrefix(`/apple-touch-icon.png`)} />
      {children}
    </>
  )
}

export default Seo
