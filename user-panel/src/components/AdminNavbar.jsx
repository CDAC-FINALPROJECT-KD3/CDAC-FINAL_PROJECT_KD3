// import { useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function AdminNavbar() {
  // get navigate function
  const navigate = useNavigate();
  const [userName, setUserName] = useState(""); // Store the user's name

  // Get the user's name from session storage on component load
  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);
  // get the item count from cart slice
  // const count = useSelector((state) => state.cart.itemCount)

  const onLogout = () => {
    // cleat the session storage
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");

    setUserName("");

    // go to login screen
    navigate("/Home");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          My Hotel
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/AdminHome"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/allPropertyList"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Properties_List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/allRoomCategoryList"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                RoomCategory_List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/allRoomList"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Room_List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/UserList"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Users_List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Booking"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Bookings_Details
              </Link>
            </li>
          </ul>
          {/* Right-Aligned Login & Logout Buttons */}
          <div className="d-flex">
            {/* <span className="me-3">
              Welcome : <strong>{userName}</strong>
            </span> */}
            <input
              type="text"
              className="form-control me-3"
              value={userName}
              placeholder="AdminName"
              readOnly
            />
            <Link to="/Login" className="btn btn-primary me-2">
              Login
            </Link>
            <button onClick={onLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default AdminNavbar;
