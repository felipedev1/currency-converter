import React from 'react';
import './App.css';
import { Jumbotron, Form, Button, Col, Spinner } from 'react-bootstrap'
import { FaAngleDoubleRight } from 'react-icons/fa'

function App() {
  return (
    <>
      <h1>Conversor de moedas</h1>
      <Jumbotron>
        <Form>
          <Form.Row>
            <Col sm="3">
              <Form.Control placeholder="0"
                value={1}
                required />
            </Col>
            <Col sm="3">
              <Form.Control as="select" >

              </Form.Control>
            </Col>
            <Col sm="1" className="text-center" style={{paddingTop: '5px'}}>
              <FaAngleDoubleRight />
            </Col>
            <Col sm="3">
              <Form.Control as="select" >

              </Form.Control>
            </Col>
            <Col sm="2">
              <Button variant="success" type="submit">
                <Spinner animation="border" size="sm" />
                Converter
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Jumbotron>
    </>
  );
}

export default App;
