import Navbar from "./../components/Navbar";
import SearchBar from "../components/SearchBar";
import HotelCart from "./../components/Cart";
import { Link } from 'react-router-dom';
function Home() {
  const Hotels = [
    {
      img: "./images/Hotel4.png",
      Hname: "Alankar",
      description: "Kishore Kumar, Lata Mangeshkar",
      price: "1500/-",
    },
    {
        img: "./images/Hotal9.png",
        Hname: "Sangam",
        description: "Kishore Kumar, Lata Mangeshkar",
        price: "1500/-",
      },
      {
        img: "./images/Hotal8.png",
        Hname: "Sayaji",
        description: "Kishore Kumar, Lata Mangeshkar",
        price: "1500/-",
      },
      {
        img: "./images/Hotal5.png",
        Hname: "AramHotel",
        description: "Kishore Kumar, Lata Mangeshkar",
        price: "3500/-",
      },
      {
        img: "./images/Hotal3.png",
        Hname: "Abhiruchi",
        description: "Kishore Kumar, Lata Mangeshkar",
        price: "500/-",
      },
      {
        img: "./images/Hotel9.png",
        Hname: "Adityaz",
        description: "Kishore Kumar, Lata Mangeshkar",
        price: "2500/-",
      },
      {
        img: "./images/Hotal.png",
        Hname: "SunCity",
        description: "Kishore Kumar, Lata Mangeshkar",
        price: "2500/-",
      },
      {
        img: "./images/Hotel7.png",
        Hname: "Abhinandan",
        description: "Kishore Kumar, Lata Mangeshkar",
        price: "2500/-",
      },
  ];
  return (
    <div>
      <Navbar />
      <div className="page-header" style={{ widtd: "50%", height: "80px" }}>
        <SearchBar />
      </div>
      <hr />
      <div>
        <p>Category</p>
        <Link></Link>
      </div>
      <hr/>
      <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 4 columns
          gap: "20px",
          padding: "20px",
        }}>
      {Hotels.map((Hotels)=>{ 
        return(<HotelCart
        img={Hotels.img}
        Hname={Hotels.Hname}
        description={Hotels.description}
        price={Hotels.price}
      />
    )})}
    </div>
    </div>
  );
}
export default Home;
