import React, { useState} from 'react';

const ProductList = ({products}) => {
    const [product, setProduct] = useState(null);

    console.log(product);

    return (
        <>
            {products.map(product => (
                <div
                    className="bg-white rounded-lg shadow-sm p-5"
                    key={product.id}
                >
                    <img className="mb-3" src={product.images[0]} alt={product.title} />
                    <h3 className="text-md text-black font-bold mb-3">{product.title}</h3>
                    <div className="text-md text-gray-600 mb-5">{product.description}</div>
                    <div className="flex justify-center items-center">
                        <button
                            className="bg-sky-500 hover:bg-sky-600 rounded shadow-sm text-white text-sm py-3 px-6 cursor-pointer"
                            onClick={() => setProduct(product)}
                        >Add to Card</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductList;