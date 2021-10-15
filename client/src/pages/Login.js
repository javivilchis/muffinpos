import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Login(props) {
  const [formState, setFormState] = useState({ employeeID: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          employeeID: formState.employeeID,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div style={{ backgroundColor: 'burlywood' }}>
      <Container style={{ position: 'relative' }}>
        <Row>
          <Col className="col py-5 md-offset-4">
            <Card
              className="col-12 col-md-6 mx-auto"
              style={{ marginTop: '145px', marginBottom: '405px' }}
            >
              <Card.Body>
                <img src="/images/muffin.svg" width="80vh" height="80vh"></img>
                <br />
                <span className="logo" style={{fontSize: "45px"}}>Muffin</span>
                <br />
                <Form onSubmit={handleFormSubmit} className="w-100">
                  <Form.Group className="mb-3">
                    <Form.Label>Employee ID #</Form.Label>
                    <Form.Control
                      type="employeeID"
                      className="form-control"
                      placeholder="Enter ID"
                      name="employeeID"
                      id="employeeID"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className="form-control"
                      placeholder="Enter Password"
                      name="password"
                      type="password"
                      id="pwd"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {error ? (
                    <div>
                      <p className="error-text">
                        The provided credentials are incorrect
                      </p>
                    </div>
                  ) : null}
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>{' '}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
