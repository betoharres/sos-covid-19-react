import { Fab } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import MUIRefreshIcon from '@material-ui/icons/Refresh'
import MUIRecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import styled from 'styled-components'

export const MapContainer = styled.div``

export const ActionButtonsContainer = styled.div``

export const PopoverView = styled.div`
  padding: 5px;
`

export const IconContainer = styled.div`
  margin-right: 5px;
`

export const RefreshIconContainer = styled.div``

export const ReportIconContainer = styled.div``

export const MapContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100vh
`

export const RefreshContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`

export const SymptomsBtnContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  justify-content: flex-end;
  position: fixed;
  margin-right: 20px;
  top: ${isMobile ? '85%' : '80%'};
  right: 0;
  left: 0;
`

export const RefreshFAB = styled(Fab)`
  ${({ showRefreshBtn }) => `
    opacity: ${showRefreshBtn ? '1' : '0'};
  `}
`
export const ReportFAB = styled(Fab)`
`

export const RefreshIcon = styled(MUIRefreshIcon)``

export const RecordVoiceOverIcon = styled(MUIRecordVoiceOverIcon)``
