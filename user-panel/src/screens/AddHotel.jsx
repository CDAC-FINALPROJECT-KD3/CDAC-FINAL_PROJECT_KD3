import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addHotel } from "../services/Hotel";
import AdminNavbar from "../components/AdminNavbar";

function AddHotel() {
  const [hotel_Name, setHotelName] = useState([]);
  const [address, setAddress] = useState([]);

  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  //   const loadCategoriesAndBrands = async () => {
  //     const brandsResult = await getBrandList()
  //     if (brandsResult['status'] == 'success') {
  //       setBrands(brandsResult['data'])
  //     }

  //     const categoriesResult = await getCategoryList()
  //     if (categoriesResult['status'] == 'success') {
  //       setCategories(categoriesResult['data'])
  //     }
  //   }

  //   useEffect(() => {
  //     loadCategoriesAndBrands()
  //   }, [])

  const onSave = async () => {
    if (hotel_Name.length == 0) {
      toast.warn("Please enter Hotel Name");
    } else if (address.length == 0) {
      toast.warn("Please enter Address");
    } else if (city.length == 0) {
      toast.warn("Please enter City");
    } else if (description.length == 0) {
      toast.warn("Please enter Description");
    } else if (rating.length == 0) {
      toast.warn("Please give ratings");
    } else if (!image) {
      toast.warn("Please select image");
    } else {
      const result = await addHotel(
        hotel_Name,
        address,
        city,
        description,
        rating,
        image
      );

      if (result["status"] == "success") {
        toast.success("Successfully added a Hotel");
        navigate(-1);
      } else {
        toast.error(result["error"]);
      }
    }
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <h2 className="header">Add Hotel</h2>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="">Hotel Name</label>
              <input
                onChange={(e) => setHotelName(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="">City</label>
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="">Address</label>
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                rows="2"
                className="form-control"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="">Description</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                rows="2"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="">Rating</label>
              <input
                onChange={(e) => setRating(e.target.value)}
                type="number"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="">Image</label>
              <input
                onChange={(e) => {
                  // get the first image selected by user
                  setImage(e.target.files[0]);
                }}
                type="file"
                className="form-control"
                accept="image/*"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button onClick={onSave} className="btn btn-success">
              Save
            </button>
            <button onClick={onCancel} className="btn btn-danger ms-3">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddHotel;
