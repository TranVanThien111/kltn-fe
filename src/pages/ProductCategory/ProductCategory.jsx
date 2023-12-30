import React, { useEffect } from "react";

import "./ProductCategory.css";
import Carousel from "react-bootstrap/Carousel";
import ProductCart from "../../components/ProductCart";
import GuideCart from "../../components/GuideCart";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getProductDetail,
  getProductList,
  getProductsByCategory,
} from "../../services/product";
import { useSelector } from "react-redux";

const ProductCategory = () => {
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productByCategoryNhan, setProductByCategoryNhan] = useState([]);
  const [productByCategoryDongHo, setProductByCategoryDongHo] = useState([]);

  const handleProductsByCategoryNhan = async () => {
    setIsLoading(true);
    const responseData = await getProductsByCategory(2);
    setProductByCategoryNhan(responseData.listProducts);
    setIsLoading(false);
  };
  const handleProductsByCategoryDongHo = async () => {
    setIsLoading(true);
    const responseData = await getProductsByCategory(1);
    setProductByCategoryDongHo(responseData.listProducts);
    setIsLoading(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    handleProductsByCategoryDongHo();
  }, []);

  useEffect(() => {
    handleProductsByCategoryNhan();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const responseData = await getProductList();
    setIsLoading(false);
    setProducts(responseData.listProducts);
  };

  const changePageHandler = async (e, id) => {
    navigate(`productdetail?productId=${id}`);
    window.scrollTo(0, 0);
  };

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  console.log("có dang nhập", isLogin);

  return (
    <>
      <div>
        <Carousel className="bg-danger">
          <Carousel.Item>
            <img
              src="https://theme.hstatic.net/200000593853/1001115480/14/slide_3_img.jpg?v=41"
              className="d-block w-100"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://theme.hstatic.net/200000593853/1001115480/14/slide_2_img.jpg?v=41"
              className="d-block w-100"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="https://theme.hstatic.net/200000593853/1001115480/14/slide_1_img.jpg?v=41"
              className="d-block w-100"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="text-center scroll-down-section my-4">
        <button aria-label="scroll down">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            x="0"
            y="0"
            viewBox="0 0 128 128"
          >
            <g>
              <path d="m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z"></path>
            </g>
          </svg>
        </button>
      </div>
      <div className="container-fuild text-center">
        <div className="row mx-5">
          <div className="col ">
            <img
              src="https://theme.hstatic.net/200000593853/1001115480/14/img_home_banner_desktop_1.jpg?v=41"
              className="d-block w-100"
              alt="First slide"
            />
          </div>
          <div className="col">
            <img
              src="https://theme.hstatic.net/200000593853/1001115480/14/img_home_banner_desktop_2.jpg?v=41"
              className="d-block w-100"
              alt="First slide"
            />
          </div>
        </div>
        <div className="row m-5 ">
          <div className="col ">
            <h4>
              <a
                className="title"
                href="https://the-swan.myharavan.com/collections/dong-ho"
              >
                Đồng hồ
              </a>
            </h4>
            <p className="text">
              Cùng với sự phát triển không ngừng của thời trang thế giới, rất
              nhiều thương hiệu cho ra đời những mẫu đồng hồ nam chính hãng đa
              dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…
            </p>
            <div className="action-home-banner">
              <a
                className="btn-home-banner"
                href="https://the-swan.myharavan.com/collections/dong-ho"
                aria-label="Mua ngay"
              >
                Mua ngay
              </a>
            </div>
          </div>
          <div className="col">
            <h4>
              <a
                className="title"
                href="https://the-swan.myharavan.com/collections/trang-suc"
                aria-label="Trang sức"
              >
                Trang sức
              </a>
            </h4>
            <p className="text">
              Ngày nay, thế giới trang sức nam, nữ chính hãng rất đẹp, đa dạng
              với nhiều kiểu dáng, chất liệu khác nhau (vàng, bạc, đính đá), từ
              vòng tay, hoa tai, dây chuyền cho đến cả nhẫn.
            </p>
            <div className="action-home-banner">
              <a
                className="btn-home-banner"
                href="https://the-swan.myharavan.com/collections/dong-ho"
                aria-label="Mua ngay"
              >
                Mua ngay
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="sectionHeading text-center m-5">
        <h3>Danh mục sản phẩm</h3>{" "}
      </div>
      <div className="container-fluid  text-center">
        <div className="row mx-5">
          <div className="col">
            <img
              src="https://theme.hstatic.net/200000593853/1001115480/14/img_item_category_1.jpg?v=41"
              className="d-block w-100"
              alt=""
            />
            <p className="title-category">Đồng hồ nam</p>
          </div>
          <div className="col">
            <img
              src="https://theme.hstatic.net/200000593853/1001115480/14/img_item_category_2.jpg?v=41"
              className="d-block w-100"
              alt=""
            />
            <p className="title-category">Nhẫn</p>
          </div>
          <div className="col">
            <img
              src="https://theme.hstatic.net/200000593853/1001115480/14/img_item_category_3.jpg?v=41"
              className="d-block w-100"
              alt=""
            />
            <p className="title-category">Vòng tay</p>
          </div>
          <div className="col">
            <img
              src="https://theme.hstatic.net/200000593853/1001115480/14/img_item_category_5.jpg?v=41"
              className="d-block w-100"
              alt=""
            />
            <p className="title-category">Hoa tai</p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button role="button" className="owl-dot active" aria-label="1">
          <span></span>
        </button>
      </div>
      {isLoading ? (
        <h1>Đang load dữ liệu</h1>
      ) : (
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
      )}

      <div classname="container-fuild">
        <div className="wraplist-ctas text-center">
          <a
            href="/collections/trang-suc"
            className="btn-collection button btnwhite dark mx-2"
          >
            Xem thêm sản phẩm
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M17.707 9.293l-5-5a.999.999 0 10-1.414 1.414L14.586 9H3a1 1 0 100 2h11.586l-3.293 3.293a.999.999 0 101.414 1.414l5-5a.999.999 0 000-1.414z"></path>
            </svg>
          </a>
        </div>
        <div className="container text-center mt-5">
          <div className="row align-items-center">
            <div className="col">
              <img
                width="100%"
                height="328.65"
                src="https://theme.hstatic.net/200000593853/1001115480/14/img_banner_bottom_desktop_1.jpg?v=41"
                alt=""
              />
            </div>
            <div className="col">
              <div className="info-banner-bottom">
                <div className="title-text-banner">
                  <h4>
                    <a
                      className="text-decoration-none text-dark fs-1"
                      href="/collections/all"
                      aria-label="ĐỒ TRANG SỨC ĐỘC QUYỀN"
                    >
                      ĐỒ TRANG SỨC ĐỘC QUYỀN
                    </a>
                  </h4>
                </div>
                <p className="des-text-banner">
                  Ngày nay, thế giới trang sức nam, nữ chính hãng rất đẹp, đa
                  dạng với nhiều kiểu dáng, chất liệu khác nhau (vàng, bạc, đính
                  đá), từ vòng tay, hoa tai, dây chuyền cho đến cả nhẫn.
                </p>
                <div className="action-banner-bottom">
                  <a
                    className="btn-home-banner"
                    href="/collections/all"
                    aria-label="Đồ trang sức độc quyền"
                  >
                    Xem ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <div className="row align-items-center">
            <div className="col">
              <div className="info-banner-bottom">
                <div className="title-text-banner">
                  <h4>
                    <a
                      className="text-decoration-none text-dark fs-1"
                      href="/collections/all"
                      aria-label="Đồ trang sức độc quyền"
                    >
                      VÒNG TAY, LẮC TAY
                    </a>
                  </h4>
                </div>
                <p className="des-text-banner">
                  Với chất liệu làm từ thép không gỉ 316L, đi kèm với đó là lớp
                  mạ vàng hồng thời thượng bên ngoài (tùy phiên bản), những
                  chiếc vòng tay, lắc tay đến từ thương hiệu Daniel Wellington
                  đã tạo nên cơn sốt không hề nhỏ trên thị trường kể từ thời
                  điểm ra mắt.
                </p>
                <div className="action-banner-bottom">
                  <a
                    className="btn-home-banner"
                    href="/collections/all"
                    aria-label="Đồ trang sức độc quyền"
                  >
                    Xem ngay
                  </a>
                </div>
              </div>
            </div>
            <div className="col">
              <img
                width="100%"
                height="328.65"
                src="https://theme.hstatic.net/200000593853/1001115480/14/img_banner_bottom_desktop_1.jpg?v=41"
                alt=""
              />
            </div>
          </div>
        </div>
        {isLoading ? (
          <h1>Đang load dữ liệu</h1>
        ) : (
          <div classname="container-fuild">
            <h3 className="text-center my-5">
              <a>Trang sức</a>
            </h3>
            <div className="row mx-5">
              {productByCategoryNhan.map((aProducts, idx) => (
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
        )}
        <div className="wraplist-ctas text-center">
          <a
            href="/collections/trang-suc"
            className="btn-collection button btnwhite dark mx-2"
          >
            Xem thêm sản phẩm
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M17.707 9.293l-5-5a.999.999 0 10-1.414 1.414L14.586 9H3a1 1 0 100 2h11.586l-3.293 3.293a.999.999 0 101.414 1.414l5-5a.999.999 0 000-1.414z"></path>
            </svg>
          </a>
        </div>
        <div className="container-fuild">
          <div className="sectionHeading text-center my-5">
            <h3>
              <a className="text-decoration-none text-body" href="/blogs/news">
                Tin tức nổi bật
              </a>
            </h3>
          </div>
          <div className="container-fuild text-center">
            <div className="row mx-5">
              <div className="col">
                <GuideCart
                  article="Hướng dẫn cách tạo mục lục bài viết"
                  shortArticle="Trong bài viết này, tôi sẽ hướng dẫn bạn cách tạo mục lục bài viết siêu đơn giản, không phải..."
                  image="https://file.hstatic.net/200000593853/article/blog-img-2_993d9da631724c61b538ba9210cc0b0e_grande.jpeg"
                />
              </div>
              <div className="col">
                <GuideCart
                  article="Hướng dẫn cách tạo mục lục bài viết"
                  shortArticle="Trong bài viết này, tôi sẽ hướng dẫn bạn cách tạo mục lục bài viết siêu đơn giản, không phải..."
                  image="https://file.hstatic.net/200000593853/article/blog-img-2_993d9da631724c61b538ba9210cc0b0e_grande.jpeg"
                />
              </div>
              <div className="col">
                <GuideCart
                  article="Hướng dẫn cách tạo mục lục bài viết"
                  shortArticle="Trong bài viết này, tôi sẽ hướng dẫn bạn cách tạo mục lục bài viết siêu đơn giản, không phải..."
                  image="https://file.hstatic.net/200000593853/article/blog-img-2_993d9da631724c61b538ba9210cc0b0e_grande.jpeg"
                />
              </div>
            </div>
          </div>
          <section className="section-home-intro bg-secondary pt-5 text-center lh-2 my-5">
            <div className="container">
              <div className="home-intro">
                <div className="home-intro--titles mb-5">
                  <h2>Về The Swan</h2>
                </div>
                <div className="home-intro--content pb-5">
                  <p>
                    Mỗi một người phụ nữ đều mang trong mình nét đẹp riêng &amp;
                    xứng đáng được ngưỡng mộ, được tôn vinh và được tự tin với
                    chính con người mình. Phụ nữ luôn xứng đáng với những điều
                    trọn vẹn nhất cho cuộc sống của mình: Hạnh phúc trọn vẹn, vẻ
                    đẹp trọn vẹn và còn nhiều hơn thế. The Swan hơn cả một
                    thương hiệu trang sức, mà còn là đại diện cho một phong cách
                    sống của những giá trị hoàn mỹ xứng đáng nhất dành cho phụ
                    nữ.
                  </p>
                  <p>"TRANG SỨC The Swan – CHO PHỤ NỮ LUÔN TRỌN VẸN"</p>
                </div>
              </div>
            </div>
          </section>
          <section className="section-home-policy text-center  ">
            <div className="container">
              <div className="row">
                <div className="item-policy col-6 col-lg-3">
                  <div className="wrapper-media">
                    <div className="media-policy mb-3">
                      <a href="/pages/about-us">
                        <img
                          style={{ width: "45px", height: "45px" }}
                          className="ls-is-cached lazyloaded"
                          data-src="//theme.hstatic.net/200000593853/1001115480/14/img_item_policy_1.jpg?v=43"
                          src="//theme.hstatic.net/200000593853/1001115480/14/img_item_policy_1.jpg?v=43"
                          alt="Hỗ trợ 24/7"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="info-policy">
                    <h4 className="mb-3">
                      <a
                        className="text-decoration-none text-body"
                        href="/pages/about-us"
                      >
                        Hỗ trợ 24/7
                      </a>
                    </h4>
                    <p>Hotline hỗ trợ 1900.000.XXX</p>
                  </div>
                </div>
                <div className="item-policy col-6 col-lg-3">
                  <div className="wrapper-media">
                    <div className="media-policy mb-3">
                      <a href="/pages/about-us">
                        <img
                          style={{ width: "45px", height: "45px" }}
                          className=" lazyloaded"
                          data-src="//theme.hstatic.net/200000593853/1001115480/14/img_item_policy_2.jpg?v=43"
                          src="//theme.hstatic.net/200000593853/1001115480/14/img_item_policy_2.jpg?v=43"
                          alt="Giao hàng miễn phí"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="info-policy">
                    <h4 className="mb-3">
                      <a
                        className="text-decoration-none text-body"
                        href="/pages/about-us"
                      >
                        Giao hàng miễn phí
                      </a>
                    </h4>
                    <p>
                      Thời gian giao hàng nhanh chóng, từ 3 - 5 ngày làm việc
                    </p>
                  </div>
                </div>
                <div className="item-policy col-6 col-lg-3">
                  <div className="wrapper-media">
                    <div className="media-policy mb-3">
                      <a href="/pages/about-us">
                        <img
                          style={{ width: "45px", height: "45px" }}
                          className=" lazyloaded"
                          data-src="//theme.hstatic.net/200000593853/1001115480/14/img_item_policy_3.jpg?v=43"
                          src="//theme.hstatic.net/200000593853/1001115480/14/img_item_policy_3.jpg?v=43"
                          alt="Thanh toán đa dạng"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="info-policy">
                    <h4 className="mb-3">
                      <a
                        className="text-decoration-none text-body"
                        href="/pages/about-us"
                      >
                        Thanh toán đa dạng
                      </a>
                    </h4>
                    <p>Chấp nhận thanh toán COD, Momo, Banking</p>
                  </div>
                </div>
                <div className="item-policy col-6 col-lg-3">
                  <div className="wrapper-media">
                    <div className="media-policy mb-3">
                      <a href="/pages/about-us">
                        <img
                          style={{ width: "45px", height: "45px" }}
                          className=" lazyloaded"
                          data-src="//theme.hstatic.net/200000593853/1001115480/14/img_item_policy_4.jpg?v=43"
                          src="//theme.hstatic.net/200000593853/1001115480/14/img_item_policy_4.jpg?v=43"
                          alt="Đổi trả hàng dễ dàng"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="info-policy">
                    <h4 className="mb-3">
                      <a
                        className="text-decoration-none text-body"
                        href="/pages/about-us"
                      >
                        Đổi trả hàng dễ dàng
                      </a>
                    </h4>
                    <p>Thời gian trả hàng lên tới 30 ngày</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
