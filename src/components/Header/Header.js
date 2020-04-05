import React from 'react'
import { Link } from 'react-router-dom'

import { Wrapper, Container, Menu, MenuItem } from './Header.styles'

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Menu>
          <MenuItem>
            <Link to="/" exact>
              Mapas
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/cadastro">Cadastro</Link>
          </MenuItem>
        </Menu>
      </Container>
    </Wrapper>
  )
}

export default Header
