import React, { useState } from 'react';
import './App.css';
import { Jumbotron, Form, Button, Col, Spinner, Alert, Modal } from 'react-bootstrap'
import { FaAngleDoubleRight } from 'react-icons/fa'
import axios from 'axios'
import ListCurrencies from './ListCurrencies'

const FIXER_URL = 'https://data.fixer.io/api/latest?access_key=406d48996ebc3d65084baabd20b3e577&format=1'

function App() {
  const [value, setValue] = useState('1')
  const [currencyFrom, setCurrencyFrom] = useState('USD')
  const [currencyTo, setCurrencyTo] = useState('BRL')
  const [showSpinner, setShowSpinner] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [formValidated, setFormValidated] = useState(false)
  const [resultConvert, setResultConvert] = useState('')

  function handleValue(event) {
    setValue(event.target.value.replace(/\D/g, ''))
  }

  function handleCurrencyFrom(event) {
    setCurrencyFrom(event.target.value)
  }

  function handleCurrencyTo(event) {
    setCurrencyTo(event.target.value)
  }
  
  function handleCloseModal(event) {
    setValue('1')
    setFormValidated(false)
    setShowModal(false)
  }

  function convert(event) {
    event.preventDefault()
    if(event.currentTarget.checkValidity() === true) {
      setFormValidated(true)
      setShowSpinner(true)
      axios.get(FIXER_URL)
        .then(res => {
          const quotation = getQuote(res.data)
          if(quotation) {
            setResultConvert(`${value} ${currencyFrom} = ${quotation} ${currencyTo} `)
            setShowModal(true)
            setShowSpinner(false)
            setShowErrorMessage(false)
          } else {
            showError()
          }
        })
        .catch(err => {
          showError()
        })
      }
    }
    
    function showError(){
      setShowSpinner(false)
      setShowErrorMessage(true)
  }

  function getQuote(quoteData) {
    if(!quoteData || quoteData.success !== true) {
      return false;
    }
    const quoteFrom = quoteData.rates[currencyFrom]
    const quoteTo = quoteData.rates[currencyTo]
    const quoteResult = (1 / quoteFrom * quoteTo) * value
    return quoteResult.toFixed(2);
  }


  return (
    <>
      <h1>Conversor de moedas</h1>
      <Alert variant="danger" show={showErrorMessage}>
        Erro obtendo dados de conversão, tente novamente.
      </Alert>
      <Jumbotron>
        <Form onSubmit={convert} noValidate validated={formValidated}>
          <Form.Row>
            <Col sm="3">
              <Form.Control placeholder="0"
                value={value}
                onChange={handleValue}
                required />
            </Col>
            <Col sm="3">
              <Form.Control as="select"
                value={currencyFrom}
                onChange={handleCurrencyFrom} >
                <ListCurrencies />
              </Form.Control>
            </Col>
            <Col sm="1" className="text-center" style={{ paddingTop: '5px' }}>
              <FaAngleDoubleRight />
            </Col>
            <Col sm="3">
              <Form.Control as="select"
                value={currencyTo}
                onChange={handleCurrencyTo} >
                <ListCurrencies />
              </Form.Control>
            </Col>
            <Col sm="2">
              <Button variant="success" type="submit" data-testid="btn-convertion">
                <span className={showSpinner ? "" : "hidden"}>
                  <Spinner animation="border" size="sm" />
                </span>
                <span className={showSpinner ? "hidden" : ""}>
                  Converter
                </span>
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <Modal show={showModal} onHide={handleCloseModal} >
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body data-testid="modal">
            {resultConvert}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleCloseModal}>
              Nova Conversão
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </>
  );
}

export default App;
