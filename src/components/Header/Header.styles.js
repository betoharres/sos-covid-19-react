import styled from 'styled-components'

const Wrapper = styled.header`
  width: 100%;
  background-color: #eaeaea;
  padding: 15px 0;
`

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
  padding: 0 15px;
`

const Menu = styled.ul`
  list-style: none;
  display: flex;
`

const MenuItem = styled.li`
  font-size: 1rem;
  margin-right: 1rem;
`

export { Wrapper, Container, Menu, MenuItem }
