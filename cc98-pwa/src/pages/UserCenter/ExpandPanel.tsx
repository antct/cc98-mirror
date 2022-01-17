import muiStyled from '@/muiStyled'
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from '@material-ui/core'
import { ExpansionPanelProps } from '@material-ui/core/ExpansionPanel'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React from 'react'


const ExpansionPanelSummaryS = muiStyled(ExpansionPanelSummary)({
  paddingRight: 12
})

const ExpansionPanelDetailsS = muiStyled(ExpansionPanelDetails)({
  width: '100%',
  padding: '0 0px 24px 0px',
})


type Props = Pick<ExpansionPanelProps, 'expanded' | 'defaultExpanded' | 'onChange'> & {
  /**
   * 标题
   */
  title?: string
}

const ExpandPanel: React.FC<Props> = props => (
  <ExpansionPanel
    expanded={props.expanded}
    defaultExpanded={props.defaultExpanded}
    onChange={props.onChange}
  >
    {props.title && (
      <ExpansionPanelSummaryS expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{props.title}</Typography>
      </ExpansionPanelSummaryS>
    )}
    <ExpansionPanelDetailsS>{props.children || <></>}</ExpansionPanelDetailsS>
  </ExpansionPanel>
)

export default ExpandPanel
