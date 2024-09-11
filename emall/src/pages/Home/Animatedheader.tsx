import "animate.css"
import "./Home.css"
import { Row } from "react-bootstrap"
const Animatedheader = () => {
  return (
    <Row >
    <div className="d-flex justify-content-around anime-header py-3 ">
        <div className=" row animate__slower animate__animated animate__slideInRight  animate__infinite	">
    <div className="col text-white">Special offer: enjoy 3 months of shopify for $1/month</div>
    <div className="col text-white">Special offer: enjoy 3 months of shopify for $1/month</div>
   <div className ="col text-white"> Special offer: enjoy 3 months of shopify for $1/month</div></div>
    </div>
    </Row>
  )
}

export default Animatedheader;