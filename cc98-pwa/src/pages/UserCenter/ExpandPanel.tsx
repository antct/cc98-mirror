import muiStyled from '@/muiStyled'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@mui/material'
import { AccordionProps } from '@mui/material/Accordion'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'


const AccordionSummaryS = muiStyled(AccordionSummary)({
  paddingRight: 12
})

const AccordionDetailsS = muiStyled(AccordionDetails)({
  width: '100%',
  padding: '0 0px 24px 0px',
})


type Props = Pick<AccordionProps, 'expanded' | 'defaultExpanded' | 'onChange'> & {
  /**
   * 标题
   */
  title?: string
}

const ExpandPanel: React.FC<Props> = props => (
  <Accordion
    expanded={props.expanded}
    defaultExpanded={props.defaultExpanded}
    onChange={props.onChange}
  >
    {props.title && (
      <AccordionSummaryS expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{props.title}</Typography>
      </AccordionSummaryS>
    )}
    <AccordionDetailsS>{props.children || <></>}</AccordionDetailsS>
  </Accordion>
)

export default ExpandPanel
