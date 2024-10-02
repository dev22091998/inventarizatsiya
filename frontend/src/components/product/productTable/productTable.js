import React, { useEffect, useState } from "react";
// import { SpinnerImg } from "../../loader/Loader";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
// import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
// import {
//   deleteProduct,
//   getProducts,
// } from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
// import { useTable } from "react-table";
import "./productTable.css"; // Jadval uchun stil fayli
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const ProductTable = ({ products, isLoading }) => {
  const [search, setSearch] = useState(""); 
  const filteredProducts = useSelector(selectFilteredPoducts);
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  // Mahsulotlarni section bo'yicha alifbe tartibida tartiblash
  const sortProductsBySection = (products) => {
    const productsCopy = [...products]; // Massivni nusxalash
    return productsCopy.sort((a, b) => {
      if (a.section < b.section) return -1;
      if (a.section > b.section) return 1;
      return 0;
    });
  };

  const sortedProducts = sortProductsBySection(products)
  console.log(sortedProducts)
  // useEffect(() => {
  //   const sortedProducts = sortProductsBySection(products);
  //   console.log(sortedProducts)
  // }, [products]);
  

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    // Alifbo bo'yicha tartiblangan mahsulotlar
    const sortedProducts = sortProductsBySection(filteredProducts);

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);
  console.log(currentItems)

   // Excel faylini yaratish va yuklash funksiyasi
   const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products); // Bazadagi ma'lumotlarni Excelga aylantirish
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

     // Excel faylini yuklab olish
     const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "table_data.xlsx"); // Fayl nomi
  };

  return (
   
    <div>
      <Search
      value={search}
      onChange={(e)=> setSearch(e.target.value)}
      />
        <table  className="product-table">
            <thead>
            <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Category</th>
                <th>Inventory</th>
                <th>Old inventory</th>
                <th>Employee</th>
                <th>Section</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {currentItems.map((products, index) => {
                    const {_id, name, category, inventory, section, employee, old_inventory} = products;
                    return (
                        <tr key={_id}>
                            <td>{ index + 1}</td>
                            <td>{ shortenText(name, 20)}</td>
                            <td>{ category}</td>
                            <td>{ inventory}</td>
                            <td>{ old_inventory}</td>
                            <td>{ employee}</td>
                            <td>{ section }</td>
                            <td className="icons">
                                <span>
                                    <Link to={`/single-product/${_id}`}>
                                        <AiOutlineEye size={35} color={"purple"}/>
                                    </Link>
                                </span>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <button className="btn btn-view" onClick={downloadExcel}>Download Excel</button>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
    </div>
    
  );
};


export default ProductTable;
