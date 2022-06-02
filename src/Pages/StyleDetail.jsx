import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Route, useParams, Link, useMatch } from "react-router-dom";
import requestAPIs from "../components/api/requestAPIs";
import useHttp from "../components/hooks/use-http";

const StyleDetail = () => {
  const [productList, setProductList] = useState([]);
  const fetchProducts = useCallback((productObj) => {
    setProductList(productObj);
  }, []);

  //!!!! IMPORTANT => There is an alternate way of doing this also.
  // we can make the 'fetchProducts' as a second argument to 'fetchProductData' and
  // we can move all the 'fetchProducts' to inside the useEffect.
  // if we do so, the dependencies inside the useHttp also should be reworked

  //   after changing the 'requestConfig' to the argument in sendRequest, the component will change as below
  //   const {
  //     isLoading,
  //     error,
  //     sendRequest: fetchProductData,
  //   } = useHttp(
  //     { url: `http://127.0.0.1:8000/${requestAPIs.products}` },
  //     fetchProducts
  //   );
  const {
    isLoading,
    error,
    sendRequest: fetchProductData,
  } = useHttp(fetchProducts); //removed the url/config part
  //   const fetchData = useHttp({ url: `${requestAPIs.products}` }, fetchProducts); this is changed as above
  //   const match = useMatch();

  const params = useParams();

  //   const { isLoading, error, sendRequest } = fetchData; -> this is changed as above
  useEffect(() => {
    // in the alternate way, the 'fetchProducts' function will come here..
    fetchProductData({ url: `http://127.0.0.1:8000/${requestAPIs.products}` });
  }, [fetchProductData]);
  return (
    <div>
      StyleDetail {params.prodId}
      <ul>
        {productList.map((product) => (
          <li key={product.id}>{product.style_no}</li>
        ))}
      </ul>
    </div>
  );
};

export default StyleDetail;
