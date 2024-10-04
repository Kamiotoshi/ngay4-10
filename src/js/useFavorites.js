import { useState, useEffect } from 'react';

export function useFavorites(userId) {
    const [favorites, setFavorites] = useState([]);

    // Lấy danh sách favorites từ localStorage theo userId khi component mount, sau sẽ đổi thành API
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
        setFavorites(savedFavorites);
    }, [userId]);

    // Thêm sản phẩm vào danh sách favorites
    const addToFavorites = (product) => {
        const newFavorites = [...favorites, product];
        setFavorites(newFavorites);
        localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
    };

    // Xóa sản phẩm khỏi danh sách favorites
    const removeFromFavorites = (productId) => {
        const newFavorites = favorites.filter(item => item.id !== productId);
        setFavorites(newFavorites);
        localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
    };

    // Kiểm tra xem sản phẩm đã có trong favorites chưa
    const isFavorite = (productId) => {
        return favorites.some(item => item.id === productId);
    };

    // Hàm toggle (thêm hoặc xóa) sản phẩm khỏi favorites
    const toggleFavorite = (product) => {
        if (isFavorite(product.id)) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    return {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite, // Thêm hàm này để sử dụng trong các component
    };
}
