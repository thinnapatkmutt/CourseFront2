import book from './image/book1.jpg';
import work from './image/work.jpg';
import classroom from './image/classroom.jpg';
import meat from './image/meat1.png'
import banner1 from './image/banner1.png'
import banner3 from './image/banner3.png'
import React, { useState, useEffect } from 'react';
import globalVars from './globalVar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import glovalVars from './globalVar'
import { Navigate, useNavigate } from 'react-router-dom';

import './App.css';
import { Link } from 'react-router-dom';

function HomePage(prop) {

  const [top3, setTop3] = useState([]);

  const { setTokenFn } = prop
  const [errorMessage, setErrorMessage] = useState("")
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [tableNo, setTableNo] = useState('');

  const Navigate = useNavigate(); // Hook for navigation

  function ToHome(){
    console.log("To Homepage");
    window.location.reload();
  }

  const handleTableNoChange = (event) => {
    const value = event.target.value;
  
    if (value === '') {
      setTableNo('');
    } else {
      const intValue = parseInt(value);
  
      if (!isNaN(intValue) && intValue <= 20) {
        setTableNo(intValue.toString());
      }
    }
  };

  useEffect(() => {
    console.log("tableNo: ", tableNo);
  }, [tableNo]);

  function submittest() {
    Navigate('/')
  }
  function submitButton(e) {
    e.preventDefault();
    console.log(form);
    const bodyData = JSON.stringify({ user: { email: form.email, password: form.password } })
    const headerInfo = {
      method: "POST",
      body: bodyData,
      headers: { 'Content-Type': 'application/json' }
    }
    const url = glovalVars.hostUrl + '/login'
    fetch(url, headerInfo)
      .then(response => {
        console.log(response)
        if (response.status === 401) {
          throw new Error("Login Fail.")
        }
        else {
          return response.json()
        }
      }).then(data => {
        console.log(data.token)
        setTokenFn({ token: data.token, email: form.email })
        setErrorMessage("")
        resetButton();
        Navigate('/mycourses')
      }).catch(err => {
        console.log(err.message)
        setTokenFn(null)
        setErrorMessage(err.message)
      })
  }
  function resetButton() {
    setForm(
      {
        email: '',
        password: ''
      });
  }

  useEffect(() => {
    const url = globalVars.hostUrl + '/top3'
    fetch(url)
      .then(response => { return response.json() })
      .then(data => {
        setTop3([...data.result])
      })
      .catch(error => { console.error('There was an error!', error); });
  }, [])

  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform your form submission logic here
  };

  return (
    <Container className="w-100 mw-100">


      <Row className="justify-content-center align-items-center mt-3 mb-3">

      </Row>
      <Row className="justify-content-center">
        <Col className="text-center">
          <Carousel >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={meat}
                alt="Unlock your potential with our courses"
              />
              <Carousel.Caption>
                <h5>Welcome to our website</h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={banner1}
                alt="Transform your future with education"
              />
              <Carousel.Caption>
                <h5></h5>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={banner3}
                alt="Upgrade your skills"
              />
              <Carousel.Caption>
                <h5></h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row className="justify-content-center pt-2">
        <Col className="" xs={12} md={6}>
          <Card className="my-2">
            <Card.Header as="h5">Please fill the information.</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-1" controlId="formBasicPassword">
                  <Form.Label>Table No.</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="1-20"
                    name="table"
                    value={tableNo}
                    onChange={handleTableNoChange}
                  />
                </Form.Group>

                <Button variant="danger" className="mt-1" type="submit">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
          <Card style={{ backgroundColor: '#272727' }}>
            <Card.Body className="d-flex align-items-center">
              <Col className="text-center">
                <Link className="myLink" to="/bill">
                  <h2 style={{ color: '#ffffff' }}>Click here to check the bill</h2>
                </Link>
              </Col>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}

export default HomePage;