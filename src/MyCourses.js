
import React, { useState,useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import glovalVars from './globalVar'
import './App.css';

function MyCourses(prop) {
  const {token} = prop
  //const [data, setData] = useState(null);
  const [myCourseArr, setmyCourseArr] = useState([]);


  useEffect(() => {
    if(token !== null){
      const bodyData = JSON.stringify({email:token.email})
      const headerInfo = {method:"POST",
                          body:bodyData,
                          headers:{'Content-Type':'application/json',
                                    authorization:'Bearer '+token.token,}
                          }
    const url = glovalVars.hostUrl + '/myCourse'
    console.log(url)
    fetch(url, headerInfo)
      .then(response => {return response.json()})
      .then(data => {
        console.log(data.result)
        setmyCourseArr([...data.result]);
      })
      .catch(error => { console.log('There was an error!', error);});
    }
  }, [token])
  
  return (
    <Container className="w-100 mw-100">

       <Row className="justify-content-center pt-2">
       <Col className="text-center"> <h2> My Registered Courses </h2></Col>
       </Row>
      <Row className="justify-content-center pt-2">
        <Col className="text-center" xs={12} md={4}>
          <Card className="my-2">
            <Card.Header as="h5">DTXXX Name</Card.Header>
            <Card.Body>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-center" xs={12} md={4}>
          <Card className="my-2">
            <Card.Header as="h5">DTXXX Name</Card.Header>
            <Card.Body>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-center" xs={12} md={4}>
          <Card className="my-2">
            <Card.Header as="h5">DTXXX Name</Card.Header>
            <Card.Body>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
    </Container>
  );
}

export default MyCourses;