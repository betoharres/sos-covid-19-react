import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Wrapper, Container, Menu, MenuItem, LoginItem } from './Header.styles'

import { getLocalAuthToken } from '../../storage'

const Header = () => {
  const token = getLocalAuthToken()
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Container>
        <Menu>
          <MenuItem>
            <Link to="/mapa" exact>
              {t('Mapa')}
            </Link>
          </MenuItem>
          {!token && (
            <>
              <MenuItem>
                <Link to="/cadastro">{t('Seja Voluntário')}</Link>
              </MenuItem>
              <LoginItem>
                <Link to="/entrar">{t('Login')}</Link>
              </LoginItem>
            </>
          )}
        </Menu>
      </Container>
    </Wrapper>
  )
}

export default Header
