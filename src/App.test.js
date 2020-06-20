import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import axiosMock from 'axios'

describe('currency converter component test', () => {
  it('should simulate a currency conversion', async () => {
    const { findByTestId, getByTestId } = render(<App />)
    axiosMock.get.mockResolvedValueOnce({
      data: {success: true, rates: {BRL: 4.564292, USD: 1.101049}}
    })
    fireEvent.click(getByTestId('btn-convertion'))
    const modal = await findByTestId('modal')
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(modal).toHaveTextContent('1 USD = 4.15 BRL')
  }) 
})