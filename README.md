# Revelando Sars-CoV-2

<br />
<p align="center">
  <img width="353" height="450" src="./JoshCaudwell.jpg?sanitize=true"
  alt="JoshCaudwell art" />
</p>
<br />
<p align="center">
  Image: <a href="https://www.joshcaudwell.com/">Josh Caudwell</a>
</p>
<br />
<p align="center">
  <strong>
  Vidas continuão sendo perdidas se não lutarmos contra o vírus
  </strong>
</p>

## Missão

Auxiliar no reconhecimento e isolamento de casos de `COVID-19` conectando pessoas com médicos.

## Por quê?

O maior desafio para conter o vírus é sabendo onde ele está. Isto poderia ser
feito através de testes, mas vejo que a maioria dos países estão com muita
dificuldade para oferecer tal ajuda tão importante no momento.  
Números oficiais refletem dias e talvez até semanas atrás, muitas vidas poderiam
ser salvas se: 
- Soubéssemos onde seus sintomas comuns estão aparecendo
neste momento 
- Tivéssemos médicos/enfermeiros voluntários guiando essas 
pessoas com tratamento recomendado 
- Testando pessoas com sintomas.

## Como?

Um site para celulares mostrando um mapa com a localização aproximada desses
registros mantendo a privacidade tanto da pessoa e do voluntário.  
As pessoas poderão criar um novo registro usando o seu número de celular.  
A pessoa irá receber um código SMS para confirmar o registro e o
número inserido.  
Médicos podem ver os números no mapa e ligar para essas pessoas para iniciar
o tratamento, decidir se essas pessoas precisam ser testadas ou pelo menos
reportar para orgãos competentes onde provavelmente casos de `COVID-19` estão
aparecendo.  
Cada novo registro pode ter 5 estados:

    - Esperando contato (estado inicial)
    - Aguardando visita de um médico/enfermeiro
    - Teste pendente (decidido por um médico/enfermeiro)
    - Positivo (Infectado)
    - Descartado (Concluído Através da visita e/ou falta de sintomas, ou teste negativo)


Somente médicos/enfermeiros podem mudar o estado do registro.

## Quando?

Tempo é o nosso inimigo(junto com o vírus). Precisamos agir agora ou o dano será
irreversível.
Qualquer tipo de ajuda é bem-vinda.

## Metas

1. Encontrar mais pessoas para ajudar na missão do projeto.
2. Fazer o serviço conhecido para pessoas comuns.
3. Registar maior número possível de voluntários.

## Iniciando projeto localmente:

### Requisitos:
    * Ruby (backend)
    * Postgres (backend)
    * Redis (backend)
    * Node (frontend)
    * Yarn (frontend)

* Criar uma conta free no [Mapbox](https://account.mapbox.com/auth/signup/) e no [Twilio](https://www.twilio.com/try-twilio)

### Frontend
Projeto no momento pode ser visualizado apenas pelo storybook:

```
$ yarn && yarn storybook
``` 

Para visualizar o mapa, cria uma crie uma conta no mapbox(www.mapbox.com) e coloque a a chave em um arquivo `.env` no root do projeto:
```
REACT_APP_MAP_KEY=pk.Adiusf00418014hfjksah
```

Também no arquivo .env, coloque a url que o app vai fazer requisiçoes:  
```
REACT_APP_API_URL=http://localhost:3000
```

# [Slack](https://soscovid-19.slack.com) 

## [Slack Convites
Abertos](https://join.slack.com/t/soscovid-19/shared_invite/zt-dxzg8hav-wWxYBsSGPOI~mksxuBe_jQ)
