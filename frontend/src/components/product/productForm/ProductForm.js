import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this poduct.</p>
            )}
          </Card>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Product Category:</label>
          <input
            type="text"
            placeholder="Product Category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />

          <label>Product Inventory:</label>
          <input
            type="text"
            placeholder="Product Inventory"
            name="inventory"
            value={product?.inventory}
            onChange={handleInputChange}
          />

          <label>Product Organization:</label>
          <input
            type="text"
            placeholder="Product Organization"
            name="organization"
            value={product?.organization}
            onChange={handleInputChange}
          />

          <label>Product User:</label>
          <input
            type="text"
            placeholder="Product User"
            name="employee"
            value={product?.employee}
            onChange={handleInputChange}
          />

          <label>Product Old inventory:</label>
          <input
            type="text"
            placeholder="Product Old Inventory"
            name="old_inventory"
            value={product?.old_inventory}
            onChange={handleInputChange}
          />          

          <label>Product Section:</label>
          <input
            type="text"
            placeholder="Product Section"
            name="section"
            value={product?.section}
            onChange={handleInputChange}
          />

          <label>Product Lan Mac address:</label>
          <input
            type="text"
            placeholder="Product Lan Mac address "
            name="mac_lan"
            value={product?.mac_lan}
            onChange={handleInputChange}
          />
          
          <label>Product Wifi Mac address:</label>
          <input
            type="text"
            placeholder="Product Wifi Mac address "
            name="mac_wifi"
            value={product?.mac_wifi}
            onChange={handleInputChange}
          />

          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
