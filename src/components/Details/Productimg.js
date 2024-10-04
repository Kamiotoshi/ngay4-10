import { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [productVariants, setProductVariants] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProduct = async () => {
            const productResponse = await fetch(`https://projectky320240926105522.azurewebsites.net/api/Product/${id}`);
            const productData = await productResponse.json();
            setProduct(productData);

            const variantResponse = await fetch(`https://projectky320240926105522.azurewebsites.net/api/ProductVariant?productId=${id}`);
            const variantData = await variantResponse.json();
            setProductVariants(variantData.filter(variant => variant !== null));
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (selectedColor && selectedSize) {
            console.log("Selected Color:", selectedColor);  // Kiểm tra màu đã chọn
            console.log("Selected Size:", selectedSize);    // Kiểm tra size đã chọn
            console.log("Product Variants:", productVariants);  // Kiểm tra danh sách biến thể
    
            // Kiểm tra từng biến thể
            productVariants.forEach(variant => {
                console.log(`Checking variant - Color: ${variant.color?.colorName}, Size: ${variant.size?.sizeName}, ProductId: ${variant.productId}`);
            });
    
            // Tìm biến thể dựa trên color, size và id từ useParams (đại diện cho productId)
            const selectedVariant = productVariants.find(variant => {
                console.log("Comparing with:", variant.color?.colorName, variant.size?.sizeName, variant.productId);
                return (
                    variant.color?.colorName.trim().toLowerCase() === selectedColor.trim().toLowerCase() && 
                    variant.size?.sizeName.trim().toLowerCase() === selectedSize.trim().toLowerCase() &&
                    String(variant.productId) === String(id)  // Đảm bảo productId và id là cùng kiểu
                );
            });
    
            if (selectedVariant) {
                console.log("Selected Variant:", selectedVariant);  // Kiểm tra biến thể đã tìm thấy
                const userId = localStorage.getItem('Token');  // Lấy userId từ localStorage
                const cartItem = {
                    userId,  // Lưu userId
                    variantId: selectedVariant.variantId,  // Đẩy đúng variantId
                    quantity: 1  // Hardcoded số lượng sản phẩm (ở đây là 1)
                };
    
                try {
                    // Gửi yêu cầu thêm sản phẩm vào giỏ hàng
                    const response = await fetch('https://projectky320240926105522.azurewebsites.net/api/Cart/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(cartItem),  // Đẩy variantId và các thông tin khác lên API
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        alert('Item added to cart successfully!');
                        console.log(data);
                        navigate("/cart");
                        // Force reloading the page to ensure all state is updated and cleared
                        window.location.reload();
                    } else {
                        const errorData = await response.json();
                        alert(`Error: ${errorData.message}`);
                    }
                } catch (error) {
                    console.error('Error adding to cart:', error);
                    alert('An error occurred while adding the item to the cart.');
                }
            } else {
                alert('Out of Stock');
            }
        } else {
            alert('Please select a color and size.');
        }
    };
    

    const availableColors = [...new Set(productVariants.map(variant => variant.color?.colorName).filter(Boolean))];
    const availableSizes = [...new Set(productVariants.map(variant => variant.size?.sizeName).filter(Boolean))];

    const stockQuantity = selectedColor && selectedSize
        ? productVariants.find(variant => variant.color?.colorName === selectedColor && variant.size?.sizeName === selectedSize)?.stockQuantity 
        : 0;

    return (
        <div className="product_image_area">
            <div className="container">
            </div>
            <div className="container">
                <div className="row s_product_inner">
                    <div className="col-lg-6">
                        <div className="s_Product_carousel">
                            <div className="single-prd-item">
                                {product?.image ? (
                                    <img className="img-fluid" src={product.image} alt={product.name} />
                                ) : (
                                    <p>Image not available</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 offset-lg-1">
                        <div className="s_product_text">
                            <h3>{product?.name}</h3>
                            <h5>{product?.description}</h5>
                            <h2>${product?.price}</h2>
                            {/* <ul className="list">
                                <li>
                                  <span>Availability</span>: {stockQuantity > 0 ? `${stockQuantity} items` : 'Out of stock'}
                                </li>
                            </ul> */}
                            <div>
                                <h4>Select Color:</h4>
                                <div className="color-options">
                                  {availableColors.map((color, index) => (
                                      <button
                                          key={index}
                                          onClick={() => {
                                              setSelectedColor(color);
                                              setSelectedSize(null);
                                          }}
                                          className={`color-button ${color === selectedColor ? 'active' : ''}`}
                                          style={{
                                              backgroundColor: color === selectedColor ? '#ffba00' : '#d9d9d9',
                                              width: '90px',
                                              margin: '0 10px',
                                              padding: '10px',
                                              borderRadius: '5px',
                                          }}
                                      >
                                          {color}
                                      </button>
                                  ))}
                              </div>
                            </div>
                            {availableSizes.length > 0 && (
                                    <div style={{ marginTop: '10px' }}>
                                        <h4>Select Size:</h4>
                                        <div className="size-options">
                                            {availableSizes.map((size, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`size-button ${size === selectedSize ? 'active' : ''}`}
                                                    style={{
                                                        backgroundColor: size === selectedSize ? '#ffba00' : '#d9d9d9',
                                                        width: '90px',
                                                        margin: '0 10px',
                                                        padding: '10px',
                                                        borderRadius: '5px',
                                                    }}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            <div
                                className="card_area d-flex align-items-center"
                                style={{ marginTop: '20px' }}
                            >
                                <a
                                    onClick={handleAddToCart}
                                    className="primary-btn"
                                    href="#"
                                    style={{textDecoration: "none"}}
                                >
                                    Add to Cart
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
