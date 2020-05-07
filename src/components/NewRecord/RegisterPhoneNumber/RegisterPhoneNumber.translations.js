/* eslint-disable max-len */
import i18 from 'i18next'

const pt = {
  Details: `\
    Seu número de celular é obrigatório para que o registro seja válido no sistema.
    Se o número for válido e tiver sinal da operadora, você irá receber um SMS com
    um código numérico de 4 dígitos para inserir, validando assim o registro.
    O registro será apagado caso o número não seja confirmado em até 30 minutos.
    Você pode enviar seus sintomas novamente após esse período se desejar.
  `,
}

i18.addResourceBundle('pt', 'RegisterPhoneNumber', pt)
