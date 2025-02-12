import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Register from "./Register";
import { useState } from "react";
import { signin } from "../services/User";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // get navigation hook
  const navigate = useNavigate();

  const onLogin = async () => {
    console.log("In the Onlogin fun");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,20}$/;

    // let isValid = true;

    if (email.length === 0) {
      // alert("Enter your email");
      toast.error("please Enter your Email.");
    } else if (!emailRegex.test(email)) {
      // setEmailError("Invalid email format.");
      toast.error("Invalid email format.");
      // isValid = false;
    } else if (password.length === 0) {
      toast.error("please Enter your Password.");
    } else {
      //call API berify the user
      const result = await signin(email, password);
      console.log(result);
      console.log(result.user);
      console.log(result.user.role);
      console.log(result.code);
      console.log(result.status);
      if (result.user.role == "CUSTOMER") {
        toast.success("Login Successfully .");
        // get the admin details
        // const { firstName, lastName, phone, token } = result['data']
        const { firstName, lastName, mobileNo, token } = result.user;

        // cache the admin details in session storage
        sessionStorage["name"] = `${firstName} ${lastName}`;
        sessionStorage["token"] = result.token;
        sessionStorage["phone"] = mobileNo;
        // sessionStorage['email'] = email
        sessionStorage.setItem("email", email);
        // alert("Welcom to home page .");
        navigate("/Home");
      } else if (result.user.role == "ADMIN") {
        toast.success("Admin Login Successfully .");
        // get the admin details
        // const { firstName, lastName, phone, token } = result['data']
        const { firstName, lastName, mobileNo, token } = result.user;

        // cache the admin details in session storage
        sessionStorage["name"] = `${firstName} ${lastName}`;
        sessionStorage["token"] = result.token;
        sessionStorage["phone"] = mobileNo;
        // sessionStorage['email'] = email
        sessionStorage.setItem("email", email);
        // alert("Welcom to home page .");
        navigate("/AdminHome");
      } else {
        toast.error("User Details Not Valid");
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
        <div className="col-4"></div>
        <div className="col-4"></div>
        <div
          className="col backgroundTransparent"
          style={{ marginTop: "120px" }}
        >
          <h2 className="page-header">Login</h2>
          <div className="form">
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
              <label htmlFor="">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="xyz#123XXX"
              />
            </div>
            <div className="mb-3">
              <div>
                Don't have an account ?<Link to="/register">Register here</Link>
              </div>
              <br />
              <button
                className="btn btn-success"
                onClick={onLogin}
                type="button"
              >
                Login
              </button>
            </div>
            {/* <div>
              Don't want to make account ? <Link to="/Home">Go-Home page</Link>{" "}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
