import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    alert(formData.name + ', ' + formData.email + ', ' + formData.message);
    // submit form data to server or external API
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formMessage">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ContactForm;