
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">About Us</h1>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title>Welcome to Our E-Commerce Store</Card.Title>
              <Card.Text>
                We are passionate about providing the best online shopping experience.
                Our mission is to bring you high-quality products at competitive prices with
                excellent customer service.
              </Card.Text>

              <Card.Text>
                Founded in 2025, our team is dedicated to innovation and customer satisfaction.
                We use the latest MERN stack technologies to ensure a fast, secure, and seamless
                shopping journey.
              </Card.Text>

              <Card.Text>
                Whether you’re looking for fashion, electronics, or home essentials, we’ve got you covered.
                Thank you for choosing us as your trusted shopping partner.
              </Card.Text>

              <Card.Text className="mt-4">
                <strong>Contact us:</strong> support@ecommerceapp.com
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;






