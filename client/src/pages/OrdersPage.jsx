import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrdersAction } from "../actions/orderActions";

function OrdersPage() {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.getUserOrdersReducer);
  const { orders } = orderState;

  useEffect(() => {
    dispatch(getUsersOrdersAction());
  }, []);

  return (
    <div>
      <h2 className="display-2 text-warning">Siparişlerim</h2>
      <hr className="border border-warning" />
      {orders.map((order) => (
        <div className="row border border-3 border-warning shadow-lg p-3 mb-5 bg-body-tertiary rounded bg-light text-warning">
          <div className="col-md-4">
            {order.orderItems.map((item) => (
              <div className="border border-1 border-warning my-2">
                <p className="text-black">
                  {item.ad} [{item.ozellik}] * {item.miktar} = {item.fiyatlar} ₺
                </p>
                <img
                  src={item.img}
                  className="img-fluid"
                  style={{ height: "100px" }}
                  alt=""
                />
                <h6 className="text-black">Kategori: {item.kategori}</h6>
                <p className="text-black">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="col-md-4 my-auto mx-auto ps-5 text-black text-start">
            <h4 className="text-dark">Adres Bilgileri</h4>
            <p>Sokak: {order.shippingAddress.street}</p>
            <p>Şehir: {order.shippingAddress.city}</p>
            <p>Ülke: {order.shippingAddress.country}</p>
            <p>posta Kodu: {order.shippingAddress.zipCode}</p>
          </div>
          <div className="col-md-4 my-auto mx-auto text-black ">
            <h4 className="text-black text-start">Sipariş Bilgileri</h4>
            <div className="text-start">
              <p>Sipariş Tutarı: {order.orderAmount} ₺ </p>
              <p>Tarih: {order.createdAt.substring(0, 10)} </p>
              <p>İşlem No: {order.transactionId} </p>
              <p>Sipariş No: {order._id} </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;
