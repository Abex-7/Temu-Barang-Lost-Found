import { Barang, StatusBarang } from "../types/barang";
import { ProdukApi, ProdukApiResponse } from "../types/api";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { daftarBarang as fallbackBarang } from "../data/barang";

const DUMMY_API_URL = "https://dummyjson.com/products";

const daftarLokasi = [
  "Kantin Kampus 3",
  "Parkiran Gedung A",
  "Lab Informatika",
  "Perpustakaan",
  "Masjid Kampus",
  "Gedung Rektorat",
];

function petakanProdukKeBarang(produk: ProdukApi): Barang {
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

/**
 * SELECT: Mengambil daftar barang dari Supabase Cloud (PostgreSQL).
 * Jika Supabase belum diisi credential atau offline, otomatis fallback ke API Modul 3.
 */
export async function muatDaftarBarang(): Promise<Barang[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("barang")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data as Barang[];
      }
    } catch {
      // Lanjut ke fallback jika koneksi Supabase gagal
    }
  }

  // Fallback API Codelab Modul 3 (DummyJSON)
  try {
    const res = await fetch(`${DUMMY_API_URL}?limit=10`);
    if (res.ok) {
      const json: ProdukApiResponse = await res.json();
      if (json.products && json.products.length > 0) {
        return json.products.map(petakanProdukKeBarang);
      }
    }
  } catch {
    // Fallback data lokal jika internet offline
  }

  return fallbackBarang;
}

/**
 * SELECT (Detail): Mengambil data satu barang berdasarkan ID.
 */
export async function muatDetailBarang(id: string): Promise<Barang> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("barang")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        return data as Barang;
      }
    } catch {
      // Lanjut ke fallback
    }
  }

  // Fallback API DummyJSON jika ID numerik
  if (!isNaN(Number(id))) {
    try {
      const res = await fetch(`${DUMMY_API_URL}/${id}`);
      if (res.ok) {
        const produk: ProdukApi = await res.json();
        return petakanProdukKeBarang(produk);
      }
    } catch {
      // Abaikan
    }
  }

  // Fallback data lokal
  const item = fallbackBarang.find((b) => b.id === id);
  if (item) return item;

  throw new Error(`Barang dengan id "${id}" tidak ditemukan.`);
}

/**
 * INSERT: Menambahkan barang baru ke Supabase PostgreSQL.
 * Sesuai RLS Codelab 5, user_id otomatis terisi dari user yang sedang login.
 */
export async function tambahBarangBaru(dataBarang: {
  nama: string;
  kategori: string;
  lokasi: string;
  status: StatusBarang;
  gambar?: string;
  kontak?: string;
}): Promise<Barang> {
  const { data: { user } } = await supabase.auth.getUser();

  const payload = {
    ...dataBarang,
    user_id: user?.id,
    gambar:
      dataBarang.gambar?.trim() ||
      `https://picsum.photos/seed/${encodeURIComponent(dataBarang.nama)}/200`,
  };

  const { data, error } = await supabase
    .from("barang")
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Barang;
}

/**
 * UPDATE: Memperbarui data barang (hanya pemilik yang diizinkan oleh RLS).
 */
export async function perbaruiBarang(
  id: string,
  pembaruan: Partial<Barang>
): Promise<Barang> {
  const { data, error } = await supabase
    .from("barang")
    .update(pembaruan)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Barang;
}

/**
 * DELETE: Menghapus data barang (hanya pemilik yang diizinkan oleh RLS).
 */
export async function hapusBarang(id: string): Promise<void> {
  const { error } = await supabase.from("barang").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
