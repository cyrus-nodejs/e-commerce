import "../Home/Home.css"
import { Container,   } from "react-bootstrap"
import Banner from "./Banner"
import TrendingProduct from "./Trending/TrendingProduct"
import Categories from "./Category/Categories"
import TopDeals from "./TopDeals"
import TopFeatured from "./TopFeatured/TopFeatured"
import Recommended from "./Recommended"
import Navbar from "../../components/Navbar/Navbar"
import Recentlyviewed from "../Recentlyviewed"
import FlashDeals from "./FlashDeals"
import Clearance from "./Clearance"
const Home = () => {
  return (
    <Container className="home  " fluid >

      <div className="px-3">
          <Navbar />
          <Banner />
            <TrendingProduct />
             <Categories />
             <FlashDeals />
             <Clearance />
             <TopDeals />
             <TopFeatured />
            <Recommended />
            <Recentlyviewed />
      
      
      </div>

    </Container>
  )
}

export default Home