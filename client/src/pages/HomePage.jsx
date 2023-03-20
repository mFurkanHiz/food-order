import React from "react";
import MenuList from "../components/MenuList";
import menuler from "../yemekdata";

function HomePage() {
  return (
    <div>
      <div className="row">
        {menuler.map((menuItem) => (
          <div className="col-md-4">
            <MenuList menu={menuItem} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
