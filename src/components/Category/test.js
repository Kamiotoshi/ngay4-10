import { useAddCart } from '../../js/useAddCart';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCheckUserLogin } from '../../js/useCheckUserLogin';

export default function ProductShow() {
    const { handleWishlistClick, isFavorite } = useCheckUserLogin() || {}; 
    const { addToCart } = useAddCart();
    const [products, setProducts] = useState([]);

    // Fetch products and set default quantity
    const _getProducts = async () => {
        const url = 'https://projectky320240926105522.azurewebsites.net/api/Product?limit=12';
        let response = await fetch(url);
        response = await response.json();

        // Lấy danh sách sản phẩm từ $values
        const productsWithDefaultQuantity = Array.isArray(response.$values)
            ? response.$values.map(product => ({
                ...product,
                quantity: 1, 
                image: product.image || '', 
            }))
            : []; // Nếu không có sản phẩm, trả về mảng rỗng

        setProducts(productsWithDefaultQuantity);
    };

    useEffect(() => {
        _getProducts();
    }, []);

    // Handle adding product to cart
    const handleAddToCart = (product) => {
        const productWithDefaultQuantity = { ...product, quantity: 1 };
        addToCart(productWithDefaultQuantity);
    };

    return (
        <div className="col-xl-9 col-lg-8 col-md-7">
            {/* <!-- Start Best Seller --> */}
            <section className="lattest-product-area pb-40 category-list">
                <div className="row">
                    {/* Single product */}
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div className="col-lg-4 col-md-6" key={product.productId}>
                                <div className="single-product">
                                    <img className="img-fluid" src={product.image} alt={product.name} />
                                    <div className="product-details">
                                        <h6>{product.name}</h6>
                                        <div className="price">
                                            <h6>${product.price}</h6>
                                        </div>
                                        <div className="prd-bottom">
                                            <button onClick={() => handleAddToCart(product)} className="social-info">
                                                <span className="ti-bag"></span>
                                                <p className="hover-text">add to bag</p>
                                            </button>
                                            <button
                                                className={`social-info ${isFavorite && isFavorite(product.productId) ? 'favorite-active' : ''}`} 
                                                onClick={() => handleWishlistClick && handleWishlistClick(product)}
                                            >
                                                <span className="lnr lnr-heart"></span>
                                                <p className="hover-text">
                                                    {isFavorite && isFavorite(product.productId) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                                </p>
                                            </button>
                                            <button className="social-info">
                                                <span className="lnr lnr-sync"></span>
                                                <p className="hover-text">compare</p>
                                            </button>
                                            <Link to={"/product-detail/"+product.productId} className="social-info">
                                                <span className="lnr lnr-move"></span>
                                                <p className="hover-text">view more</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            </section>
            {/* <!-- End Best Seller --> */}
        </div>
    );
}
