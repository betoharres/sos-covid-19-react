const symptomsKeys = {
  Febre: 'fever',
  Cansaço: 'tired',
  Diarréia: 'diarrhea',
  'Tosse seca': 'cough',
  'Dor de cabeça': 'headache',
  'Perda do olfato': 'hyposmia',
  'Perda do paladar': 'hypogeusia',
  'Falta de ar': 'short_breath',
}

export function formatSymptoms(symptoms) {
  return symptoms.reduce((acc, symptom) => {
    acc.concat({ [symptomsKeys[symptom]]: true })
  }, [])
}
