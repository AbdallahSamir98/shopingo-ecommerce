import BrandSlider from "../BrandSlider/BrandSlider"
import CarsolHome from "../CarsolHome/CarsolHome"
import WhatOffer from "../WhatOffer/WhatOffer"
import AllProducts from "../AllProducts/AllProducts"
import HomeCategory from "./HomeCategory"
import Loading from "../Loading/Loading"


const HomeDisplay = () => {
  return (
    <div>
      {/* <Loading/> */}
      <CarsolHome/>
<HomeCategory/>   
  <AllProducts/>
  <WhatOffer/>
  <BrandSlider/>

  
 
   </div>
  )
}

export default HomeDisplay