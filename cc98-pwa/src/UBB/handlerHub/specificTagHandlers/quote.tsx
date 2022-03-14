import { IContext } from '@cc98/context'
import { ITagHandler, TagNode } from '@cc98/ubb-core'
import QuoteIcon from '@mui/icons-material/FormatQuote'
import { Chip } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import React from 'react'


const QuoteS = withStyles(theme => ({
  root: {
    height: 'auto',
    width: '100%',
    alignItems: "normal",
    borderRadius: 0,
    justifyContent: 'left'
  },
  label: {
    whiteSpace: "pre-wrap",
  }
}))(Chip)

const handler: ITagHandler<React.ReactNode> = {
  isRecursive: true,

  enter(node: TagNode, context: IContext) {
    if (!context.quoteRoot) {
      context.quoteRoot = node
      context.quotes = []
    }
  },

  exit(node: TagNode, context: IContext) {
    if (context.quoteRoot === node) {
      context.quoteRoot = null
      context.quotes = []
    }
  },

  render(node: TagNode, context: IContext, children: React.ReactNode[]) {
    context.quotes!.push(children)

    if (context.quoteRoot !== node) {
      return null
    }

    return (
      <div className="ubb-tag-quote-container">
        {context.quotes!.map((item, i) => (
          // <div key={i} className={'ubb-tag-quote-item'}>
          <QuoteS icon={<QuoteIcon sx={{ width: 16, height: 16 }} />} size="small" label={item} />
          // {item}
          // </div>
        ))}
      </div>
    )
  },
}

export default handler
