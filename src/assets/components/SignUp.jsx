import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.init";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password, terms, name, photo);

    //reset error and status
    setError("");
    setSuccess(false);

    if (!terms) {
      setError("Please accept our terms and conditions");
      return;
    }

    //ask chat-gpt: give me a regex  in js to validate password that contains at least one uppercase and at least  one lowercase, at least one number, at least one spacial character and length has to be at least 6 character

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password should be at least one uppercase, one lowercase, one number and  one spacial character"
      );
      return;
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 character or longer");
    }

    //create User With Email And Password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        //Send verification Email address
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email verification sent!");
        });
      })
      .catch((err) => {
        console.log("ERROR: ", err.message);
        setError(err.message);
        setSuccess(false);
      });

    //Update Profile

    const profile = {
      displayName: name,
      photoURL: photo,
    };
    updateProfile(auth.currentUser, profile)
      .then(() => {
        console.log("User profile updated");
      })
      .catch((err) => {
        console.log("ERROR :", err);
      });
  };
  return (
    <div
      className="hero-content rounded-xl"
      style={{
        backgroundImage: "url(https://i.ibb.co.com/c1yH7NL/b.jpg)",
      }}
    >
      <div className="card bg-white/15 backdrop-blur-sm w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSignUp} className="card-body">
          <h1 className="text-4xl font-bold">Sign Up now!</h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              name="photo"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="btn btn-xs text-black absolute right-4 bottom-11"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                name="terms"
                className="checkbox checkbox-xs"
              />
              <span className="label-text">Accept our terms & conditions</span>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Sign up</button>
          </div>
        </form>
        {error && <p className="text-red-800 font-medium"> {error} </p>}
        {success && (
          <p className="text-green-600 "> Successfully created user </p>
        )}

        <p className="p-4">
          Already have an account, Please{" "}
          <Link className="underline text-blue-600" to="/login">
            Login
          </Link>{" "}
          here
        </p>
      </div>
    </div>
  );
};

export default SignUp;
