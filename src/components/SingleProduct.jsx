import React, { Fragment, useEffect } from "react";
import { Route, useParams, Link, useMatch } from "react-router-dom";
import {getSingleProduct} from '../components/api/apis'
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "./hooks/use-http";

const SingleProduct = () => {
    const match = useMatch()
    const params = useParams()
    const {prodId} = params
    return <div>SingleProduct</div>;
};

export default SingleProduct;






import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";


// const DUMMY_QUOTES = [
//   { id: "q1", author: "Tutoo", text: "Learning React is fun" },
//   { id: "q2", author: "TutooJoe", text: "Django REST API has a strong base" },
// ];

const QuoteDetail = () => {
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  const match = useRouteMatch(); // this is used to mark the route path, so that in case if make a change in the actual
  // router, we dont have to make the changes in nested routes.
  const params = useParams();
  const { quoteId } = params;
  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return (
      <Fragment>
        <NotFound />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {/* <Route path={`/quotes/${params.quoteId}`} exact> */}
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Commments
          </Link>
        </div>
      </Route>

      {/* <Route path={`/quotes/${params.quoteId}/comments`}> */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
