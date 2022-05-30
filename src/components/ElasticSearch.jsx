import { Box } from "@mui/material";
import React from "react";
import { Elasticsearch, Results, SearchBox } from "react-elasticsearch";
import axios from "../components/api/axios";
import requestAPIs from "./api/requestAPIs";

const ElasticSearch = () => {
  const url = `http://127.0.0.1:8000/${requestAPIs.customers}`;
  return (
    <Box sx={{ marginTop: 5 }}>
      <Elasticsearch
        url={url}
        onChange={(params) => {
          console.log(params);
        }}
      >
        <SearchBox id="mainSearch" />
        <Results
          id="result"
          items={(data) => data.map((item) => <>{console.log(item)}</>)}
        />
      </Elasticsearch>
    </Box>
  );
};

export default ElasticSearch;
