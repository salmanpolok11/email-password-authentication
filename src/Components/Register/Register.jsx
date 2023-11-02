import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../Firebase/firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const emailRef = useRef(null)
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setRegisterError("");
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
         if(res.user.emailVerified){
          setSuccess("Your Login Successfull.");
         }
         else{
           alert("please varified your email address")
         }
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };

  const handleForgetP = () =>{
    const email = emailRef.current.value;
    if(!email){
      console.log("please provide vailde email", emailRef.current.value );
      return;
    }
    else if ( !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
    {
       console.log("please write a valide email");
    }

    sendPasswordResetEmail(auth , email)
    .then( () => {
       alert("Please check your email addresh")
    })
    .catch( error =>{
       console.log(error.message);
    })

   
  }



  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                 ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a  onClick={handleForgetP}  href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            {registerError && <p className=" text-red-600">{registerError}</p>}
            {success && <p className=" text-green-500"> {success} </p>}

            <p>New to this website? Please <Link to="/login">Register</Link></p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
