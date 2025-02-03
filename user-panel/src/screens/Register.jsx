import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../services/User";

function Register() {
  // const [id,setId]=useState(0)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");

  // get the navigation hook
  const navigate = useNavigate();

  const onRegister = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (firstName.length == 0) {
      // alert("please Enter your First Name");
      toast.warn("please Enter your First Name");
    } else if (lastName.length == 0) {
      toast.warn("please Enter your Last Name");
    } else if (email.length == 0) {
      toast.warn("please Enter your Email");
    } else if (!emailRegex.test(email)) {
      // setEmailError("Invalid email format.");
      toast.error("Invalid email format.");
      // isValid = false;
    } else if (mobileNo.length == 0) {
      toast.warn("please Enter mobileNo no");
    } else if (password.length == 0) {
      toast.warn("please Enter password");
    } else if (confirmPassword.length == 0) {
      toast.warn("please Enter Confirm Password");
    } else if (password != confirmPassword) {
      toast.error("password does not match");
    } else {
      //call to register api
      console.log(role);
      const result = await signup(
        firstName,
        lastName,
        email,
        mobileNo,
        password,
        role
      );
      console.log(result);
      //if login is sucessfully go to login page
      // if (result["status"] == "success") {
      if (result == "success") {
        //   alert("you are register successfully ..");
        toast.success("Registered successfully ..");
        navigate("/Login");
      } else {
        toast.error(result["error"]);
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/hotal3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "675px",
        width: "100%",
      }}
    >
      <div className="row">
        <div className="col"></div>
        <div className="col backgroundTransparent">
          <h2 className="page-header">Register</h2>
          <div className="form">
            <div className="mb-3">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control"
                placeholder="First Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
                placeholder="Last Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="abc@gmail.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="">Mobile Number</label>
              <input
                type="tel"
                onChange={(e) => setMobileNo(e.target.value)}
                className="form-control"
                placeholder="+91 95XXXXXXXX"
              />
            </div>

            {/* <div className="mb-3">
                    <label htmlFor="">Role</label>
                    <select name="" id="" className="form-control">
                        <option value="" >select Role</option>
                        <option value="">CUSTOMER</option>
                        <option value="">ADMIN</option>
                    </select>
                </div> */}
            <div className="mb-3">
              <label htmlFor="">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="">Confirm Password</label>
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                placeholder="Confirm Password"
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="">Role</label>
              <input
                type="tel"
                onChange={(e) => setRole(e.target.value)}
                className="form-control"
                placeholder="+91 95XXXXXXXX"
              />
            </div> */}
            <div className="mb-3">
              <div>
                Already have an account ? <Link to="/Login">Login here</Link>{" "}
              </div>
              <button className="btn btn-success mt-2" onClick={onRegister}>
                Register
              </button>
            </div>
          </div>
          {/* <div>
            Don't want to make account ? <Link to="/Home">Go-Home page</Link>{" "}
          </div> */}
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
export default Register;
