import { useState, useEffect } from 'react';

const useProductSearch = (products) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        setFilteredProducts(
            products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, products]);

    return { searchTerm, setSearchTerm, filteredProducts };
};

export default useProductSearch;
