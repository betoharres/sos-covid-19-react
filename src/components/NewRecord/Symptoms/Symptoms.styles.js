import styled from 'styled-components'
import {
  ListItem as MUIListItem,
  TextField as MUITextField,
  Paper as MUIPaper,
} from '@material-ui/core'

export const Container = styled.main`
  background-color: lightgrey;
`
export const TextField = styled(MUITextField)``
export const Paper = styled(MUIPaper)`
  padding-bottom: 10px;
`
export const ListItem = styled(MUIListItem)``

export const SubTitleContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-conent: flex-end;
  padding: 20px;
  padding-bottom: 10px;
`

export const SymptomsContainer = styled.section`
  padding: 20px;
  padding-top: 10px;
`

export const FieldContainer = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  padding-top: 0;
`

export const ActionContainer = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
`

export const NotesContainer = styled.section`
  padding: 20px;
  padding-bottom: 20px;
`
