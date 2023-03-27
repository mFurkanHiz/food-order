import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBurgerAction, getAllBurgers } from "../actions/burgerActions";

function MenusList() {
  const burgerState = useSelector((state) => state.getAllBurgersReducer);
  const { burgers } = burgerState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBurgers());
  }, [burgers]);

  return (
    <div>
      <h3 className="text-dark my-3">Menü Listesi</h3>
      <table className="table table-hovered table-dark table-striped w-75 mx-auto text-start">
        <thead>
          <tr>
            <th>Menü Adı</th>
            <th>Menü Fiyatı</th>
            <th>Menü Kategorisi</th>
            <th>Operasyonlar</th>
          </tr>
        </thead>
        <tbody>
          {burgers.map((burger) => (
            <tr>
              <td>{burger.ad}</td>
              <td>
                Small: {burger.fiyat[0]["small"]}₺ <br />
                Medium: {burger.fiyat[0]["medium"]}₺ <br />
                Large: {burger.fiyat[0]["mega"]}₺ <br />
              </td>
              <td>{burger.kategori}</td>
              <td>
                <i
                  className="fa-solid fa-trash text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(deleteBurgerAction(burger._id))}
                />
                <Link to={`/admin/editmenu/${burger._id}`}>
                  <i className="fa-solid fa-pen-to-square text-info mx-2" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenusList;
