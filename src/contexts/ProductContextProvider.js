import React, { createContext, useState } from "react";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState(null);

  const [mathemProducts, setMathemProducts] = useState("");
  const [citygrossProducts, setCitygrossProducts] = useState("");

   const values = {
     products,
     setProducts,
     mathemProducts,
     setMathemProducts,
     citygrossProducts,
     setCitygrossProducts
   };

   return (
     <ProductContext.Provider value={values}>
       {props.children}
     </ProductContext.Provider>
   );
};

export default ProductContextProvider;
