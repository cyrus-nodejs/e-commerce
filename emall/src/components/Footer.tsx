import { Container } from "react-bootstrap"

const Footer = () => {
  return (
<Container fluid className="">
    <div className="d-flex bg-dark p-3">
  <div className="me-auto text-white">
  <div className="d-flex align-items-center">
  <div className="flex-shrink-0">
  <i className='bx bxs-truck'></i>
  </div>
  <div className="flex-grow-1 ms-3">
    Free delivery
  </div>
</div>
    </div>
  <div className="me-auto text-white">
  <div className="d-flex align-items-center">
  <div className="flex-shrink-0">
  <i className='bx bx-chat'></i>
  </div>
  <div className="flex-grow-1 ms-3">
  24/7 Help Center
  Dedicated 24/7 support
  </div>
</div>
  </div>
  <div className="me-auto p-2 text-white">
  <div className="d-flex align-items-center">
  <div className="flex-shrink-0">
  <i className='bx bx-credit-card'></i>
  </div>
  <div className="flex-grow-1 ms-3">
    Safe Payment
  </div>
</div>
  </div>
  <div className=" p-2 text-white">
  <div className="d-flex align-items-center">
  <div className="flex-shrink-0">
  <i className='bx bxs-shopping-bags'></i>
  </div>
  <div className="flex-grow-1 ms-3">
  Shop With Confidence
  If goods have problems
  </div>
</div>
  </div>
</div>
</Container>
  )
}

export default Footer