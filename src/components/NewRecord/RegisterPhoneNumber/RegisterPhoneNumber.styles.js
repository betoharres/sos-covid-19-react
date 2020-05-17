import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

export const Container = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px;
  padding-bottom: 40px;
  flex-direction: column;
  background-color: white;
`

export const PhoneFieldView = styled.section`
  flex-direction: row;
  margin-top: 15px;
`

export const NotesContainer = styled.section`
  display: flex;
  flex: 1;
  justify-content: center;
  width: 70%;
  padding: 20px;
`

export const Title = styled(Typography)``

export const ActionContainer = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
`
