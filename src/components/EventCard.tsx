import { Grid, SvgIconProps, Typography } from "@mui/material"
import { WellEventData } from "@completium/event-well-crank"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useTheme } from "@mui/material/styles";
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import { LinkBaseProps } from "@mui/material";
import { SvgIcon } from "@mui/material";
import styled from '@emotion/styled';
import { forwardRef } from "react";

export type EventCardProps = {
  data : WellEventData
}

const getBlockUrl = (hash : string) : string => {
  return `https://hangzhou2net.tzkt.io/${hash}/operations`
}

const getOpUrl = (hash : string) : string => {
  return `https://better-call.dev/hangzhou2net/opg/${hash}/contents`
}

const getContractUrl = (addr : string) : string => {
  return `https://better-call.dev/hangzhou2net/${addr}/operations`
}

const HashTypography = styled(Typography)({
  fontFamily : "'Roboto Mono', monospace"
})

const HashLink = forwardRef((props : LinkBaseProps, ref : any) => {
  return (<Link {...props} ref={ref} target="_blank" underline="none" />
)})

const GreyIcon = forwardRef((props : SvgIconProps, ref : any) => {
  let theme = useTheme()
  let grey = theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400]
  return (
    <SvgIcon {...props} ref={ref} style={{ color : grey }} />
  )
})

export const EventCard = (props : EventCardProps) => {
  let theme = useTheme()
  let grey = theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400]
  return (
    <Grid container style={{ padding: "10px", borderBottom: "1px solid", borderColor: grey }}>
      <Grid item xs={1}>
        <Tooltip title="Block date">
          <GreyIcon><AccessTimeIcon /></GreyIcon>
        </Tooltip>
      </Grid>
      <Grid item xs={11}>
        <Typography>{props.data.time}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="Block hash">
          <GreyIcon><WidgetsIcon/></GreyIcon>
        </Tooltip>
      </Grid>
      <Grid item xs={11}>
        <HashLink href={getBlockUrl(props.data.block)}>
          <HashTypography>
            {props.data.block}
          </HashTypography>
        </HashLink>
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="Operation hash">
          <GreyIcon><ViewHeadlineIcon/></GreyIcon>
        </Tooltip>
      </Grid>
      <Grid item xs={11}>
        <HashLink href={getOpUrl(props.data.op)}>
          <HashTypography>
            {props.data.op}
          </HashTypography>
        </HashLink>
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="Source">
          <GreyIcon><ReceiptIcon/></GreyIcon>
        </Tooltip>
      </Grid>
      <Grid item xs={11}>
        <HashLink href={getContractUrl(props.data.source)}>
          <HashTypography>
            {props.data.source}
          </HashTypography>
        </HashLink>
      </Grid>
    </Grid>
  )
}