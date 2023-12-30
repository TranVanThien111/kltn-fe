import React, { useEffect, useState } from "react";
import "./Product.css";
import ProductCart from "../../components/ProductCart";
import { FaFilter } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { getProductsByCategory } from "../../services/product";

import { useNavigate } from "react-router-dom";

const Product = () => {
  const [productByCategoryDongHo, setProductByCategoryDongHo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleProductsByCategoryDongHo = async () => {
    setIsLoading(true);
    const responseData = await getProductsByCategory(1);
    setProductByCategoryDongHo(responseData.listProducts);
    setIsLoading(false);
  };

  const handleSortPriceAscending = () => {
    const sortedProducts = [...productByCategoryDongHo].sort(
      (a, b) => a.priceSales - b.priceSales
    );
    setProductByCategoryDongHo(sortedProducts);
  };

  const handleSortPiceDescending = () => {
    const sortedProducts = [...productByCategoryDongHo].sort(
      (a, b) => b.priceSales - a.priceSales
    );
    setProductByCategoryDongHo(sortedProducts);
  };

  useEffect(() => {
    handleProductsByCategoryDongHo();
  }, []);

  const changePageHandler = async (e, id) => {
    navigate(`/productdetail?productId=${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="container-fuild px-2 pt-3 border-product">
        <div className="breadcrumb-list  ">
          <ol
            className="breadcrumb breadcrumb-arrows align-items-center"
            itemscope=""
            itemtype="http://schema.org/BreadcrumbList"
          >
            <li
              itemprop="itemListElement"
              itemscope=""
              itemtype="http://schema.org/ListItem"
            >
              <a
                className="text-decoration-none item text-body mx-4"
                href="/"
                target="_self"
                itemprop="item"
              >
                <span className="text-secondary" itemprop="name">
                  Trang chủ
                </span>
              </a>
              <meta itemprop="position" content="1" />
            </li>

            <li
              itemprop="itemListElement"
              itemscope=""
              itemtype="http://schema.org/ListItem"
            >
              <a
                className="text-decoration-none item text-body"
                href="https://the-swan.myharavan.com/collections/trang-suc"
                target="_self"
                itemprop="item"
              >
                <span className="text-secondary" itemprop="name">
                  /&ensp;&ensp;&ensp; Đồng hồ
                </span>
              </a>
              <meta itemprop="position" content="2" />
            </li>
          </ol>
        </div>
      </div>
      <div className="container-fuild">
        <div className="row d-flex flex-wrap">
          <div className="col">
            <img
              style={{ height: "100%", width: "100%" }}
              src="//theme.hstatic.net/200000593853/1001115480/14/collection_banner.jpg?v=43"
              alt="Products"
            />
          </div>
          <div className="col d-flex justify-content-start ">
            <h1 className="d-flex align-items-center">Tất cả sản phẩm</h1>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between my-5 search-feature">
        <div className="mx-5">
          Bộ lọc <FaFilter />
        </div>
        <div className="mx-5">
          <Dropdown>
            <Dropdown.Toggle
              className="dropdown"
              variant="light"
              id="dropdown-basic"
            >
              Sắp xếp
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => handleSortPriceAscending()}>
                Giá: Tăng dần
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => handleSortPiceDescending()}>
                Giá: Giảm dần
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div classname="container-fuild">
        <h3 className="text-center my-5">
          <a>Đồng hồ</a>
        </h3>
        <div className="row mx-5 ">
          {productByCategoryDongHo.map((aProducts, idx) => (
            <div
              key={idx}
              className="col-3 product-card"
              onClick={(e) => changePageHandler(e, aProducts.id)}
            >
              <ProductCart
                title={aProducts.title}
                imageSrc={aProducts.listMediaProduct[0].url}
                imageSrc1={aProducts.listMediaProduct[1].url}
                price={numberWithCommas(aProducts.priceSales)}
                priceSale={numberWithCommas(aProducts.price)}
                percentDiscount={aProducts.percentDiscount}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
