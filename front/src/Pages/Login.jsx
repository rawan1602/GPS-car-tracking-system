import { useNavigate } from "react-router-dom";

import "../App.css";
import "../Styles/Home.css";
import "../data/Status";
import { STATUS } from "../data/Status";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoginService } from "../store/auth/services/authService";
export default function Login() {
  const { error } = useSelector((state) => state.authSlice);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const loginHandlerFunction = (data) => {
    STATUS.isLogged = true;
    dispatch(LoginService(data))
      .unwrap()
      .then((result) => {
        console.log(result);
        navigate("/home");
      });
  };

  return (
    <div className="content" style={{ backgroundColor: "#111111" }}>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "44px" }}
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
        <div>WELCOME</div>
        <div>BACK</div>
      </div>

      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}

      <form onSubmit={handleSubmit(loginHandlerFunction)}>
        <div
          className="align-items-center d-flex flex-column"
          style={{ marginTop: "52px" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>EMAIL</label>
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
            <label style={labelStyle}>PASSWORD</label>
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
            LOGIN
          </button>
          <a
            href="/register"
            style={{
              ...newAccountStyle,
              marginTop: "30px",
              textDecoration: "none",
            }}
          >
            CREATE NEW ACCOUNT
          </a>
        </div>
      </form>
    </div>
  );
}
