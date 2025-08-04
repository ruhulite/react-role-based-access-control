import React, {useEffect, useState} from 'react';
import ProductList from "../components/ProductList.jsx";
import axios from "axios";
import Header from "../components/layout/Header.js";
import Footer from "../components/layout/Footer.js";

const Products = () => {

    const [products, setProducts] = useState([]);

    const allProducts = async () => {
        await axios.get('https://dummyjson.com/products').then((response) => {
            setProducts(response.data.products);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        allProducts();
    }, []);

    return <>
            <Header />
            <div className="container container-lg w-full bg-white p-6 rounded-md my-30 ml-auto mr-auto">
                <h2 className="font-bold text-xl mb-6">Product Listing</h2>
                <div className="grid grid-cols-4 gap-4 mt-6 mb-6">
                    <ProductList products={products} />
                </div>
            </div>
            <Footer />
        </>
};

export default Products;