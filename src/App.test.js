import React from 'react'
import { render, act } from '@testing-library/react'
import App from './App'

test('renders successfully', async () => {
  let wrapper
  await act(async () => {
    wrapper = render(<App />)
    expect(wrapper).toMatchSnapshot()
  })
})
