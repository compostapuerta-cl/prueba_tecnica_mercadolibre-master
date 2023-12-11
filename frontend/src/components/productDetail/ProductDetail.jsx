import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createAxiosInstance } from "../../config";
import { toast } from "sonner";
import './ProductDetail.css'
const client = createAxiosInstance();


export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const response = await client.get(`items/${id}`);
        setProduct(response.data.item);
      } catch (error) {
        toast.error("Ocurrió un error");
      }
    };
    fetchDetails();
  }, [id]);

  const handleBuy = () => {
    toast.success("Producto comprado!!!!!!!!!!!!!!11")
  }
  if(!product) {
    return <div>Producto no encontrado</div>
  }

  const descriptionLines = product.description ? product.description.split("\n") : ["Sin descripción proveída"];

  return (
    <section className="product-detail-container">
      <div className="header-info">
        <div className="product-image-container">
          <img src={product.picture} alt="Imagen del producto" />
        </div>
        <div className="product-detail-info">
          <h2 className="product-detail-title">{product.title}</h2>
          <h3 className="product-detail-price">
            {getFormattedPrice(product.price?.amount, product.price?.currency)}
            <span className="product-detail-decimals">{product.price?.decimals}</span>
          </h3>
          <button className="buy-button" onClick={handleBuy}>Comprar</button>
        </div>
      </div>
      <div className="details-info">
        <h2>Descripción del producto</h2>
        {descriptionLines.map((line,index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </section>
  );
}

const getFormattedPrice = (amount, currency) => {
  if (!amount || !currency) return;

  const formattedAmount = Math.trunc(amount).toLocaleString(navigator.language, {useGrouping: true})

  return `${currency} ${formattedAmount}`
};