import React, { JSX } from 'react'

interface RichTextNode {
  type: string
  tag?: string
  format?: string
  text?: string
  children?: RichTextNode[]
  fields?: { url?: string }
}

interface RichTextRendererProps {
  content?: {
    root: {
      children: RichTextNode[]
    }
  } | null
}

const renderNode = (node: RichTextNode, key: number): React.ReactNode => {
  switch (node.type) {
    case 'paragraph':
      return <p key={key}>{node.children?.map(renderInline)}</p>
    case 'heading':
      const Tag = node.tag as keyof JSX.IntrinsicElements
      return <Tag key={key}>{node.children?.map(renderInline)}</Tag>
    case 'unordered-list':
      return <ul key={key}>{node.children?.map(renderNode)}</ul>
    case 'ordered-list':
      return <ol key={key}>{node.children?.map(renderNode)}</ol>
    case 'list-item':
      return <li key={key}>{node.children?.map(renderInline)}</li>
    case 'link':
      return (
        <a href={node.fields?.url} key={key} target="_blank" rel="noopener noreferrer">
          {node.children?.map(renderInline)}
        </a>
      )
    default:
      return null
  }
}

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_UNDERLINE = 4

const renderInline = (node: RichTextNode, key?: number): React.ReactNode => {
  let content: React.ReactNode = node.text || node.children?.map(renderInline)

  if (!content) return null

  const format = typeof node.format === 'number' ? node.format : 0

  if (format & FORMAT_BOLD) {
    content = <strong key={key}>{content}</strong>
  }
  if (format & FORMAT_ITALIC) {
    content = <em key={key}>{content}</em>
  }
  if (format & FORMAT_UNDERLINE) {
    content = <u key={key}>{content}</u>
  }

  return <React.Fragment key={key}>{content}</React.Fragment>
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  const nodes = content?.root?.children || []
  return <>{nodes.map(renderNode)}</>
}

export default RichTextRenderer
