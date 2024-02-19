import { useEffect, useRef, useState } from "react";
import Button from "../Elements/Button";
import CardProduct from "../Fragments/CardProduct";
import Counter from "../Fragments/Counter";

const products = [
  {
    id: 1,
    name: "Sepatu Baru",
    price: 1000000,
    image: "/images/shoes.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cupiditate blanditiis amet doloribus, commodi ",
  },
  {
    id: 2,
    name: "Sepatu Baru 2",
    price: 3000000,
    image: "/images/shoes.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cupiditate ",
  },
  {
    id: 3,
    name: "Sepatu Baru 3",
    price: 50000,
    image: "/images/shoes.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis cupiditate loradkfa asdfhasd faoisd fahs dofahkfds hioisjdo ",
  },
];

const email = localStorage.getItem("email");

const ProductPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(
    () => {
      // ambil data dari local storage
      setCart(JSON.parse(localStorage.getItem("cart")) || []);
    },
    [] // array tersebut berfungsi untuk update data ketika ada perubahan pada data yang diawasi
  );

  useEffect(() => {
    if (cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleAddToCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };

  // useRef
  const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || []);
  const handleAddToCartRef = (id) => {
    cartRef.current = [...cartRef.current, { id, qty: 1 }];
    localStorage.setItem("cart", JSON.stringify(cartRef.current));
  };

  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  return (
    <>
      <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-5">
        {email}
        <Button classname="ml-5 bg-black" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div>
        <h1 className="text-blue-600 font-bold text-3xl text-center">
          Products
        </h1>
        <div className="flex justify-center py-5 ">
          <div className="w-4/6 flex flex-wrap">
            {products.map((product) => (
              <CardProduct key={product.id}>
                <CardProduct.Header image={product.image}></CardProduct.Header>
                <CardProduct.Body
                  name={product.name}
                  children={product.description}></CardProduct.Body>
                <CardProduct.Footer
                  id={product.id}
                  price={product.price}
                  handleAddToCart={handleAddToCart}></CardProduct.Footer>
              </CardProduct>
            ))}
          </div>

          <div className="w-2/6">
            <h1 className="text-3xl font-bold text-blue-600">Cart</h1>
            <table className="text-left table-auto border-separate border-spacing-x-5">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quality</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const product = products.find(
                    (product) => product.id === item.id
                  );
                  return (
                    <tr key={item.id}>
                      <td>{product.name}</td>
                      <td>
                        {"Rp " +
                          product.price.toLocaleString("id-ID", {
                            styles: "currency",
                            currency: "IDR",
                          })}
                      </td>
                      <td>{item.qty}</td>
                      <td>
                        {"Rp " +
                          (item.qty * product.price).toLocaleString("id-ID", {
                            styles: "currency",
                            currency: "IDR",
                          })}
                      </td>
                    </tr>
                  );
                })}

                <tr ref={totalPriceRef}>
                  <td colSpan={3}>
                    <b>
                      <strong>Total Price</strong>
                    </b>
                  </td>
                  <td>
                    <b>
                      <strong>
                        {"Rp " +
                          totalPrice.toLocaleString("id-ID", {
                            styles: "currency",
                            currency: "IDR",
                          })}
                      </strong>
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex w-100 justify-center">
          <Counter></Counter>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
