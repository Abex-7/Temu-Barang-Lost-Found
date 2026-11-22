// Tipe untuk status barang: hanya boleh salah satu dari dua nilai ini (union type)
export type StatusBarang = "Ditemukan" | "Dicari";

// Bentuk data satu barang di aplikasi dan database Supabase
export interface Barang {
  readonly id: string;
  user_id?: string;         // ID user pembuat laporan dari auth.users
  nama: string;
  kategori: string;
  lokasi: string;
  status: StatusBarang;
  gambar?: string;          // URL gambar barang
  kontak?: string;          // Pos satpam / kontak pelapor
  created_at?: string;      // Timestamp pembuatan
}
