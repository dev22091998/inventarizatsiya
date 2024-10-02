import React, { useEffect, useRef  } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../redux/features/product/productSlice";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";


const SingleProduct = () => {
  const qrRef = useRef(null); // QR-kod uchun ref yaratish
  const { id } = useParams();
  const dispatch = useDispatch();

  const generatePDF = () => {
    const doc = new jsPDF({
      // orientation: "landscape", // Albom holati
      unit: "mm",
      format: [58, 40], // 40mm x 58mm PDF o'lchami
    });
  
    // PDF o'lchamlarini olish
    const pdfWidth = 40;
    const pdfHeight = 58;
  
    // Mahsulot kategoriyasi va inventarizatsiyasini PDFga qo'shish
    doc.setFontSize(14);
    const categoryText = `${product.category}`;
    const inventoryText = `INV: ${product.inventory}`;
  
    // Matnlarni PDFning markaziga joylashtirish
    const textXPos = pdfWidth / 2;
    doc.text(categoryText, textXPos, 15, { align: "center" });
    doc.text(inventoryText, textXPos, 25, { align: "center" });
  
    // QR-kod canvasni olish
    const qrCanvas = qrRef.current.querySelector("canvas");
    const qrImageData = qrCanvas.toDataURL("image/png");
  
    // QR-kodni PDFga joylashtirish
    const qrWidth = 25;
    const qrHeight = 25;
    const qrXPos = (pdfWidth - qrWidth) / 2;
    const qrYPos = 30;
  
    doc.addImage(qrImageData, "PNG", qrXPos, qrYPos, qrWidth, qrHeight);
  
    // PDFni blob formatida olish
    const pdfOutput = doc.output("blob");
  
    // PDFni yangi oynada ochish
    const pdfUrl = URL.createObjectURL(pdfOutput);
    window.open(pdfUrl, "_blank"); // Yangi oynada ochish
  };
  

  const productUrl = `${window.location.origin}/single-product/${id}`; // Mahsulot sahifasining to'liq URL ni hosil qilish
  const { product, isLoading } = useSelector((state) => state.product);
  useEffect(() => {
    if (id) {
      dispatch(getProduct(id)); // ID bo'yicha mahsulotni olish
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="single-product">
      <h1>Mahsulot tasnifi</h1>
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Inventory:</strong> {product.inventory}</p>
          <p><strong>Organization:</strong> {product.organization}</p>
          <p><strong>Employee:</strong> {product.employee}</p>
          <p><strong>Old Inventory:</strong> {product.old_inventory}</p>
          <p><strong>Section:</strong> {product.section}</p>
            {/* product.category === "Noutbook" || product.category === "Desktop" ? */}
          <p><strong>Lan Mac address: </strong> {product.old_inventory}</p>
          <p><strong>Wifi Mac address: </strong> {product.old_inventory}</p>
          {/* QR-kodni yaratish */}
          <div ref={qrRef}>
            <QRCodeCanvas value={productUrl} />
          </div>
          <button onClick={generatePDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
