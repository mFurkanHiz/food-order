import React, { useEffect, useState } from "react";
import MenuList from "../components/MenuList";
import menuler from "../yemekdata";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllBurgers } from "../actions/burgerActions";
import Spinner from "../components/Spinner";

function HomePage() {
  const [foods, setFoods] = useState([]);

  const burgerState = useSelector((state) => state.getAllBurgersReducer);

  const { burgers, loading } = burgerState;

  const dispatch = useDispatch();

  useEffect(() => {
    // axios
    //   .get("http://localhost:4000/getFoods")
    //   .then((res) => setFoods(res.data))
    //   .then((err) => console.log(err));

    dispatch(getAllBurgers());
  }, []);

  return (
    <div>
      <div className="row">
        {loading ? (
          <Spinner />
        ) : (
          burgers.map((menu, index) => (
            <div key={index} className="col-md-4">
              <MenuList menu={menu} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
