const id = "";

const requestAPIs = {
  register: `api/user_registration/`,
  login: `api/user/login/`,
  logout: `api/user/logout/`,
  products: `api/products/`,
  productDetail: `api/products/${id}/`,
  addProduct: `api/products/add_product/`,
  productgroups: `api/product_groups/`,
  measurements: `api/measurements/`,
  colors: `api/colors/`,
  colorDetail: `api/colors/${id}/`,
  stylecombo: `api/stylecombo/`,
  stylecomboDetail: `api/stylecombo/${id}/`,
  seasons: `api/seasons/`,
  seasonDetail: `api/seasons/${id}/`,
  processes: `api/processes/`,
  processDetail: `api/processes/${id}/`,
  accessories: `api/accessories/`,
  accessoriesDetail: `api/accessories/${id}/`,
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
