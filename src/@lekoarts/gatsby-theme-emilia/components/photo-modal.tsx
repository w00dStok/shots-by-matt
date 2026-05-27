/** @jsx jsx */
import React, { useEffect, useCallback } from "react"
import { jsx } from "theme-ui"
import { GatsbyImage } from "gatsby-plugin-image"
import type { PhotoEntry } from "./project"

type PhotoModalProps = {
  photos: PhotoEntry[]
  selectedIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

const NavButton: React.FC<{
  direction: "prev" | "next"
  onClick: (e: React.MouseEvent) => void
  label: string
}> = ({ direction, onClick, label }) => (
  <button
    aria-label={label}
    onClick={onClick}
    sx={{
      position: `absolute`,
      [direction === `prev` ? `left` : `right`]: [`8px`, `24px`],
      top: `50%`,
      transform: `translateY(-50%)`,
      bg: `rgba(255,255,255,0.12)`,
      border: `none`,
      color: `white`,
      fontSize: [`2rem`, `2.5rem`],
      cursor: `pointer`,
      width: [`44px`, `56px`],
      height: [`44px`, `56px`],
      borderRadius: `50%`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      zIndex: 1001,
      transition: `background 0.2s ease`,
      "&:hover": { bg: `rgba(255,255,255,0.25)` },
      "&:focus": { outline: `2px solid rgba(255,255,255,0.5)`, outlineOffset: `2px` },
    }}
  >
    {direction === `prev` ? `‹` : `›`}
  </button>
)

const PhotoModal: React.FC<PhotoModalProps> = ({ photos, selectedIndex, onClose, onNavigate }) => {
  const current = photos[selectedIndex]
  const hasPrev = selectedIndex > 0
  const hasNext = selectedIndex < photos.length - 1

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === `Escape`) onClose()
      if (e.key === `ArrowLeft` && hasPrev) onNavigate(selectedIndex - 1)
      if (e.key === `ArrowRight` && hasNext) onNavigate(selectedIndex + 1)
    },
    [onClose, onNavigate, selectedIndex, hasPrev, hasNext]
  )

  useEffect(() => {
    document.addEventListener(`keydown`, handleKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = `hidden`
    return () => {
      document.removeEventListener(`keydown`, handleKey)
      document.body.style.overflow = prev
    }
  }, [handleKey])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
      onClick={onClose}
      sx={{
        position: `fixed`,
        inset: 0,
        zIndex: 1000,
        bg: `rgba(0,0,0,0.95)`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
      }}
    >
      <button
        aria-label="Close lightbox"
        onClick={onClose}
        sx={{
          position: `absolute`,
          top: [`8px`, `16px`],
          right: [`8px`, `20px`],
          bg: `transparent`,
          border: `none`,
          color: `white`,
          fontSize: `2.25rem`,
          lineHeight: 1,
          cursor: `pointer`,
          p: 2,
          zIndex: 1002,
          transition: `opacity 0.2s ease`,
          "&:hover": { opacity: 0.6 },
          "&:focus": { outline: `2px solid rgba(255,255,255,0.5)`, outlineOffset: `2px` },
        }}
      >
        ×
      </button>

      {hasPrev && (
        <NavButton
          direction="prev"
          label="Previous photo"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(selectedIndex - 1)
          }}
        />
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: `relative`,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
        }}
      >
        <div
          sx={{
            bg: `white`,
            p: [`12px`, `20px`],
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          {current.gatsbyImageData ? (
            <GatsbyImage
              image={current.gatsbyImageData}
              alt={current.name}
              style={{ maxHeight: `80vh`, maxWidth: `85vw` }}
              imgStyle={{ objectFit: `contain` }}
            />
          ) : (
            <img
              src={current.url}
              alt={current.name}
              style={{
                maxHeight: `80vh`,
                maxWidth: `85vw`,
                objectFit: `contain`,
                display: `block`,
              }}
            />
          )}
        </div>
        <div
          sx={{
            mt: 2,
            color: `rgba(255,255,255,0.5)`,
            fontSize: `0.8rem`,
            letterSpacing: `0.05em`,
          }}
        >
          {selectedIndex + 1} / {photos.length}
        </div>
      </div>

      {hasNext && (
        <NavButton
          direction="next"
          label="Next photo"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(selectedIndex + 1)
          }}
        />
      )}
    </div>
  )
}

export default PhotoModal
