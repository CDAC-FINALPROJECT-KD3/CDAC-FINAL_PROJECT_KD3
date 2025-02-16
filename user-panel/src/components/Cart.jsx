import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHotelById } from "../services/Hotel";
function HotelCart({ id, roomNo, hotelId, roomType, price,city,description,image,availability }) {
  console.log(id, roomNo, hotelId, roomType, price,city,description,image,availability)
  const [hotel,setHotel]=useState([]);
        
  const onLoadRoomList=async()=>{
      const result = await getHotelById(hotelId);
      console.log(result);
      setHotel(result);
  }
  useEffect(() => {
      // load all categories when this component is loaded on the screen
      onLoadRoomList()
    }, [])

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ margin: "30px" }}>
          <div class="card" style={{ width: "18rem" }}>
            <img src={image} class="card-img-top" alt="..." style={{height:"200px"}} />
            <div class="card-body">
              <h5 class="card-title">{hotel.hotel_Name}</h5>
              {/* <h6 class="card-title">price :{price}</h6>
              <p class="card-text">{description}</p> */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h6 class="card-title">Price: {price}</h6>
                <p class="card-text" style={{ marginLeft: "10px", flex: "" }}>Rating : {hotel.ratings} star</p>
              </div>            
              {/* <Link to={`/hotalDetails/${id}`} class="btn btn-primary">
                Book Now
              </Link> */}
              <Link 
                to={`/hotelDetails`} 
                state={{ 
                  roomDetails: { id, roomNo, hotelId, roomType, price, city, description, image, availability } ,
                  hotelDetails: hotel
                }} 
                class="btn btn-primary">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HotelCart;
