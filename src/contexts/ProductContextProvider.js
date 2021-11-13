import React, { createContext, useState } from "react";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [products, setProducts] = useState(null);

   const values = {
     products,
     setProducts,
   };

   return (
     <ProductContext.Provider value={values}>
       {props.children}
     </ProductContext.Provider>
   );
};

export default ProductContextProvider;
