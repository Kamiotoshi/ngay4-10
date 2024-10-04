import { useState, useEffect } from 'react';
import { useFavorites } from './useFavorites';

export function useCheckUserLogin() {
    const [userId, setUserId] = useState(null);
    const { toggleFavorite, isFavorite } = useFavorites(userId); // Sử dụng useFavorites

    useEffect(() => {
        const storedUserId = localStorage.getItem('currentUser'); // Lấy userId từ localStorage
        if (storedUserId) {
            setUserId(storedUserId); // Nếu có userId trong localStorage, set userId
        } else {
            const checkUserLogin = async () => {
                try {
                    const response = await fetch('https://yourapi.com/current-user');
                    const data = await response.json();
                    if (data.userId) {
                        setUserId(data.userId); // Nếu có người dùng đăng nhập, set userId
                        localStorage.setItem('currentUser', data.userId); // Lưu userId vào localStorage
                    } else {
                        setUserId(null); // Nếu không có ai đăng nhập
                    }
                } catch (error) {
                    console.error("Failed to check user login status", error);
                    setUserId(null);
                }
            };

            checkUserLogin(); // Gọi hàm kiểm tra khi component mount
        }
    }, []);

    const handleWishlistClick = (product) => {
        const currentUserId = localStorage.getItem('currentUser'); // Kiểm tra userId từ localStorage
        if (!currentUserId) {
            alert("Please log in to add to wishlist");
            return;
        }
        toggleFavorite(product); 
    };

    return {
        userId, 
        handleWishlistClick, 
        isFavorite 
    };
}
