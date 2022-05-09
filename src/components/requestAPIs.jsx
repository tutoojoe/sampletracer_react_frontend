const id = "";

const requestAPIs = {
  register: `api/user_registration/`,
  login: `api/user/login/`,
  logout: `api/user/logout/`,
  products: `api/products/`,
  addProduct: `api/products/add_product/`,
  productgroups: `api/products/product_groups/`,
  measurements: `api/products/measurements/`,
  colors: `api/products/colors/`,
  colordetail: `api/products/colors/${id}`,
  stylecombo: `api/products/stylecombo/`,
  stylecombodetail: `api/products/stylecombo/${id}`,
  seasons: `api/products/seasons/`,
  seasondetail: `api/products/seasons/${id}`,

  suppliers: `api/suppliers/`,
  supplierdetail: `api/suppliers/${id}`,
  token: `api/token/`,
  tokenverify: `api/token/verify/`,

  tokenrefresh: `api/token/refresh/`,

  dashboard: `api/dashboard/`,
  users: `api/users/`,
  userdetail: `api/user/${id}`,
  customers: `api/customers/`,
  customerdetail: `api/customers/${id}`,
  merchandisers: `api/merchandisers/`,
  merchandiserDetail: `api/merchandiser/${id}`,
};

export default requestAPIs;
