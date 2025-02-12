import { Link } from 'react-router-dom';
function HotelCart({img,Hname,description,price}){
    return(
        <div>
        <div style={{display:"flex"}} >
        <div style={{margin:"30px"}}>
            <div class="card" style={{width: "18rem"}}>
                <img src={img} class="card-img-top" alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">{Hname}</h5>
                  <h6 class="card-title">price :{price}</h6>
                  <p class="card-text">{description}</p>
                  <Link href="/hotalDetails" class="btn btn-primary">Book Now</Link>
                </div>
            </div>
        </div>
     
        </div>

        </div>
        
    )
}
export default HotelCart