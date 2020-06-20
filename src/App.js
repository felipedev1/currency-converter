import React, { useState } from 'react';
import './App.css';
import { Jumbotron, Form, Button, Col, Spinner, Alert, Modal } from 'react-bootstrap'
import { FaAngleDoubleRight } from 'react-icons/fa'
import ListCurrencies from './ListCurrencies'

function App() {
  const [value, setValue] = useState('1')
  const [currencyFrom, setCurrencyFrom] = useState('BRL')
  const [currencyTo, setCurrencyTo] = useState('USD')
  const [showSpinner, setShowSpinner] = useState(false)
  const [formValidated, setFormValidated] = useState(false)

  function handleValue(event) {
    setValue(event.target.value.replace(/\D/g, ''))
  }

  function handleCurrencyFrom(event) {
    setCurrencyFrom(event.target.value)
  }

  function handleCurrencyTo(event) {
    setCurrencyTo(event.target.value)
  }

  function convert(event) {
    event.preventDefault()
    setFormValidated(true)
    if(event.currentTarget.checkValidity() === true) {
      //TODO - implement the call to fixer
    }

  }

  return (
    <>
      <h1>Conversor de moedas</h1>
      <Alert variant="danger" show={false}>
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
              <Button variant="success" type="submit">
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
        <Modal show={false}>
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Resultado da conversão aqui...
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success">Nova Conversão</Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </>
  );
}

export default App;
