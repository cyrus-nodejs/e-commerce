import  { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Here you would typically send form data to backend API
    console.log('Contact Form Data:', formData);

    setShowSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          {showSuccess && (
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
              Thank you for reaching out! We'll get back to you shortly.
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="contactName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write your message here"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;