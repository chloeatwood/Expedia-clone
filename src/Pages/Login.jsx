import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import firebase_app from "../01_firebase/config_firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { fetch_users, login_user } from "../Redux/Authantication/auth.action";

const auth = getAuth(firebase_app);
const state = {
  number: "",
  otp: "",
  verify: false,
};

export const Login = () => {
  const [check, setCheck] = useState(state);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, activeUser, user } = useSelector((store) => {
    return {
      isAuth: store.LoginReducer.isAuth,
      activeUser: store.LoginReducer.activeUser,
      user: store.LoginReducer.user,
    };
  });

  const { number, otp, verify } = check;

  let exist = false;
  let data = {};

  for (let i = 0; i <= user.length - 1; i++) {
    if (user[i].number == number) {
      exist = true;
      data = user[i];
      break;
    }
  }
  // console.log(user)
  //

  function onCapture() {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        console.log("Could not clear old reCAPTCHA");
      }
      window.recaptchaVerifier = null;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA verified");
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired");
        },
      },
      auth
    );

    return window.recaptchaVerifier;
  }

  async function handleVerifyNumber() {
    const button = document.querySelector("#nextText");

    if (number.length !== 10) {
      document.querySelector("#loginMesageSuccess").innerHTML = "";

      document.querySelector("#loginMesageError").innerHTML =
        "Mobile Number is Invalid !";

      return;
    }

    if (!exist) {
      document.querySelector("#loginMesageSuccess").innerHTML = "";

      document.querySelector("#loginMesageError").innerHTML =
        "User does not exist. Please create your account!";

      setTimeout(() => {
        window.location = "/register";
      }, 1000);

      return;
    }

    try {
      button.innerText = "Please wait...";
      button.disabled = true;

      const phoneNumber = `+1${number}`;

      console.log("Attempting Firebase login with:", phoneNumber);

      const appVerifier = onCapture();

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      console.log("SMS successfully sent");

      window.confirmationResult = confirmationResult;

      setCheck({
        ...check,
        verify: true,
      });

      document.querySelector("#loginMesageSuccess").innerHTML =
        `OTP sent to ${number}!`;

      document.querySelector("#loginMesageError").innerHTML = "";

      button.style.display = "none";

    } catch (error) {
      console.error(
        "Firebase phone auth error:",
        error.code,
        error.message
      );

      document.querySelector("#loginMesageSuccess").innerHTML = "";

      document.querySelector("#loginMesageError").innerHTML =
        `${error.code}: ${error.message}`;

      button.innerText = "SignIn";
      button.disabled = false;

      // Clean up reCAPTCHA so it can be recreated
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {}

        window.recaptchaVerifier = null;
      }
    }
  }

  //
  async function verifyCode() {
    if (!window.confirmationResult) {
      document.querySelector("#loginMesageError").innerHTML =
        "Please request an OTP first.";

      return;
    }

    try {
      const result = await window.confirmationResult.confirm(otp);

      console.log("Firebase login successful:", result.user);

      document.querySelector("#loginMesageSuccess").innerHTML =
        "Verified Successfully";

      document.querySelector("#loginMesageError").innerHTML = "";

      dispatch(login_user(data));

    } catch (error) {
      console.error("OTP verification error:", error);

      document.querySelector("#loginMesageSuccess").innerHTML = "";

      document.querySelector("#loginMesageError").innerHTML =
        "Invalid OTP";
    }
  }

  //
  const handleChangeMobile = (e) => {
    let val = e.target.value;
    setCheck({ ...check, [e.target.name]: val });
  };
  // console.log(isAuth)

  useEffect(() => {
    dispatch(fetch_users);
    if (isAuth) {
      window.location = "/";
    }
  }, [isAuth]);

  return (
    <>
      <div className="mainLogin">
        <div id="recaptcha-container"></div>
        <div className="loginBx">
        <div className="logoImgdiv"><img className="imglogo" src="https://i.postimg.cc/QxksRNkQ/expedio-Logo.jpg':'https://i.postimg.cc/fRx4D7QH/logo3.png" alt="" /></div>
           
          <div className="loginHead">
          <hr /><hr /><hr />
            <h1>SignIn</h1>
          </div>
          <div className="loginInputB">
            <label htmlFor="">Enter Your Number</label>
            <span>
              <input
                type="number"
                readOnly={verify}
                name="number"
                value={number}
                onChange={(e) => handleChangeMobile(e)}
                placeholder="Number"
              />
              <button
                disabled={verify}
                onClick={handleVerifyNumber}
                id="nextText"
              >
                SignIn
              </button>
            </span>
          </div>
          {verify ? (
            <div className="loginInputB">
              <label htmlFor="">Enter Your OTP</label>
              <span>
                <input
                  type="number"
                  name="otp"
                  value={otp}
                  onChange={(e) => handleChangeMobile(e)}
                />
                <button onClick={verifyCode}>Continue</button>
              </span>
            </div>
          ) : (
            ""
          )}

          <div className="loginTerms">
            {/* <h2>Or USE ARE BUSSINESS ACCOUNT WITH</h2>
                    <p>By proceeding, you agree to MakeMyTrip'sT&Csand Privacy</p> */}
            <Link to="/register">Don't have an Account</Link>
            <Link to="/admin">Admin Login</Link>
            <div className="inpChecbx"><input className="inp" type="checkbox" /> <h2>Keep me signed in</h2></div>
            <p>Selecting this checkbox will keep you signed into your account on this device until you sign out. Do not select this on shared devices.</p>
            <h6>By signing in, I agree to the Expedia <span> Terms and Conditions</span>, <span>Privacy Statement</span> and <span>Expedia Rewards Terms and Conditions</span>.</h6>
          </div>
          <h3 id="loginMesageError"></h3>
          <h3 id="loginMesageSuccess"></h3>
        </div>
      </div>
    </>
  );
};
