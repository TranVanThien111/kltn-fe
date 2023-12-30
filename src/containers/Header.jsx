import './Header.css'

import React, { useEffect } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { CiUser } from 'react-icons/ci'
import { FaBell } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { listCategory, searchProductName } from '../services/product.js'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItem } from '../services/CartService.js'
// import { logout } from "../services/UserService.js";
import { logoutAsync } from '../store/reducers/auth.js'

const Header = () => {
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [target, setTarget] = useState(null)
  const [target1, setTarget1] = useState(null)
  const [mount, setMount] = useState(false)

  const [searchProduct, setSearchProduct] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSearchProductName = async (e) => {
    try {
      setIsLoading(true)
      const responseData = await searchProductName(searchValue)
      if (responseData) {
        console.log('Thien', responseData.data.listProduct)
        setSearchProduct(responseData.data.listProduct)
      } else {
        setSearchProduct([])
      }
      setIsLoading(false)
    } catch (err) {
      console.error('Error in handleUpdateProduct: ', err)
      setIsLoading(false)
    }
  }

  const changePageHandler = async (e, id) => {
    navigate(`productdetail?productId=${id}`)
    window.scrollTo(0, 0)
  }

  const ref = useRef(null)
  const ref1 = useRef(null)

  const handleClick = (event) => {
    setShow(!show)
    setTarget(event.target)
  }

  const handleClick1 = (event) => {
    setShow1(!show1)
    setTarget1(event.target)
  }

  const handleClose = () => setMount(false)
  const handleShow = () => setMount(true)

  const [category, setCategory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = React.useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [carts, setCarts] = useState([])
  const isLogedIn = useSelector((state) => state.auth.isLoggedIn)
  const userInfor = useSelector((state) => state.auth.userInfo)

  useEffect(() => {
    handleCartItem()
  }, [])

  //Get cart item
  const handleCartItem = async () => {
    setIsLoading(true)
    const responseData = await getCartItem(userInfor.user_id)
    setCarts(responseData)
    setIsLoading(false)
  }

  useEffect(() => {
    getListCategory()
    // handleToLogout();
  }, [])
  const getListCategory = async () => {
    const responseData = await listCategory()
    setCategory(responseData)
  }
  console.log('111', category)

  const handleToLogout = () => {
    dispatch(logoutAsync())
  }

  function convertToSlug(text) {
    return text
      .toLowerCase()
      .replace(/\s+/g, '') // Xóa khoảng trắng
      .normalize('NFD') // Chuyển dấu tiếng Việt thành chữ gốc và dấu phụ
      .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu tiếng Việt
  }
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return (
    <>
      <div
        className=" container-fluid bg-secondary text-white top-header pt-2"
        style={{
          fontFamily: ' Tinos, sans-serif',
        }}
      >
        <div className="d-inline header-item ">
          Hotline:<strong> 1900.636.000</strong> (8h - 12h, 13h30 - 17h)
        </div>
        <div className="d-inline " style={{ cursor: 'pointer' }}>
          Liên hệ
        </div>
        <div className="d-inline float-end header-item2">
          <FaBell style={{ color: 'white' }} /> Thông báo của tôi
        </div>
      </div>
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-1">
            <img
              className="logo cursor "
              src="https://theme.hstatic.net/200000593853/1001115480/14/logo.png?v=43"
              alt=""
            />
          </div>
          <div className="col-7 align-self-center content">
            <ul id="main-menu" className="list-unstyled list-inline py-3 item">
              <li className="list-inline-item icon-hover">
                <Link
                  className="text-decoration-none text-body parent-menu"
                  to="/"
                >
                  Trang chủ
                </Link>{' '}
              </li>
              <li className="list-inline-item mx-3 product-hover">
                Sản phẩm
                <div className="category-container ">
                  <div className="category row d-flex flex-wrap ">
                    {category.map((categoryItem, idx) => (
                      <div key={idx} className="col-lg-4 ">
                        <ul className="subchildmenu-item list-unstyled">
                          <li className="category-item">
                            <Link
                              className="text-decoration-none category-item"
                              to={`/product/${convertToSlug(
                                categoryItem.title
                              )}`}
                            >
                              {categoryItem.title}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>

              <li className="cursor list-inline-item mx-3">
                <Link
                  className="text-decoration-none text-body"
                  to="/introduce"
                >
                  Giới thiệu
                </Link>{' '}
              </li>
              <li className="cursor list-inline-item mx-3">
                {' '}
                <Link className="text-decoration-none text-body" to="/news">
                  Tin tức
                </Link>{' '}
              </li>
              <li className="cursor list-inline-item mx-3">
                {' '}
                <Link className="text-decoration-none text-body" to="/content">
                  Trang nội dung
                </Link>{' '}
              </li>
              <li className="cursor list-inline-item mx-3">
                {' '}
                <Link
                  className="text-decoration-none text-body"
                  to="/landingpage"
                >
                  LandingPage
                </Link>{' '}
              </li>
              <li className="cursor list-inline-item mx-3">Live stream</li>
            </ul>
          </div>
          <div className="col-auto py-3">
            <div className="row">
              <div className="col-6">
                <FiMapPin className="icon" />
                <span className="txtText">Giao hàng hoặc lấy tại</span> <br />
                <span className="txtAddress"> 182 Lê Đại Hành,... </span>
              </div>
              <div className="col-6 d-flex">
                {isLogedIn ? (
                  <div>
                    <div ref={ref1}>
                      <Button
                        className="bg-white border border-white"
                        onClick={handleClick1}
                      >
                        <CiUser
                          style={{
                            color: 'black',
                            width: '40px',
                            height: '40px',
                          }}
                        />
                      </Button>
                      <Overlay
                        show={show1}
                        target={target1}
                        placement="bottom"
                        container={ref1}
                        containerPadding={20}
                      >
                        <Popover id="popover-contained">
                          <Popover.Body>
                            <div className="my-2">
                              <div className="my-2 account-container">
                                <button
                                  style={{
                                    padding: '0 20px',
                                    backgroundColor: '#216fdb',
                                    border: 'none',
                                    borderRadius: '6px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                  }}
                                  className="text-white mb-2"
                                >
                                  <Link
                                    to="user/profile"
                                    style={{
                                      textDecoration: 'none',
                                      color: 'inherit',
                                    }}
                                  >
                                    Trang cá nhân
                                  </Link>
                                </button>

                                <button
                                  style={{
                                    padding: '0 20px',
                                    backgroundColor: '#216fdb',
                                    border: 'none',
                                    borderRadius: '6px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                  }}
                                  className="text-white mb-2"
                                >
                                  <Link
                                    style={{
                                      textDecoration: 'none',
                                      color: 'inherit',
                                    }}
                                    to="/user/purchase"
                                  >
                                    Đơn mua
                                  </Link>
                                </button>
                                <button
                                  style={{
                                    padding: '0 20px',
                                    backgroundColor: '#216fdb',
                                    border: 'none',
                                    borderRadius: '6px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                  }}
                                  className="text-white mb-2"
                                >
                                  <Link
                                    style={{
                                      textDecoration: 'none',
                                      color: 'inherit',
                                    }}
                                    to="/login/changepassword"
                                  >
                                    ChangePassword
                                  </Link>
                                </button>

                                <button
                                  style={{
                                    padding: '0 20px',
                                    backgroundColor: '#216fdb',
                                    border: 'none',
                                    borderRadius: '6px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                  }}
                                  className="text-white"
                                  onClick={() => handleToLogout()}
                                >
                                  Đăng xuất
                                </button>
                              </div>
                            </div>
                          </Popover.Body>
                        </Popover>
                      </Overlay>
                    </div>
                  </div>
                ) : (
                  <Link to={'/login'}>
                    <button
                      style={{
                        width: '120px',
                        height: '50px',
                        backgroundColor: '#3498db', // Màu nền
                        color: '#fff', // Màu chữ
                        border: 'none', // Không có đường viền
                        borderRadius: '5px', // Góc bo tròn
                        fontSize: '16px', // Kích thước chữ
                        cursor: 'pointer', // Con trỏ hiển thị là nút bấm
                        outline: 'none', // Loại bỏ đường viền khi được click
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = '#2980b9')
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = '#3498db')
                      }
                    >
                      Đăng nhập
                    </button>
                  </Link>
                )}
                <div>
                  <div ref={ref}>
                    <Button
                      className="bg-white border border-white search-logo"
                      onClick={handleClick}
                    >
                      <BiSearch
                        style={{
                          color: 'black',
                          width: '35px',
                          height: '35px',
                        }}
                      />
                    </Button>
                    <Overlay
                      show={show}
                      target={target}
                      placement="bottom"
                      container={ref}
                      containerPadding={20}
                      style={{
                        maxWidth: '500px', // Điều chỉnh giá trị maxWidth theo ý muốn của bạn
                        width: '100%', // Đảm bảo chiều rộng là 100%
                      }}
                    >
                      <Popover
                        id="popover-contained"
                        className="searchContainer"
                      >
                        <Popover.Header className="text-center" as="h3">
                          TÌM KIẾM
                        </Popover.Header>
                        <Popover.Body>
                          <div className="box">
                            <div className="container-1 mt-2 ">
                              <input
                                style={{
                                  width: '250px',
                                  height: '40px',
                                  borderRadius: '5px',
                                  paddingLeft: '5px',
                                  fontSize: '14px',
                                  marginBottom: '10px',
                                }}
                                placeHolder="Nhập sản phẩm của bạn"
                                value={searchValue}
                                onChange={handleSearchChange}
                              />
                              <span
                                onClick={(e) => handleSearchProductName(e)}
                                className="input-group-text bg-white"
                                style={{
                                  position: 'absolute',
                                  border: 'none',
                                  left: '220px',
                                  top: '67px',
                                }}
                                id="basic-addon1"
                              >
                                <i class="fa-solid fa-magnifying-glass"></i>
                              </span>
                            </div>
                          </div>
                          {searchProduct.length === 0 ? (
                            <p></p>
                          ) : (
                            <div>
                              {searchProduct.map((result, index) => (
                                <div
                                  className="d-flex mt-1"
                                  style={{
                                    borderBottom:
                                      index < searchProduct.length - 1
                                        ? '1px solid #ccc'
                                        : 'none',
                                  }}
                                >
                                  <div>
                                    <a
                                      style={{
                                        fontSize: '14px',
                                        fontFamily: 'Tinos,sans-serif',
                                      }}
                                      className="text-decoration-none text-body"
                                      href="/products/rodney-silver-brown"
                                    >
                                      {result.productTitle}
                                    </a>
                                    <p
                                      className="text-secondary"
                                      style={{
                                        fontSize: '14px',
                                        fontFamily: 'Tinos,sans-serif',
                                      }}
                                    >
                                      {numberWithCommas(result.price)}
                                      <del
                                        className="mx-2"
                                        style={{
                                          fontSize: '12px',
                                          fontFamily: 'Tinos,sans-serif',
                                        }}
                                      >
                                        {numberWithCommas(result.price_sale)}
                                      </del>
                                    </p>
                                  </div>
                                  <div
                                    class=""
                                    style={{ marginLeft: 'auto' }}
                                    onClick={(e) =>
                                      changePageHandler(e, result.id)
                                    }
                                  >
                                    <a title="Rodney - Silver Brown">
                                      <img
                                        style={{
                                          width: '40px',
                                          height: '40px',
                                        }}
                                        alt="Rodney - Silver Brown"
                                        src={result.imageUrl}
                                      />
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </Popover.Body>
                      </Popover>
                    </Overlay>
                  </div>
                </div>

                {isLogedIn && (
                  <div>
                    <Link to="/cart">
                      <Button
                        className="bg-white border border-white"
                        variant="primary"
                        onClick={handleShow}
                      >
                        <div
                          style={{
                            position: 'relative',
                            display: 'inline-block',
                          }}
                        >
                          <AiOutlineShoppingCart
                            style={{
                              color: 'black',
                              width: '35px',
                              height: '35px',
                              transition: 'color 0.3s ease',
                            }}
                          />
                          {carts.length > 0 && (
                            <div
                              className="quantity-cart"
                              style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-5px',
                                width: '22px',
                                height: '22px',
                                background: 'red',
                                color: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              {carts.length}
                            </div>
                          )}
                        </div>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
