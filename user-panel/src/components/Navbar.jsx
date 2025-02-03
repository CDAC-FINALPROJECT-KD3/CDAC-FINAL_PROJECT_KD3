// import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  // get navigate function
  const navigate = useNavigate();

  // get the item count from cart slice
  // const count = useSelector((state) => state.cart.itemCount)

  const onLogout = () => {
    // cleat the session storage
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");

    // go to login screen
    navigate("/login");
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
              <Link to='/Home' className="nav-link active" aria-current="page" href="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/Properties' className="nav-link active" aria-current="page" href="#">
                Properties
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/Users' className="nav-link active" aria-current="page" href="#">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/Booking' className="nav-link active" aria-current="page" href="#">
                Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/Login' className="nav-link active" aria-current="page" href="#">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/Login' className="nav-link active" aria-current="page" href="#">
                LogOut
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
