import React, { useState, useEffect } from 'react';
import axios from 'axios';
import categoryImg from '../../assets/img/category/c5.jpg';
import { Link } from 'react-router-dom';

function RelatedProductArea() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://projectky320240926105522.azurewebsites.net/api/Product?limit=9');
        setProducts(response.data); // Giả sử dữ liệu trả về là một mảng sản phẩm
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="related-product-area section_gap_bottom">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="section-title">
              <h1>Deals of the Week</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9">
            <div className="row">
              {products.slice(0, 9).map((product) => (
                <div key={product.id} className="col-lg-4 col-md-4 col-sm-6 mb-20">
                  <div className="single-related-product d-flex">
                    <a href="/"><img src={product.image || product.defaultImage} alt={product.title} style={{width: "70px", height: "70px"}} /></a>
                    <div className="desc">
                      <Link to={`/product-detail/${product.productId}`} className="title" style={{textDecoration: "none"}}>{product.name}</Link>
                      <div className="price">
                        <h6>${product.price}</h6>
                        {product.oldPrice && <h6 className="l-through">${product.oldPrice}</h6>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="ctg-right">
              <a href="/" target="_blank">
                <img className="img-fluid d-block mx-auto" src={categoryImg} alt="Category" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RelatedProductArea;
