import { Barang, StatusBarang } from "../types/barang";

// Array of objects: data dummy
export const daftarBarang: Barang[] = [
  {
    id: "1",
    nama: "Dompet Kulit Coklat",
    kategori: "Dompet",
    lokasi: "Kantin Kampus 3",
    status: "Ditemukan",
    gambar: "https://picsum.photos/seed/dompet/200",
  },
  {
    id: "2",
    nama: "Kunci Motor Honda",
    kategori: "Kunci",
    lokasi: "Parkiran Gedung A",
    status: "Dicari",
    gambar: "https://picsum.photos/seed/kunci/200",
  },
  {
    id: "3",
    nama: "Flashdisk Hitam 32GB",
    kategori: "Elektronik",
    lokasi: "Lab Informatika",
    status: "Ditemukan",
    gambar: "https://picsum.photos/seed/flashdisk/200",
  },
  {
    id: "4",
    nama: "Tas Ransel Biru",
    kategori: "Tas",
    lokasi: "Perpustakaan",
    status: "Dicari",
    gambar: "https://picsum.photos/seed/tas/200",
  },
];

// Custom function: mengubah status menjadi kalimat keterangan
export function getStatusLabel(status: StatusBarang): string {
  if (status === "Ditemukan") {
    return "Barang ini sudah ditemukan";
  }
  return "Barang ini sedang dicari";
}

// Custom function: mencari barang berdasarkan nama (disiapkan untuk modul berikutnya)
export const cariBarang = (kataKunci: string): Barang[] => {
  return daftarBarang.filter((barang) =>
    barang.nama.toLowerCase().includes(kataKunci.toLowerCase())
  );
};