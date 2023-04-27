import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const initialValues = { username: "", email: "", password: "" ,confirmpassword:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };



  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password must be less than 10 characters";
    }if (!values.confirmpassword) {
      errors.confirmpassword = "Confirm password is required";
    } else if (values.password !== values.confirmpassword) {
      errors.confirmpassword = "Passwords do not match";
    }
    
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      toast.success("Signed up successfully");
    }
  }, [formErrors, isSubmit]);

  return (
    <div className="container">
      
      <form onSubmit={handleSubmit}>
        <h1 className="Login">Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="passwords"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="passwords"
              value={formValues.confirmpassword}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.confirmpassword}</p>
            <button className="fluid ui button blue" >
              Submit
            </button>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
            draggable
            pauseOnHover
            closeButton={true}
            style={{ top: '60px', right: '10px' }}
            toastStyle={{ backgroundColor: '#212529', color: '#fff' }}
            toastClassName="toast-container"
            bodyClassName="toast-body"
            theme="light"/>                  
          </div>
        
      </form>
    </div>
  );
}

export default App;
