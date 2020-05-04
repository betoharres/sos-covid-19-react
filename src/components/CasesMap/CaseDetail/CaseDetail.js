import React from 'react'
import { string } from 'prop-types'

export default function CaseDetail({
  name, 
  cough, 
  diarrhea,
  fever,
  headache,
  hypogeusia,
  hyposmia,
  shortBreath,
}) {
  return (
    <div>{cough}</div>    
  )
}

CaseDetail.propTypes = {
  name: string, 
  cough: string, 
  diarrhea: string,
  fever: string,
  headache: string,
  hypogeusia: string,
  hyposmia: string,
  shortBreath: string,
}
