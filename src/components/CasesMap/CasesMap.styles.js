import MUIRefreshIcon from '@material-ui/icons/Refresh'
import MUIRecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 90%;
`

export const PopoverView = styled.div`
  padding: 5px;
`

export const IconContainer = styled.div`
  margin-right: 5px;
`

export const RefreshIconContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-top: 20px;
`

export const ReportIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  margin-bottom: 20px;
`

export const RefreshIcon = styled(MUIRefreshIcon)``

export const RecordVoiceOverIcon = styled(MUIRecordVoiceOverIcon)``
