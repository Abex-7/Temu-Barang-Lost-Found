// Tipe untuk status barang: hanya boleh salah satu dari dua nilai ini (union type)
export type StatusBarang = "Ditemukan" | "Dicari";

// Bentuk data satu barang
export interface Barang {
  readonly id: string;      // readonly: tidak bisa diubah setelah dibuat
  nama: string;
  kategori: string;
  lokasi: string;
  status: StatusBarang;
  gambar: string;           // URL gambar
}