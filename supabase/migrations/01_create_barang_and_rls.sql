-- ========================================================
-- SKRIP MIGRASI SUPABASE: TEMU BARANG (LOST & FOUND KAMPUS)
-- Modul 4: Database PostgreSQL, Otentikasi & Row Level Security (RLS)
-- ========================================================

-- 1. Buat tabel 'barang' jika belum ada
CREATE TABLE IF NOT EXISTS public.barang (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
  nama TEXT NOT NULL,
  kategori TEXT NOT NULL,
  lokasi TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Dicari', 'Ditemukan')),
  gambar TEXT,
  kontak TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.barang ENABLE ROW LEVEL SECURITY;

-- 3. Hapus policy lama jika ada (idempotent)
DROP POLICY IF EXISTS "Semua user dapat melihat daftar barang" ON public.barang;
DROP POLICY IF EXISTS "User terautentikasi dapat menambah barang miliknya" ON public.barang;
DROP POLICY IF EXISTS "Pemilik dapat memperbarui barang miliknya" ON public.barang;
DROP POLICY IF EXISTS "Pemilik dapat menghapus barang miliknya" ON public.barang;

-- 4. Pasang Kebijakan RLS (Security Policies):

-- A. SELECT: Siapa saja dapat melihat daftar barang temuan/hilang
CREATE POLICY "Semua user dapat melihat daftar barang"
  ON public.barang
  FOR SELECT
  USING (true);

-- B. INSERT: User terautentikasi hanya bisa membuat laporan dengan ID miliknya sendiri
CREATE POLICY "User terautentikasi dapat menambah barang miliknya"
  ON public.barang
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- C. UPDATE: Hanya pemilik laporan yang boleh memperbarui data barangnya
CREATE POLICY "Pemilik dapat memperbarui barang miliknya"
  ON public.barang
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- D. DELETE: Hanya pemilik laporan yang boleh menghapus barangnya
CREATE POLICY "Pemilik dapat menghapus barang miliknya"
  ON public.barang
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 5. Fungsi pembantu pengecekan keberadaan email (untuk membedakan akun belum terdaftar vs salah password)
CREATE OR REPLACE FUNCTION public.check_email_exists(email_input TEXT)
RETURNS BOOLEAN
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users 
    WHERE LOWER(TRIM(email)) = LOWER(TRIM(email_input))
  );
END;
$$ LANGUAGE plpgsql;

GRANT EXECUTE ON FUNCTION public.check_email_exists(TEXT) TO anon, authenticated;

-- 6. Tambahkan data sampel awal kampus
INSERT INTO public.barang (nama, kategori, lokasi, status, gambar, kontak)
VALUES 
  ('Kunci Motor Honda Beat', 'Kunci', 'Parkiran Gedung A', 'Dicari', 'https://picsum.photos/seed/kunci/200', 'Satpam Gedung A'),
  ('Dompet Kulit Coklat', 'Dompet', 'Kantin Kampus 3', 'Ditemukan', 'https://picsum.photos/seed/dompet/200', 'Pos Satpam Utama'),
  ('Flashdisk Sandisk 64GB', 'Elektronik', 'Lab Informatika 2', 'Ditemukan', 'https://picsum.photos/seed/usb/200', 'Laboran Lab 2'),
  ('Tas Ransel Navy Eiger', 'Tas', 'Perpustakaan Lt. 2', 'Dicari', 'https://picsum.photos/seed/tas/200', 'Admin Perpus');
