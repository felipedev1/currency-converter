import React from 'react'
import ReactDOM from 'react-dom'
import ListCurrencies from './ListCurrencies'

describe('List Currencies test', () => {
  it('render with no crushs', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListCurrencies />, div);
    ReactDOM.unmountComponentAtNode(div);
  }) 
})