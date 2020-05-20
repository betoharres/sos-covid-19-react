import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  Container,
  Paragraph,
  Title,
  SubTitle,
  Line,
  SubLine,
} from './Terms.styles'
import './Terms.translations'

const Terms = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Title>{t('Terms:Title')}</Title>
      <Paragraph>{t('Terms:Intro')}</Paragraph>

      <SubTitle>{t('Terms:TermsOfUseAcceptance')}</SubTitle>
      <Paragraph>
        <Line>{t('Terms:1.1_paragraph')}</Line>
        <Line>{t('Terms:1.2_paragraph')}</Line>
        <Line>{t('Terms:1.3_paragraph')}</Line>
        <Line>{t('Terms:1.4_paragraph')}</Line>
      </Paragraph>

      <SubTitle>{t('Terms:ServiceDescription')}</SubTitle>
      <Paragraph>
        <Line>{t('Terms:2.1_paragraph')}</Line>
        <Line>{t('Terms:2.2_paragraph')}</Line>
        <Line>{t('Terms:2.3_paragraph')}</Line>
        <Line>{t('Terms:2.4_paragraph')}</Line>
        <Line>{t('Terms:2.5_paragraph')}</Line>
        <SubLine>{t('Terms:2.5_paragraph_subitem1')}</SubLine>
        <SubLine>{t('Terms:2.5_paragraph_subitem2')}</SubLine>
      </Paragraph>

      <SubTitle>{t('Terms:UserRegistration')}</SubTitle>
      <Paragraph>
        <Line>{t('Terms:3.1_paragraph')}</Line>
        <Line>{t('Terms:3.2_paragraph')}</Line>
        <Line>{t('Terms:3.3_paragraph')}</Line>
        <SubLine>{t('Terms:3.3_paragraph_subitem1')}</SubLine>
        <SubLine>{t('Terms:3.3_paragraph_subitem2')}</SubLine>
        <SubLine>{t('Terms:3.3_paragraph_subitem3')}</SubLine>
        <SubLine>{t('Terms:3.3_paragraph_subitem4')}</SubLine>
        <SubLine>{t('Terms:3.3_paragraph_subitem5')}</SubLine>
        <Line>{t('Terms:3.4_paragraph')}</Line>
        <SubLine>{t('Terms:3.4_paragraph_subitem1')}</SubLine>
        <SubLine>{t('Terms:3.4_paragraph_subitem2')}</SubLine>
        <Line>{t('Terms:3.5_paragraph')}</Line>
        <Line>{t('Terms:3.6_paragraph')}</Line>
        <SubLine>{t('Terms:3.6_paragraph_subitem1')}</SubLine>
        <SubLine>{t('Terms:3.6_paragraph_subitem2')}</SubLine>
        <SubLine>{t('Terms:3.6_paragraph_subitem3')}</SubLine>
        <SubLine>{t('Terms:3.6_paragraph_subitem4')}</SubLine>
      </Paragraph>

      <SubTitle>{t('Terms:Copyright')}</SubTitle>
      <Paragraph>
        <Line>{t('Terms:4.1_paragraph')}</Line>
      </Paragraph>

      <SubTitle>{t('Terms:Damage')}</SubTitle>
      <Paragraph>
        <Line>{t('Terms:5.1_paragraph')}</Line>
      </Paragraph>

      <SubTitle>{t('Terms:Date')}</SubTitle>
      <Paragraph>
        <Line>{t('Terms:6.1_paragraph')}</Line>
        <Line>{t('Terms:6.2_paragraph')}</Line>
      </Paragraph>

      <SubTitle>{t('Terms:Responsability')}</SubTitle>
      <Paragraph>
        <Line>{t('Terms:7.1_paragraph')}</Line>
        <Line>{t('Terms:7.2_paragraph')}</Line>
      </Paragraph>

      <SubTitle>{t('Terms:GeneralInfo')}</SubTitle>
      <Paragraph>
        <Line>{t('Terms:8.1_paragraph')}</Line>
        <Line>{t('Terms:8.2_paragraph')}</Line>
        <Line>{t('Terms:8.3_paragraph')}</Line>
        <Line>{t('Terms:8.4_paragraph')}</Line>
      </Paragraph>

      <SubTitle>{t('Terms:Foro')}</SubTitle>
      <Paragraph>
        <Line>{t('Terms:9.1_paragraph')}</Line>
      </Paragraph>
    </Container>
  )
}

export default Terms
