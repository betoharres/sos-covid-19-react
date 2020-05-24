/* eslint-disable max-len */
import i18 from 'i18next'

const pt = {
  Welcome: 'Bem-vindo!',
  Intro: `\
ajudacoronavírus.com é um serviço para as pessoas comunicarem sintomas de
COVID-19 de forma segura.
Você escolhe se quer colocar seu nome, porém é necessário sua localização
aproximada e seu numéro de telefone para que a informação seja válida.
Esse projeto é totalmente voluntário, e depende de doações para continuar.
Envie um e-mail para ajudacoronavirusbrasil@gmail.com para ajudar.
Se você é um profissional da saúde, cadastre-se no site!
  `,
}

i18.addResourceBundle('pt', 'Symptoms', pt)
