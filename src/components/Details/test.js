import { useEffect, useState } from "react";
import { useAddCart } from '../../js/useAddCart';
import { useCheckUserLogin } from '../../js/useCheckUserLogin';

export default function ProductDetail({ productId }) {
    const { handleWishlistClick, isFavorite } = useCheckUserLogin() || {};
    const { addToCart } = useAddCart();
    const [productVariants, setProductVariants] = useState([]);
    const [product, setProduct] = useState(null);

    const _getProductVariants = async () => {
        const url = `https://projectky320240926105522.azurewebsites.net/api/ProductVariant?productId=${productId}`;
        let response = await fetch(url);
        response = await response.json();

        // Lọc ra các biến thể không có giá trị null
        const filteredVariants = Array.isArray(response) ? response.filter(variant => variant !== null) : [];
        setProductVariants(filteredVariants);

        // Nếu có biến thể thì lấy sản phẩm từ biến thể đầu tiên
        if (filteredVariants.length > 0) {
            setProduct(filteredVariants[0].product);
        }
    };

    useEffect(() => {
        _getProductVariants();
    }, [productId]);

    const handleAddToCart = (variant) => {
        const productWithDefaultQuantity = { ...variant, quantity: 1 };
        addToCart(productWithDefaultQuantity);
    };

    return (
        <div className="product-detail-container">
            {product ? (
                <>
                    <div className="product-info">
                        <img className="img-fluid" src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <h4>${product.price}</h4>
                        <p>Brand: {product.brand?.name || 'N/A'}</p>
                    </div>
                    <div className="variants">
                        <h3>Available Variants</h3>
                        {productVariants.length > 0 ? (
                            productVariants.map((variant) => (
                                <div className="variant" key={variant.variantId}>
                                    <p>Color: {variant.color?.colorName || 'N/A'}</p>
                                    <p>Size: {variant.size?.sizeName || 'N/A'}</p>
                                    <p>Stock Quantity: {variant.stockQuantity}</p>
                                    <button onClick={() => handleAddToCart(variant)} className="btn btn-primary">
                                        Add to Cart
                                    </button>
                                    <button
                                        className={`btn ${isFavorite && isFavorite(variant.productId) ? 'favorite-active' : ''}`}
                                        onClick={() => handleWishlistClick && handleWishlistClick(product)}
                                    >
                                        {isFavorite && isFavorite(variant.productId) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No variants available</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
}
