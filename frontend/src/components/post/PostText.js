import React, { useEffect, useRef, useState } from 'react'

export default function PostText({ post, showFullText = false }) {
  if (!post.textContent) return null

  const ref = useRef(null)

  const [of, setOf] = useState(false)

  const isOverflown = ({
    clientWidth,
    clientHeight,
    scrollWidth,
    scrollHeight
  }) => {
    return scrollHeight > clientHeight || scrollWidth > clientWidth
  }

  useEffect(() => {
    setOf(isOverflown(ref.current))
  })

  return (
    <div
      ref={ref}
      className={`relative border p-3 mt-2 dark:border-gray-800 rounded overflow-hidden ${
        !showFullText ? 'transition dark:hover:bg-gray-800 max-h-32' : ''
      }`}
    >
      {!showFullText && of && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent dark:to-gray-900 to-white" />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: post.textContent }}
        className={`prose prose-sm dark:prose-dark max-w-none h-full`}
      />
    </div>
  )
}