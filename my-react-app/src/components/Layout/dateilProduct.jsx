import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailProduct } from "../../services/product.service";

const DetailProductPage = () => {
  //UseParams adalah hooks yang digunakan untuk mengambil parameter yang ada pada url
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getDetailProduct(id, (data) => {
      setProduct(data);
    });
  }, [id]);
  console.log(product);
  return (
    <div className="w-100 min-h-screen flex justify-center items-center"></div>
  );
};

export default DetailProductPage;
