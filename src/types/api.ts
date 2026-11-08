// Bentuk satu produk dari DummyJSON (hanya field yang kita pakai)
export interface ProdukApi {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
}

// Bentuk respons dari endpoint /products
export interface ProdukApiResponse {
  products: ProdukApi[];
  total: number;
  skip: number;
  limit: number;
}