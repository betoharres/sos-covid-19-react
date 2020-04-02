/* eslint-disable */
import React from 'react'
import { string, bool, arrayOf, shape } from 'prop-types'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { Container } from './ReportInfo.styles'

export default function ReportInfo({ reports }) {
  return <Container></Container>
}

ReportInfo.propTypes = {
  phone: string.isRequired,
  state: string.isRequired,
}
