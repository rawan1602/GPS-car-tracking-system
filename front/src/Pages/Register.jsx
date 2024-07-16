import { useNavigate } from "react-router-dom";

import "../App.css";
import "../Styles/Home.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SignUp } from "../store/auth/services/authService";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const labelStyle = {
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "1px",
    textAlign: "left",
  };

  const inputStyle = {
    fontFamily: "Montserrat",
    fontSize: "14px",
    backgroundColor: "#1F1E22",
    width: "364px",
    height: "56px",
    margin: "5px 0",
  };

  const newAccountStyle = {
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "19.5px",
    letterSpacing: "2px",
    textAlign: "center",
    color: "white",
  };

  const signUpHandlerFunction = (data) => {
    // console.log(data);
    dispatch(SignUp(data))
      .unwrap()
      .then((result) => {
        console.log(result);
        navigate("/");
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <div className="content">
      <div style={{ backgroundColor: "#111111" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "44px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#1F1E22",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/eyes.svg" alt="Logo" width="60rem" />
          </div>
        </div>
        <div
          style={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "28px",
            letterSpacing: "1px",
            color: "white",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          <div>CREATE</div>
          <div>YOUR ACCOUNT</div>
        </div>

        <div
          className="align-items-center d-flex flex-column"
          style={{ marginTop: "42px" }}
        >
          <form onSubmit={handleSubmit(signUpHandlerFunction)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={labelStyle}>First Name</label>
              <input
                autoFocus
                className="border border-dark p-2 rounded"
                style={inputStyle}
                {...register("fname", {
                  required: true,
                })}
              />

              {errors.fname && errors.fname.type === "required" && (
                <span style={{ color: "red" }}>First Name is required</span>
              )}

              <label style={labelStyle}>Last Name</label>
              <input
                autoFocus
                className="border border-dark p-2 rounded"
                style={inputStyle}
                {...register("lname", {
                  required: true,
                })}
              />

              {errors.lname && errors.lname.type === "required" && (
                <span style={{ color: "red" }}>Last name is required</span>
              )}

              <label style={labelStyle}>Phone Number</label>
              <input
                type="number"
                autoFocus
                className="border border-dark p-2 rounded"
                style={inputStyle}
                {...register("phone", {
                  required: true,
                })}
              />
              {errors.phone && errors.phone.type === "required" && (
                <span style={{ color: "red" }}>Phone Number is required</span>
              )}
              <div style={{ marginTop: "16px" }} />
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                autoFocus
                className="border border-dark p-2 rounded"
                style={inputStyle}
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <span style={{ color: "red" }}>Email is required</span>
              )}
              <div style={{ marginTop: "16px" }} />
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                className="border border-dark p-2 rounded"
                style={inputStyle}
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && errors.password.type === "required" && (
                <span style={{ color: "red" }}>Password is required</span>
              )}
            </div>
            <button
              className="btn-add-device rounded"
              style={{
                backgroundColor: "#00ABCB",
                color: "white",
                width: "364px",
                marginTop: "30px",
              }}
              type="submit"
            >
              SIGN UP
            </button>
          </form>

          <div style={{ marginTop: "20px" }} />

          <a
            href="/"
            style={{
              ...newAccountStyle,
              marginTop: "30px",
              textDecoration: "none",
              marginBottom: "20px",
            }}
          >
            ALREADY HAVE AN ACCOUNT
          </a>
        </div>
      </div>
    </div>
  );
}
