import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.init";
import { useState } from "react";
import { FaEye , FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";


const Login = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword , setShowPassword] = useState(false)

  const handleRegistetion = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.tarms.checked;
    console.log(name ,email, password);
    
   

    if(password.length < 6 ){
       setRegisterError("Password has been six cherector or longer")
       return;
    }
 else if( ! /[A-Z]/.test(password)){
  setRegisterError("Your password should have at last one upporCase")
  return;
 }
 else if(!accepted){
   setRegisterError("Please accept Our tarms and Conditions")
   return;
 }

    setRegisterError("")
   setSuccess('')

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        setSuccess("User Created Successfully.");

        updateProfile( res.user, {
           displayName: name
        })
        .then( () => {
           console.log(updateProfile);
        })
        .catch()


        sendEmailVerification(res.user)
        .then( () => {
           alert("Please check Your email and varification Your email")
        })

      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div>
      <div className="mt-10">
        <div className="w-[500px] mx-auto">
          <h1 className=" text-2xl font-semibold">Please Registetion</h1>
          <form onSubmit={handleRegistetion} className=" space-y-4 mt-2">
            <input
              className=" w-full p-2 px-4"
              placeholder="Your Name "
              type="text"
              name="name"
              id=""
            />{" "}
            <br />
            <input
              className=" w-full p-2 px-4"
              placeholder="Email Address "
              type="email"
              name="email"
              id=""
            />{" "}
            <br />
           
           <div className="flex items-center relative">
           <input
              required
              placeholder="Password"
              className=" w-full p-2 px-4 "
              type={ showPassword ? "text " : "password"}
              name="password"
              id=""
            />
            <span className=" absolute right-5" onClick={ () => setShowPassword(!showPassword)}  >
         
              { showPassword ? <FaEyeSlash/> : <FaEye/>}
          </span>
           </div>

           <input type="checkbox" name="tarms" id="tarms" />
           <label htmlFor="tarms">  Tarms and Conditions</label>




            <button className=" w-full btn btn-secondary">Register</button>
          </form>

          {registerError && <p className=" text-red-600">{registerError}</p>}
          {success && <p className=" text-green-500"> {success} </p>}

          <p>Alredy haven accunt? Please <Link to="/register">LogIn </Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
