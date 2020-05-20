const symptomsKeys = {
  Febre: 'fever',
  Cansaço: 'tired',
  Diarréia: 'diarrhea',
  'Tosse seca': 'cough',
  'Dor de garganta': 'sore_throat',
  'Dor de cabeça': 'headache',
  'Perda do olfato': 'hyposmia',
  'Perda do paladar': 'hypogeusia',
  'Falta de ar': 'short_breath',
  'Dedos avermelhados': 'red_fingers',
}

export function formatSymptoms(symptoms) {
  return Array.from(symptoms).reduce(
    (acc, symptom) => ({ ...acc, [symptomsKeys[symptom]]: true }),
    {}
  )
}
