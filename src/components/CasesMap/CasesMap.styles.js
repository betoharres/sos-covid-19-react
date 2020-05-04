import { Fab } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import MUIRefreshIcon from '@material-ui/icons/Refresh'
import MUIRecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import styled from 'styled-components'

export const MapContainer = styled.div``

export const MapContentContainer = styled.div`
  height: 100%;
`

export const ActionButtonsContainer = styled.div`
`

export const PopoverView = styled.div`
  padding: 5px;
`

export const IconContainer = styled.div`
  margin-right: 5px;
`

export const RefreshIconContainer = styled.div`
  justify-content: center;
  margin-top: 20px;
`

export const ReportIconContainer = styled.div`
  margin: 0;
  top: 250px;
  left: 250px;
`

export const RefreshFAB = styled(Fab)`
  position: fixed;
  top: 5%;
  left: 30%;
  transform: translate(-30%, -50%);
`
export const ReportFAB = styled(Fab)`
  position: fixed;
  top: 85%;
  left: ${isMobile ? '80%' : '80%'};
  transform: translate(-50%, -50%);
`

export const RefreshIcon = styled(MUIRefreshIcon)``

export const RecordVoiceOverIcon = styled(MUIRecordVoiceOverIcon)``
