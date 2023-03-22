import Swal from "sweetalert2";

export const addToCartAction =
  (menu, miktar, ozellik) => (dispatch, getState) => {
    var cartItem = {
      ad: menu.ad,
      _id: menu._id,
      img: menu.img,
      ozellik: ozellik,
      miktar: Number(miktar),
      fiyat: menu.fiyat,
      fiyatlar: menu.fiyat[0][ozellik] * miktar,
      kategori: menu.kategori,
      desc: menu.desc,
    };

    if (miktar < 1) {
      Swal.fire({
        title: "Emin misiniz?",
        text: "Ürününüz sepetten kaldırılacaktır!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "crimson",
        cancelButtonColor: "#f49d1a",
        confirmButtonText: "Evet, sil !",
        cancelButtonText: "Vazgeç !",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: "DELETE_FROM_CART", payload: menu });
          Swal.fire("Silme Başarılı!", "Ürün Sepetten Kaldırıldı.", "success");
        }
      });
    }

    if (miktar > 0) {
      dispatch({ type: "ADD_TO_CART", payload: cartItem });

      const cartItems = getState().addToCartReducer.cartItems;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  };

export const deleteFromCartAction = (menu) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: menu });
  const cartItems = getState().addToCartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
