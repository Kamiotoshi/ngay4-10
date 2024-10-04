import { useFavorites } from '../../js/useFavorites';   
export default function FavoritesList() {
    const { favorites, removeFromFavorites } = useFavorites();

    return (
        <div className="favorites-list">
            <h2>Your Favorites</h2>
            {favorites.length === 0 ? (
                <p>No products in your wishlist.</p>
            ) : (
                <div className="row">
                    {favorites.map((product) => (
                        <div className="col-lg-4 col-md-6" key={product.id}>
                            <div className="single-product">
                                <img className="img-fluid" src={product.images} alt={product.name} />
                                <div className="product-details">
                                    <h6>{product.name}</h6>
                                    <div className="price">${product.price}</div>
                                    <button onClick={() => removeFromFavorites(product.id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}