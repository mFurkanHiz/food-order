import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addBurgerAction } from "../actions/burgerActions";

function AddMenu() {
  const [ad, setAd] = useState("");
  const [smallPrice, setSmallPrice] = useState("");
  const [mediumPrice, setMediumPrice] = useState("");
  const [megaPrice, setMegaPrice] = useState("");
  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("et");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formHandler = (e) => {
    e.preventDefault();
    console.log("submit yapıldı");
    const menu = {
      ad: ad,
      img: img,
      desc: desc,
      fiyat: {
        small: smallPrice,
        medium: mediumPrice,
        mega: megaPrice,
      },
      kategori: category,
    };

    dispatch(addBurgerAction(menu));
    toast("Yeni Ürün Eklendi");
    navigate("/admin/menulist");
  };

  return (
    <div>
      <h3 className="display-h3 my-3">Menü Ekle</h3>

      <form onSubmit={formHandler} className="w-75 mx-auto">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Menü Adını Giriniz"
          value={ad}
          onChange={(e) => setAd(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Small Boy Fiyatını Giriniz"
          value={smallPrice}
          onChange={(e) => setSmallPrice(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Medium Boy Fiyatını  Giriniz"
          value={mediumPrice}
          onChange={(e) => setMediumPrice(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Mega Boy Fiyatını  Giriniz"
          value={megaPrice}
          onChange={(e) => setMegaPrice(e.target.value)}
        />
        <select
          name=""
          id=""
          className="form-select mb-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Et Menü">Et</option>
          <option value="Tavuk Menü">Tavuk</option>
        </select>
        <textarea
          type="text"
          placeholder="Açıklama Giriniz"
          className="form-control mb-2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="url"
          className="form-control mb-2"
          placeholder="Fotoğraf Linkini Giriniz"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <button type="submit" className="btn btn-warning w-100 mb-5">
          KAYDET
        </button>
      </form>
    </div>
  );
}

export default AddMenu;
