import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import globalVars from './globalVar'
import { Dropdown } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import img from './image/imagetest.png'

import './App.css';



function EditFood(prop) {
  const { foodtype } = prop;
  const { id } = useParams();
  //console.log("Pass the id: ", id);
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    fooddescription: '',
    foodtypeid: '',
    id: '',
  });
  const [menu, setMenu] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [cardDelete, setCardDelete] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const navigate = useNavigate();

  function toMenu() {
    navigate('/menu');
  }
  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      id: id,
    }));
  }, [id]);

  useEffect(() => {
    const url = globalVars.hostUrl + '/menu?filterID=' + 0;

    fetch(url)
      .then(response => { return response.json() })
      .then(data => {
        //console.log(data);
        setMenu([...data.result])
        //console.log(tmp)
      })
      .catch(error => { console.error('There was an error!', error); });
  }, [])

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      foodtypeid: selectedValue,
    }));
  }, [selectedValue]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function submitButton(e) {

    e.preventDefault();

    console.log(form);
    console.log("type, ", selectedValue);
    convertBase64(form.image).then((base64Image) => {
      const updatedForm = {
        name: form.name,
        price: form.price,
        image: base64Image,
        fooddescription: form.fooddescription,
        foodtypeid: selectedValue,
        id: id,
      };

      setForm(updatedForm); // Update the form state with the updated values

      const bodyData = JSON.stringify({
        food: updatedForm,
      });

      console.log(bodyData);

      const headerInfo = {
        method: 'POST',
        body: bodyData,
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const url = globalVars.hostUrl + '/updatefood'
      fetch(url, headerInfo)
        .then(response => {
          console.log("Login Success", response.status);
          if (response.status === 401)
            throw new Error("Add Course Fail.")
          else
            navigate('/menu')
        }).catch((err) => {
          console.log(err.message)
          setErrorMessage(err.message)
        })

    })

  }

  const desiredKeyId = 1;

  useEffect(() => {
    const url = globalVars.hostUrl + '/clearbill';
    const tmpArr = [setCardDelete, id];
    console.log(tmpArr);
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: cardDelete,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Bill cleared!');
        navigate('/menu')
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  function debugfoodtype() {
    console.log(foodtype);
  }
  // function resetButton () {
  //   setForm(
  //     {
  //       email: '',
  //       password: ''
  //     });
  // }

  const handleDropdownChange = (event) => {
    console.log(event.target.value);
    setSelectedValue(event.target.value);
  };

  return (
    <Container className="w-100 mw-100">
      <Row className="justify-content-center pt-2">
        <Col className="" xs={12} md={8}>
          <h1>Edit Mode</h1>
          <Card className="my-2">
            <Card.Body>
              <div style={{
                display: 'block',
                width: 700,
              }}>
                <h4>Card ID: {id}</h4>
              </div>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Food Name" name="fName" value={form.name}
                    onChange={(event) => { setForm({ ...form, name: event.target.value }) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text" placeholder="Food Price" name="fPrice" value={form.price}
                    onChange={(event) => { setForm({ ...form, price: event.target.value }) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formType">
                  <Form.Label>Type</Form.Label>
                  <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">

                      <Form.Select value={selectedValue} onChange={handleDropdownChange}>
                        <option value="0">
                          None
                        </option>
                        {foodtype.map((item) => (
                          <option key={item.typeid} value={item.typeid}>
                            {item.typename}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDesc">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder="Food Description" name="cDesc" value={form.fooddescription}
                    onChange={(event) => { setForm({ ...form, fooddescription: event.target.value }) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" name="cImg"
                    onChange={(event) => { setForm({ ...form, image: event.target.files[0] }) }} />
                </Form.Group>
                <Button variant="primary" onClick={submitButton}>
                  Confirm Changes
                </Button>
                <Button variant="danger" className='mx-2' onClick={() => { setCardDelete(true) }}>
                  Delete
                </Button>
                <Button variant="secondary" onClick={toMenu}>
                  Cancel Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <h1>Display</h1>
          <Card className="my-2">
            {menu.map(item => {
              if (item.id == id) {
                return (
                  <React.Fragment key={item.id}>
                    <Card.Header as="h5" className="d-flex justify-content-between align-items-center text-center custom-card-header" style={{ backgroundColor: '#272727', color: '#ffffff' }}>
                      {item.name}
                    </Card.Header>
                    <Card.Body>
                      <div className="text-center">
                        <Card.Img
                          src={item.image}
                          alt="Card image"
                          style={{ objectFit: 'cover', height: '320px' }}
                        />
                      </div>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="text-center" style={{ color: '#ff0000' }}>
                          {item.price}฿
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row>
                            <Col>
                              <Button variant="danger" className="float-left">
                                -
                              </Button>
                            </Col>
                            <Col className="d-flex align-items-center justify-content-center">
                              <Card.Text className="text-center align-self-center">
                                <h3>0</h3>
                              </Card.Text>
                            </Col>
                            <Col className="d-flex justify-content-end">
                              <Button variant="danger">+</Button>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className="text-center">{item.fooddescription}</ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </React.Fragment>
                );
              }
              return null;
            })}
          </Card>

        </Col>
      </Row>

    </Container>
  );
}

export default EditFood;