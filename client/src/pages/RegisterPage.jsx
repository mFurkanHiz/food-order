import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { registerUserAction } from "../actions/userActions";

function RegisterPage() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const dispatch = useDispatch();

  const userState = useSelector((state) => state.registerUserReducer);
  const { success, loading, users, error } = userState;

  const kaydolHandler = () => {
    if (name == "" || mail == "" || pass == "" || confirmPass == "") {
      Swal.fire("Eksik alanları doldurunuz.!");
    } else if (pass !== confirmPass) {
      Swal.fire("Şifreler uyuşmamaktadır!");
    } else {
      const user = {
        name: name,
        mail: mail,
        password: pass,
      };
      console.log(user);
      dispatch(registerUserAction(user));
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div
        className="container w-50 bg-warning rounded shadow-lg "
        style={{ height: "420px" }}
      >
        <h2 className="display-4">Kullanıcı Kaydı Ekleme</h2>
        <input
          type="text"
          className="form-control my-3"
          placeholder="İsminizi Giriniz"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="form-control my-3"
          placeholder="Emailinizi Giriniz"
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          type="password"
          className="form-control my-3"
          placeholder="Şifrenizi Giriniz"
          onChange={(e) => setPass(e.target.value)}
        />
        <input
          type="password"
          className="form-control my-3"
          placeholder="Şifrenizi Tekrar Giriniz"
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <button
          className="btn btn-outline-danger w-50 m-auto"
          onClick={kaydolHandler}
        >
          KAYIT OL
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
