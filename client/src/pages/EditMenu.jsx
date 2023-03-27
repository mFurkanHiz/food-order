import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBurgerById } from "../actions/burgerActions";

function EditMenu() {
  const dispatch = useDispatch();
  const { burgerid } = useParams();

  const getburgersbyidstate = useSelector(
    (state) => state.getBurgerByIdReducer
  );
  const { burger } = getburgersbyidstate;
  console.log("urger state", burger);

  const [ad, setAd] = useState("");
  const [smallPrice, setSmallPrice] = useState("");
  const [mediumPrice, setMediumPrice] = useState("");
  const [megaPrice, setMegaPrice] = useState("");
  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("et");

  const formHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (burger._id == burgerid) {
      setAd(burger.ad);
      setCategory(burger.kategori);
      setDesc(burger.desc);
      setImg(burger.img);
      setSmallPrice(burger.fiyat[0]["small"]);
      setMediumPrice(burger.fiyat[0]["medium"]);
      setMegaPrice(burger.fiyat[0]["mega"]);
    } else {
      dispatch(getBurgerById(burgerid));
    }
  }, []);
  return (
    <div>
      <form className="w-75 m-auto abz" onSubmit={formHandler}>
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

export default EditMenu;
