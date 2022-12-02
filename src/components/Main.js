import React, { useState } from 'react'
import BtnTambahData from './Dashboard/BtnTambahData'
import BtnTambahDataArsip from './Dashboard/BtnTambahDataArsip'
import BtnTambahDataKeluar from './Dashboard/BtnTambahDataKeluar'
import Header from './Dashboard/Header'
import Table from './Dashboard/Table'
import Footer from './Footer'

function Main({ surat = [], fetchSurat = null, active = '', api = '', total = 0 }) {
    return (
        <div className="w-9/12 h-full">
            <Header />

            {active == 'Tentang' ? (
                <div className="p-20">
                    <p className="text-5xl font-bold text-center mb-12">
                        Balai Monitor Spektrum Frekuensi Radio Kelas I Palembang
                    </p>
                    <div className="text-lg">
                        <p className="text-justify mb-10">
                            Tugas Balai Monitor Spektrum Frekuensi Radio Kelas I
                            Palembang sesuai dengan Peraturan Menteri Komunikasi
                            dan Informatika Nomor 15 Tahun 2017 adalah
                            melaksanakan pengawasan dan pengendalian di bidang
                            penggunaan spektrum frekuensi radio yang meliputi
                            kegiatan pengamatan, deteksi sumber pancaran,
                            monitoring, penertiban, evaluasi dan pengujian
                            ilmiah, pengukuran, koordinasi monitoring frekuensi
                            radio, penyusunan rencana dan program, penyediaan
                            suku cadang, pemeliharaan dan perbaikan perangkat,
                            serta urusan ketatausahaan dan kerumahtanggaan.
                        </p>
                        <p className="">Fungsi :</p>
                        <ol className="mb-10 list-item">
                            <li>
                                1. Penyusunan rencana dan program, penyediaan
                                suku cadang, pemeliharaan perangkat/ peralatan
                                monitor spektrum frekuensi radio;
                            </li>
                            <li>
                                2. Melaksanakan pengamatan, deteksi lokasi
                                sumber pancaran, pemantauan/ monitor spektrum
                                frekuensi radio;
                            </li>
                            <li>
                                3. Melaksanakan kalibrasi dan perbaikan
                                perangkat monitor spektrum frekuensi radio;
                            </li>
                            <li>
                                4. Melaksanakan urusan tata usaha dan rumah
                                tangga Unit Pelaksana Teknis (UPT) monitor
                                spektrum frekuensi radio;
                            </li>
                            <li>
                                5. Koordinasi monitoring spektrum frekuensi
                                radio;
                            </li>
                            <li>
                                6. Penertiban dan penyidikan pelanggaran
                                terhadap penggunaan spektrum frekuensi radio;
                            </li>
                            <li>
                                7. Pelayanan/pengaduan masyarakat terhadap
                                gangguan spektrum frekuensi radio; dan
                            </li>
                            <li>
                                8. Melaksanakan evaluasi dan pengujian ilmiah
                                serta pengukuran spektrum frekuensi radio.
                            </li>
                        </ol>

                        <p className="mt-5">
                            Kegunaan SI SUKA (Sistem Informasi Surat Masuk dan
                            Surat Keluar) :
                        </p>
                        <ol>
                            <li>
                                1. Pencarian surat jauh lebih mudah dan cepat
                            </li>
                            <li>
                                2. Akses surat akan terjaga karena ada
                                pengaturan akses
                            </li>
                            <li>3. Data surat akan tersimpan dengan baik</li>
                        </ol>
                    </div>
                </div>
            ) : (
                <div
                    className={`p-20 ${
                        surat.length >= 1 ? 'h-auto' : 'h-screen'
                    }`}>
                    {active === 'Peminjaman Arsip' ? (
                        <BtnTambahDataArsip
                            fetchSurat={fetchSurat}
                            active={active}
                            api={api}
                        />
                    ) : (
                        <BtnTambahData
                            fetchSurat={fetchSurat}
                            active={active}
                            api={api}
                        />
                    )}

                    <Table
                        data={surat}
                        fetchSurat={fetchSurat}
                        active={active}
                        api={api}
                        id={'table'}
                        total={total}
                    />
                </div>
            )}

            <Footer />
        </div>
    )
}

export default Main
