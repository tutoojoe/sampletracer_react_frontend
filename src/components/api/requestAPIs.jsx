const id = "";

const requestAPIs = {
  register: `api/user_registration/`,
  login: `api/user/login/`,
  logout: `api/user/logout/`,
  products: `api/products/`,
  productDetail: `api/products/${id}/`,
  addProduct: `api/products/add_product/`,
  productgroups: `api/products/product_groups/`,
  measurements: `api/products/measurements/`,
  colors: `api/products/colors/`,
  colorDetail: `api/products/colors/${id}/`,
  stylecombo: `api/products/stylecombo/`,
  stylecomboDetail: `api/products/stylecombo/${id}/`,
  seasons: `api/products/seasons/`,
  seasonDetail: `api/products/seasons/${id}/`,
  processes: `api/products/processes/`,
  processDetail: `api/products/${id}/`,
  accessories: `api/products/accessories/`,
  accessoriesDetail: `api/products/accessories/${id}/`,
  suppliers: `api/suppliers/`,
  supplierDetail: `api/suppliers/${id}/`,
  // token: `api/token/`,
  tokenverify: `api/user/token/verify/`,

  tokenrefresh: `api/user/token/refresh/`,

  dashboard: `api/dashboard/`,
  users: `api/users/`,
  userDetail: `api/user/${id}/`,
  customers: `api/customers/`,
  customerDetail: `api/customers/${id}/`,
  merchandisers: `api/merchandisers/`,
  merchandiserDetail: `api/merchandiser/${id}/`,
};

export default requestAPIs;
