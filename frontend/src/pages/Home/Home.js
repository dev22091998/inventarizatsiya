import React, { useEffect, useState } from "react";
// import { RiProductHuntLine } from "react-icons/ri";
import { Link, useNavigate, useParams} from "react-router-dom";
import "./Home.scss";
import logo from "../../assets/logo.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";
import ProductTable from "../../components/product/productTable/productTable";
import SingleProduct from "../../components/product/productTable/SingleProduct.js";
import { useDispatch, useSelector } from "react-redux";
// import ProductList from "../../components/product/productList/ProductList";
import { getProducts } from "../../redux/features/product/productSlice";
// import { ToastContainer } from 'react-toastify';


const Home = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // IDni URL'dan olish
  const [viewSingleProduct, setViewSingleProduct] = useState(false); // Holatni boshqarish



   // Sahifa yuklangan zahoti mahsulotlarni olish uchun useEffect'da getProducts'ni chaqirish
   useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]); // Faqat bir marta yuklanadi

  useEffect(() => {
    if (id) {
      setViewSingleProduct(true); // ID bo'lsa, SingleProduct'ni ko'rsatish
    } else {
      setViewSingleProduct(false); // Aks holda ProductTable'ni ko'rsatish
    }
  }, [id]);

  const handleLogoClick = () => {
    setViewSingleProduct(false); // Logoni bosganda ProductTable'ni ko'rsatish
    navigate("/"); // Asosiy sahifaga qaytish
  };

  return (
    <div className="home">
      <nav className="navbar ">
        <div className="navbar-container ">
          <div className="navbar-logo log" onClick={handleLogoClick}>
            <img src={logo} alt="AUTORUBBER" className="logo" /> {/* Logotip */}
          </div>

          <ul className="home-links">
            <ShowOnLogout>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ShowOnLogout>
            <ShowOnLogout>
              <li>
                <button className="--btn --btn-primary">
                  <Link to="/login">Login</Link>
                </button>
              </li>
            </ShowOnLogout>
            <ShowOnLogin>
              <li>
                <button className="--btn --btn-primary">
                  <Link to="/dashboard">Dashboard</Link>
                </button>
              </li>
            </ShowOnLogin>
          </ul>
        </div>


      </nav>
      {/* HERO SECTION */}
      <section className=" hero">
        {/* <div className="hero-text">
          <h2>Inventory {"&"} Stock Management Solution</h2>
          <p>
            Inventory system to control and manage proucts in the warehouse in
            real timeand integrated to make it easier to develop your business.
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Free Trial 1 Month</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num="14K" text="Brand Owners" />
            <NumberText num="23K" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Inventory" />
        </div> */}

        <div className="inventory-info">
          <h2>Autorubber korhonasiga tegishli bo'lgan barcha axborot texnologiyalari vositalarining inventarizatsiya ro'yhatlari.</h2>
        </div>
        {
          viewSingleProduct ? (
            <SingleProduct/>
          ) : (
            <ProductTable products={products} isLoading={isLoading}/>
          )
        }
        {/* <ProductList products={products} isLoading={isLoading} />   */}
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
