import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MenuList({ menu }) {
  /*Modal için UseStateler*/
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ozellik, setOzellik] = useState("medium");
  const [miktar, setMiktar] = useState(1);

  const adetHandler = (e) => {
    setMiktar(e.target.value);
  };

  console.log(ozellik);

  const dispatch = useDispatch();

  const addToCart = () => {
    if (miktar > 0) {
      toast("Sepete Ürün Eklendi");
      dispatch(addToCartAction(menu, miktar, ozellik));
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <div
        className="card m-auto my-3 shadow-lg p-3 bg-body-tertiary rounded"
        style={{ width: "20rem" }}
      >
        <img
          src={menu.img}
          alt=""
          className="card-img-top img-fluid"
          onClick={handleShow}
        />
        <div className="card-body">
          <h5 className="card-title">{menu.ad}</h5>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h5>Özellik</h5>
            <select
              name=""
              id=""
              className="form-select mb-3"
              onChange={(e) => setOzellik(e.target.value)}
            >
              {menu.ozellik.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <h5>Miktar</h5>
            <select
              name=""
              id=""
              className="form-select mb-3"
              onChange={adetHandler}
            >
              {[...Array(10).keys()].map((x, index) => (
                <option key={index} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-12 mt-3">
          <h6 className="text-danger">
            Fiyat: {menu.fiyat[0][ozellik] * miktar}
          </h6>
        </div>
        <div className="div">
          <button className="btn btn-outline-danger w-100" onClick={addToCart}>
            SEPETE EKLE
          </button>
        </div>
      </div>

      {/* Modal Başlangıcı */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{menu.ad}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={menu.img} style={{ height: "250px" }} />
          <h4>Kategori: {menu.kategori}</h4>
          <p>{menu.desc}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-warning w-100" onClick={handleClose}>
            KAPAT
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MenuList;
