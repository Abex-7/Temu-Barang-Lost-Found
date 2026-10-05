import { Barang, StatusBarang } from "../types/barang";

// Array of objects: data dummy
export const daftarBarang: Barang[] = [
  {
    id: "1",
    nama: "Dompet Kulit Coklat",
    kategori: "Dompet",
    lokasi: "Kantin Kampus 3",
    status: "Ditemukan",
    gambar: "https://down-id.img.susercontent.com/file/2fbaa452a35ffd4b90efa21333f7b5b8",
  },
  {
    id: "2",
    nama: "Kunci Motor Honda",
    kategori: "Kunci",
    lokasi: "Parkiran Gedung A",
    status: "Dicari",
    gambar: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/720x0/webp/photo/2023/04/24/4264389151.jpg",
  },
  {
    id: "3",
    nama: "Flashdisk Hitam 32GB",
    kategori: "Elektronik",
    lokasi: "Lab Informatika",
    status: "Ditemukan",
    gambar: "https://down-id.img.susercontent.com/file/id-11134207-8224r-miagea6rxs76ff",
  },
  {
    id: "4",
    nama: "Tas Ransel Biru",
    kategori: "Tas",
    lokasi: "Perpustakaan",
    status: "Dicari",
    gambar: "https://down-id.img.susercontent.com/file/id-11134207-7qul2-ljs0qncgehrbf9",
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