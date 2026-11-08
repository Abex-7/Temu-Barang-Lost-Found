import { Barang, StatusBarang } from "../types/barang";
import { ProdukApi, ProdukApiResponse } from "../types/api";

const BASE_URL = "https://dummyjson.com/products";

// Lokasi BUKAN dari API: dipilih dari daftar ini berdasarkan id (simulasi)
const daftarLokasi = [
  "Kantin Kampus 3",
  "Parkiran Gedung A",
  "Lab Informatika",
  "Perpustakaan",
  "Masjid Kampus",
  "Gedung Rektorat",
];

// Mengubah data API (ProdukApi) menjadi object Barang milik aplikasi
function petakanKeBarang(produk: ProdukApi): Barang {
  // Status BUKAN dari API: id genap = Ditemukan, id ganjil = Dicari (simulasi)
  const status: StatusBarang = produk.id % 2 === 0 ? "Ditemukan" : "Dicari";

  return {
    id: String(produk.id),
    nama: produk.title,
    kategori: produk.category,
    lokasi: daftarLokasi[produk.id % daftarLokasi.length],
    status,
    gambar: produk.thumbnail,
  };
}

// CUSTOM ASYNC FUNCTION 1: memakai Promise constructor, then(), resolve(), reject()
export function muatDaftarBarang(): Promise<Barang[]> {
  return new Promise<Barang[]>((resolve, reject) => {
    fetch(`${BASE_URL}?limit=10`)
      .then((response) => {
        // fetch tidak error untuk status 404/500, jadi dicek manual
        if (!response.ok) {
          throw new Error(`Server membalas status ${response.status}`);
        }
        return response.json() as Promise<ProdukApiResponse>;
      })
      .then((data) => {
        if (data.products.length === 0) {
          reject(new Error("Data dari server kosong"));
          return;
        }
        resolve(data.products.map(petakanKeBarang));
      })
      .catch((error: Error) => reject(error));
  });
}

// CUSTOM ASYNC FUNCTION 2: memakai async/await
export async function muatDetailBarang(id: string): Promise<Barang> {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Barang tidak ditemukan (status ${response.status})`);
  }

  const produk: ProdukApi = await response.json();
  return petakanKeBarang(produk);
}