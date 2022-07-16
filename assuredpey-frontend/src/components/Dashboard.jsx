import React, { useEffect, useState } from "react";
import Card from "./Card";
// import productList from "../productList";
import axios from "axios";

const Dashboard = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products").then(res => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);


  return (
    <div className="flex m-10 flex-wrap">
      {products.map((pId) => (
        <Card
          key={pId.id}
          id={pId.id}
          name={pId.name}
          company={pId.company}
          image={pId.image}
          mrp={pId.mrp}
          quantity={0}
        />
      ))}
    </div>
  );
};

export default Dashboard;
