import { useEffect, useRef, useState } from "react";
import Button from "../Elements/Button";
import CardProduct from "../Fragments/CardProduct";
import Counter from "../Fragments/Counter";
import { getProducts } from "../../services/product.service";
import { getUsername } from "../../services/auth.service";
import { useLogin } from "../../hooks/useLogin";

const ProductPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const username = useLogin();
  useEffect(
    () => {
      // ambil data dari local storage
      setCart(JSON.parse(localStorage.getItem("cart")) || []);
    },
    [] // array tersebut berfungsi untuk update data ketika ada perubahan pada data yang diawasi
  );

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

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
    localStorage.removeItem("token");
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
        {username}
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
            {products.length > 0 &&
              products.map((product) => (
                <CardProduct key={product.id}>
                  <CardProduct.Header
                    image={product.image}
                    id={product.id}></CardProduct.Header>
                  <CardProduct.Body
                    name={product.title}
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
                {products.length > 0 &&
                  cart.map((item) => {
                    const product = products.find(
                      (product) => product.id === item.id
                    );
                    return (
                      <tr key={item.id}>
                        <td>{product.title}</td>
                        <td>
                          {"$ " +
                            product.price.toLocaleString("id-ID", {
                              styles: "currency",
                              currency: "USD",
                            })}
                        </td>
                        <td>{item.qty}</td>
                        <td>
                          {"$ " +
                            (item.qty * product.price).toLocaleString("id-ID", {
                              styles: "currency",
                              currency: "USD",
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
                        {"$ " +
                          totalPrice.toLocaleString("id-ID", {
                            styles: "currency",
                            currency: "USD",
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
