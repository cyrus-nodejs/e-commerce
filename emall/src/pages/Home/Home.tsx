import "../Home/Home.css"
import { Container   } from "react-bootstrap"
import Banner from "./Banner"
import TrendingProduct from "./Trending/TrendingProduct"
import Categories from "./Category/Categories"
import TopDeals from "./TopDeals"
import TopFeatured from "./TopFeatured/TopFeatured"
import Recommended from "./Recommended"
import Navbar from "../../components/Navbar/Navbar"
// import Footer from "../../components/Footer"
import Recentlyviewed from "../Recentlyviewed"
import { useAppDispatch, useAppSelector } from "../../redux/app/hook"
import { fetchAsyncUser, getIsAuthenticated, getAuthUser } from "../../redux/features/auth/authSlice"
import FlashDeals from "./FlashDeals"
import Clearance from "./Clearance"
import { useEffect } from "react"
import NavSearchResults from "../../components/Navbar/NavSearch/NavSearchResults"
import { getSearchTerm } from "../../redux/features/items/itemSlice"
const Home = () => {
  
  
  const dispatch = useAppDispatch()
  const user = useAppSelector(getAuthUser)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const searchTerm = useAppSelector(getSearchTerm)
  console.log(user)
  console.log(isAuthenticated)

  useEffect(() =>{
    dispatch(fetchAsyncUser())
    
      }, [dispatch])
  return (
    <Container className="home  " fluid >
      

      <div className=" home-index">
          <Navbar />

          <Banner />
          {!searchTerm ? (<div className="">
            <TrendingProduct />
             <Categories />
             <FlashDeals />
             <Clearance />
             <TopDeals />
             <TopFeatured />
            <Recommended />
            
            </div>
      ) : 
      (<div>
        <NavSearchResults />
      </div>) } 
      {user && isAuthenticated && (< Recentlyviewed />)}
      
      </div>

    </Container>
  )
}

export default Home