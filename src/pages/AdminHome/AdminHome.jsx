import React, { useEffect, useState } from 'react'
import './AdminHome.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import {
  getProductDetail,
  getProductsByCategory,
  searchProductName,
} from '../../services/product'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../store/reducers/auth'
import { toast } from 'react-toastify'

import {
  deleteProductOfSellerById,
  getDescriptionBySeller,
  getPaging,
  getProductOfSellerById,
  postDescriptionBySeller,
  postFileImage,
  postProductOfSeller,
  updateProductOfSeller,
} from '../../services/productSeller'

import { logoutAsync } from '../../store/reducers/auth.js'

import { Accordion, Pagination } from 'react-bootstrap'
import { FaHome, FaRegBell, FaRegUserCircle } from 'react-icons/fa'

const AdminHome = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState([])
  const [products, setProducts] = useState([])
  const [searchProduct, setSearchProduct] = useState([])
  const [saveProducts, setSaveProducts] = useState([])
  const [productId, setProductId] = useState(0)
  const [show, setShow] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [page, setPage] = useState(1)
  const [pageLength, setPageLength] = useState(10)
  const [pagingItems, setPagingItems] = useState(false)
  const [description, setDescription] = useState('')
  const [activeKey, setActiveKey] = useState('0')
  const [descriptionById, setDescriptionById] = useState('')
  const [isAddProduct, setIsAddProduct] = useState(false)

  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  console.log(searchValue)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleGetListProduct = async () => {
    setIsLoading(true)
    const responseData = await getPaging(page, pageLength)
    setProducts(responseData.data.listProduct)
    let items = [
      <Pagination.Item key="first" onClick={() => setPage(1)}>
        &laquo;
      </Pagination.Item>,
    ]
    for (let i = 1; i < responseData.data.totalPages + 1; i++) {
      items.push(
        <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>
      )
    }
    items.push(
      <Pagination.Item
        key="last"
        onClick={() => setPage(responseData.data.totalPages)}
      >
        &raquo;
      </Pagination.Item>
    )
    setPagingItems(items)
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetListProduct()
  }, [page, pageLength])

  const showModalHandler = async (e, id) => {
    if (e) e.preventDefault()
    setProductId(id)
    if (id > 0) {
      const responseData = await getProductOfSellerById(id)
      setProduct(responseData.data)
      handleShow()
    } else {
      let product = {
        sellerId: '1',
        sku: '1',
        categoryId: '1',
        title: '',
        price: '',
        priceSales: '',
        percentDiscount: '',
      }
      // Kiểm tra nếu id > 0, thêm productId vào đối tượng setProduct
      if (id > 0) {
        product.productId = id
      }

      // Sử dụng đối tượng setProduct
      setProduct(product)
      handleShow()
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }))
  }

  const handleCategoryChange = (categoryId) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      categoryId: categoryId,
    }))
  }

  const handleAddProduct = async (e) => {
    try {
      setIsLoading(true)
      const responseData = await postProductOfSeller(product)
      if (responseData) {
        const fileImage = {
          productId: responseData.data.productId,
          sellerId: 1,
          options: [
            {
              name: 'Color',
              images: [
                [
                  {
                    url: inputValue,
                    type: 'IMAGE',
                  },
                ],
                [
                  {
                    url: inputValue,
                    type: 'IMAGE',
                  },
                ],
              ],
              values: ['Red', 'Yellow'],
            },
          ],
          productItems: [],
        }
        // const response = await postFileImage(fileImage)

        const descriptionData = {
          productId: responseData.data.productId,
          sellerId: 1,
          description: description,
          images: [
            {
              url: 'description1.jpg',
              type: 'IMAGE',
            },
            {
              url: 'description2.jpg',
              type: 'IMAGE',
            },
            {
              url: 'description3.mp4',
              type: 'VIDEO',
            },
            {
              url: 'description4.mp4',
              type: 'VIDEO',
            },
            {
              url: 'description5.jpg',
              type: 'IMAGE',
            },
            {
              url: 'description6.jpg',
              type: 'IMAGE',
            },
          ],
        }
        const responseDescription = await postDescriptionBySeller(
          descriptionData
        )
        console.log(responseDescription)
        handleGetListProduct()
        handleClose()
        toast.success('Add sucessful.')
      } else {
        // Xử lý khi request thất bại hoặc có lỗi
        toast.error('Delete failed.')
      }
      setIsLoading(false)
    } catch (err) {
      console.error('Error in handleAddProduct: ', err)
      setIsLoading(false)
    }
  }

  const handleUpdateProduct = async (e) => {
    try {
      setIsLoading(true)
      console.log(product)
      const responseData = await updateProductOfSeller(product)
      if (responseData) {
        handleGetListProduct()
        handleClose()
        toast.success('Update Successful.')
      } else {
        toast.error('Update Failed.')
      }
      setIsLoading(false)
    } catch (err) {
      console.error('Error in handleUpdateProduct: ', err)
      setIsLoading(false)
    }
  }
  const handleDeleteProduct = async (id) => {
    try {
      setIsLoading(true)
      const responseData = await deleteProductOfSellerById(id)
      if (responseData) {
        handleGetListProduct()
        toast.warn('Delete Successful.')
      } else {
        toast.error('Delete Failed.')
      }
      setIsLoading(false)
    } catch (err) {
      console.error('Error in handleUpdateProduct: ', err)
      setIsLoading(false)
    }
  }

  const handleInputChange = (event) => {
    // Lấy giá trị từ thẻ input khi có sự thay đổi
    const value = event.target.value
    // Cập nhật state với giá trị mới
    setInputValue(value)
  }

  const handleChangePageLength = (e) => {
    setPage(1)
    setPageLength(e.target.value)
  }

  const handleDescriptionChange = (event) => {
    // Lấy giá trị từ textarea
    const newDescription = event.target.value

    // Lưu giá trị vào state
    setDescription(newDescription)
  }

  const handleAccordionClick = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey)
  }

  const handleGetDescription = async (id) => {
    try {
      setIsLoading(true)
      const responseData = await getDescriptionBySeller(id)
      if (responseData) {
        console.log(responseData)
        setDescriptionById(responseData.data.description)
      } else {
        toast.error('Delete Failed.')
      }
      setIsLoading(false)
    } catch (err) {
      console.error('Error in handleUpdateProduct: ', err)
      setIsLoading(false)
    }
  }

  const handleSearchProductName = async (e) => {
    try {
      setIsLoading(true)
      const responseData = await searchProductName(searchValue)
      if (responseData) {
        console.log(responseData)
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
  console.log(description)

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  console.log(products)
  return (
    <div className="d-flex row my-override-class">
      <div className="navbar-parent col-2 p-0" style={{ height: '100vh' }}>
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <a
            className="sidebar-brand text-decoration-none d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div className="sidebar-brand-icon text-white rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
          </a>

          <hr className="sidebar-divider my-0" />

          <li className="nav-item">
            <a className="nav-link text-white" href="index.html">
              <i className="fas fa-fw fa-tachometer-alt mx-3"></i>
              <span>Trang chủ</span>
            </a>
          </li>

          <hr className="sidebar-divider" />

          <div className="sidebar-heading text-white mx-3">Interface</div>

          <li className="nav-item text-white">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i className="fas fa-fw fa-cog mx-3"></i>
              <span>Components</span>
            </a>
          </li>

          <li className="nav-item text-white">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseUtilities"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <i className="fas fa-fw fa-wrench mx-3"></i>
              <span>Utilities</span>
            </a>
          </li>

          <hr className="sidebar-divider" />

          <div className="sidebar-heading text-white mx-3">Addons</div>

          <li className="nav-item text-white">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapsePages"
              aria-expanded="true"
              aria-controls="collapsePages"
            >
              <i className="fas fa-fw fa-folder mx-3"></i>
              <span>Pages</span>
            </a>
          </li>

          <li className="nav-item text-white">
            <a className="nav-link" href="charts.html">
              <i className="fas fa-fw fa-chart-area mx-3"></i>
              <span>Charts</span>
            </a>
          </li>

          <li className="nav-item text-white">
            <a className="nav-link" href="tables.html">
              <i className="fas fa-fw fa-table mx-3"></i>
              <span>Tables</span>
            </a>
          </li>

          <hr className="sidebar-divider d-none d-md-block" />
        </ul>
      </div>

      <div className="navbar-child col-10 p-0">
        <div
          className="d-flex justify-content-between mb-2"
          style={{ borderBottom: '1px solid #efefef' }}
        >
          <div className="my-2 d-flex">
            <div id="dataTable_filter" className="">
              <label className="d-flex fs-4 mx-3">
                Search:
                <input
                  style={{ width: '200px', height: '38px' }}
                  type="search"
                  className="form-control form-control-sm"
                  placeHolder=""
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </label>
            </div>
            <div
              className="input-group-append mx-2"
              onClick={(e) => handleSearchProductName(e)}
            >
              <button
                // style={{ height: "0px" }}
                className="btn btn-primary"
                type="button"
              >
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-end mx-3 my-2 pb-3">
            <FaHome style={{ width: '38px', height: '38px' }} />
            <FaRegBell
              className="mx-2"
              style={{ width: '38px', height: '38px' }}
            />
            <FaRegUserCircle style={{ width: '38px', height: '38px' }} />
          </div>
        </div>

        <div className="container-fluid">
          <h1 className="h3 mb-2 text-gray-800">Quản lí sản phẩm</h1>

          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                List Products
              </h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <div
                  id="dataTable_wrapper"
                  className="dataTables_wrapper dt-bootstrap4"
                >
                  <div className="row my-2">
                    <div className="col-sm-12 col-md-6">
                      <div className="dataTables_length" id="dataTable_length">
                        <label className="">
                          Show{' '}
                          <select
                            value={pageLength}
                            onChange={handleChangePageLength}
                            name="dataTable_length"
                            aria-controls="dataTable"
                            className="p-1"
                          >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>{' '}
                          entries
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6 d-flex justify-content-end ">
                      <div className="mx-5 d-flex ">
                        <Link to="/dashboard/addproduct">
                          <button
                            className="text-white"
                            style={{
                              padding: '6px 15px',
                              backgroundColor: '#216fdb',
                              border: 'none',
                              borderRadius: '6px',
                              paddingTop: '5px',
                              paddingBottom: '5px',
                            }}
                          >
                            <i
                              style={{ color: 'white', marginRight: '5px' }}
                              className="fa-solid fa-plus"
                            ></i>
                            Add
                          </button>
                        </Link>
                      </div>
                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            {productId > 0 ? 'Update' : 'New'} Product
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <form>
                            <div
                              className="mb-3 row"
                              style={{ width: '490px' }}
                            >
                              <label
                                htmlFor="inputPassword"
                                className="col-4 col-form-label"
                              >
                                Title
                              </label>
                              <div className="col-8">
                                <input
                                  type="text"
                                  name="title"
                                  value={product.title}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div
                              className="mb-3 row"
                              style={{ width: '490px' }}
                            >
                              <label
                                htmlFor="inputPassword"
                                className="col-4 col-form-label"
                              >
                                Price
                              </label>
                              <div className="col-8">
                                <input
                                  type="number"
                                  name="price"
                                  value={product.price}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div
                              className="mb-3 row"
                              style={{ width: '490px' }}
                            >
                              <label
                                htmlFor="inputPassword"
                                className="col-4 col-form-label"
                              >
                                PriceSales
                              </label>
                              <div className="col-8">
                                <input
                                  type="number"
                                  name="priceSales"
                                  value={product.priceSales}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div
                              className="mb-3 row"
                              style={{ width: '490px' }}
                            >
                              <label
                                htmlFor="inputPassword"
                                className="col-4 col-form-label"
                              >
                                PercentSale
                              </label>
                              <div className="col-8">
                                <input
                                  type="number"
                                  name="percentDiscount"
                                  value={product.percentDiscount}
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </div>
                              <div className="d-flex mt-3">
                                <label
                                  htmlFor="inputPassword"
                                  className="col-4 col-form-label"
                                >
                                  Category
                                </label>
                                <div className="form-check mt-1 mx-2">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="categoryId"
                                    id="radioOption1"
                                    value="1"
                                    checked={product.categoryId === '1'}
                                    onChange={() => handleCategoryChange('1')}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="radioOption1"
                                  >
                                    Đồng hồ
                                  </label>
                                </div>
                                <div className="form-check mt-1 mx-2">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="categoryId"
                                    id="radioOption2"
                                    value="2"
                                    checked={product.categoryId === '2'}
                                    onChange={() => handleCategoryChange('2')}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="radioOption2"
                                  >
                                    Nhẫn cưới
                                  </label>
                                </div>
                                <div className="form-check mt-1 mx-2">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="categoryId"
                                    id="radioOption2"
                                    value="2"
                                    checked={product.categoryId === '3'}
                                    onChange={() => handleCategoryChange('3')}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="radioOption2"
                                  >
                                    Kính mát
                                  </label>
                                </div>
                              </div>
                              <div
                                className="mb-3 row"
                                style={{ width: '490px' }}
                              >
                                <label
                                  htmlFor="inputPassword"
                                  className="col-4 col-form-label"
                                >
                                  Description
                                </label>
                                <div className="col-8">
                                  <textarea
                                    className="form-control mx-2"
                                    style={{
                                      height: '100px',
                                      width: '202.66px',
                                    }}
                                    onChange={handleDescriptionChange}
                                  ></textarea>
                                </div>
                              </div>
                              {productId > 0 ? (
                                <></>
                              ) : (
                                <div
                                  className="d-flex mt-3"
                                  style={{ width: '490px' }}
                                >
                                  <label
                                    htmlFor="inputPassword"
                                    className="col-4 col-form-label"
                                  >
                                    Enter Url
                                  </label>
                                  <div className="col-8">
                                    <input
                                      type="text"
                                      value={inputValue}
                                      onChange={handleInputChange}
                                      className="form-control mx-2"
                                      style={{ width: '202.66px' }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          {productId > 0 ? (
                            <Button
                              variant="primary"
                              onClick={(e) => handleUpdateProduct()}
                            >
                              Update
                            </Button>
                          ) : (
                            <Button
                              variant="primary"
                              onClick={(e) => handleAddProduct()}
                            >
                              Add
                            </Button>
                          )}
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <table
                        className="table table-bordered dataTable"
                        id="dataTable"
                        width="100%"
                        cellSpacing="0"
                        role="grid"
                        aria-describedby="dataTable_info"
                        style={{ width: '100%' }}
                      >
                        <thead>
                          <tr role="row">
                            <th style={{ width: '50px' }}>Id</th>
                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="dataTable"
                              rowSpan="1"
                              colSpan="1"
                              style={{ width: '109px' }}
                              aria-label="Salary: activate to sort column ascending"
                            >
                              Category
                            </th>
                            <th
                              className="sorting sorting_asc"
                              tabIndex="0"
                              aria-controls="dataTable"
                              rowSpan="1"
                              colSpan="1"
                              style={{ width: '200px' }}
                              aria-sort="ascending"
                              aria-label="Name: activate to sort column descending"
                            >
                              Title
                            </th>
                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="dataTable"
                              rowSpan="1"
                              colSpan="1"
                              style={{ width: '30px' }}
                              aria-label="Position: activate to sort column ascending"
                            >
                              Image
                            </th>

                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="dataTable"
                              rowSpan="1"
                              colSpan="1"
                              style={{ width: '129px' }}
                              aria-label="Office: activate to sort column ascending"
                            >
                              Price
                            </th>
                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="dataTable"
                              rowSpan="1"
                              colSpan="1"
                              style={{ width: '129px' }}
                              aria-label="Office: activate to sort column ascending"
                            >
                              Description
                            </th>

                            <th
                              className="sorting"
                              tabIndex="0"
                              aria-controls="dataTable"
                              rowSpan="1"
                              colSpan="1"
                              style={{ width: '109px' }}
                              aria-label="Salary: activate to sort column ascending"
                            >
                              Option
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchProduct.length > 0
                            ? // Hiển thị kết quả search khi có giá trị trong searchProduct
                              searchProduct.map((aProducts, idx) => (
                                <tr key={idx} className="odd">
                                  <td>{idx + 1}</td>
                                  <td>{aProducts.productTitle}</td>
                                  <td className="sorting_1">
                                    {aProducts.productTitle}
                                  </td>
                                  <td>
                                    <img
                                      style={{ height: '50px', width: '50px' }}
                                      src={aProducts.imageUrl}
                                    />
                                  </td>

                                  <td>{numberWithCommas(aProducts.price)}đ</td>
                                  <td>
                                    <Accordion
                                      key={aProducts.id}
                                      activeKey={activeKey}
                                      onSelect={handleAccordionClick}
                                    >
                                      <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                          Description Product
                                          <span
                                            onClick={() =>
                                              handleGetDescription(aProducts.id)
                                            }
                                          >
                                            Xem
                                          </span>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                          {descriptionById}
                                        </Accordion.Body>
                                      </Accordion.Item>
                                    </Accordion>
                                  </td>

                                  <td className="d-flex">
                                    <button
                                      className="mx-2"
                                      style={{
                                        padding: '0 20px',
                                        backgroundColor: '#216fdb',
                                        border: 'none',
                                        borderRadius: '6px',
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                      }}
                                      onClick={(e) =>
                                        showModalHandler(e, aProducts.id)
                                      }
                                    >
                                      <i
                                        style={{ color: 'white' }}
                                        className="fa-solid fa-pen-to-square"
                                      ></i>
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
                                      onClick={() =>
                                        handleDeleteProduct(aProducts.id)
                                      }
                                    >
                                      <i
                                        style={{ color: 'white' }}
                                        className="fa-solid fa-trash-can"
                                      ></i>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            : // Hiển thị toàn bộ danh sách nếu searchProduct là mảng rỗng

                              products.map((aProducts, idx) => (
                                <tr key={idx} className="odd">
                                  <td>{idx + 1}</td>
                                  <td>{aProducts.categoryTitle}</td>
                                  <td className="sorting_1">
                                    {aProducts.title}
                                  </td>
                                  <td>
                                    <img
                                      style={{ height: '50px', width: '50px' }}
                                      src={aProducts.url}
                                    />
                                  </td>

                                  <td>{numberWithCommas(aProducts.price)}đ</td>
                                  <td>
                                    <Accordion
                                      key={aProducts.id}
                                      activeKey={activeKey}
                                      onSelect={handleAccordionClick}
                                    >
                                      <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                          Description Product
                                          <span
                                            onClick={() =>
                                              handleGetDescription(aProducts.id)
                                            }
                                          >
                                            Xem
                                          </span>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                          {descriptionById}
                                        </Accordion.Body>
                                      </Accordion.Item>
                                    </Accordion>
                                  </td>

                                  <td className="d-flex">
                                    <button
                                      className="mx-2"
                                      style={{
                                        padding: '0 20px',
                                        backgroundColor: '#216fdb',
                                        border: 'none',
                                        borderRadius: '6px',
                                        paddingTop: '5px',
                                        paddingBottom: '5px',
                                      }}
                                      onClick={(e) =>
                                        showModalHandler(e, aProducts.id)
                                      }
                                    >
                                      <i
                                        style={{ color: 'white' }}
                                        className="fa-solid fa-pen-to-square"
                                      ></i>
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
                                      onClick={() =>
                                        handleDeleteProduct(aProducts.id)
                                      }
                                    >
                                      <i
                                        style={{ color: 'white' }}
                                        className="fa-solid fa-trash-can"
                                      ></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                      {searchProduct.length > 0 ? (
                        <div></div>
                      ) : (
                        <Pagination className="mb-0 justify-content-end">
                          {pagingItems}
                        </Pagination>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
