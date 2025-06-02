
import { Container, Accordion } from 'react-bootstrap';

const FrequentAskedQuestions = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Frequently Asked Questions</h1>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is your return policy?</Accordion.Header>
          <Accordion.Body>
            We offer a 30-day return policy for most items. Products must be in original condition and packaging. Please contact support for assistance.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>How long does shipping take?</Accordion.Header>
          <Accordion.Body>
            Shipping typically takes 5-7 business days within the continental US. International shipping times vary based on location.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Do you offer customer support?</Accordion.Header>
          <Accordion.Body>
            Yes! Our support team is available Monday through Friday, 9am to 5pm. You can contact us via the Contact Us page or email support@ecommerceapp.com.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Can I track my order?</Accordion.Header>
          <Accordion.Body>
            Absolutely! Once your order ships, you will receive a tracking number via email to monitor your package.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>What payment methods do you accept?</Accordion.Header>
          <Accordion.Body>
            We accept major credit cards, PayPal, and other popular payment gateways to make your checkout experience smooth and secure.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FrequentAskedQuestions;