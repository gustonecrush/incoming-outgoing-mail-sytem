import React, { useEffect, useState } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import Swal from 'sweetalert2'
import axios from '@/lib/axios'

function BtnEditDataArsip({ item, fetchSurat, active, api }) {
    const [isOpen, setIsOpen] = useState(false)

    const [namaPeminjam, setNamaPeminjam] = useState(item?.nama_peminjam)
    const [jenisArsip, setJenisArsip] = useState(item?.jenis_arsip)
    const [kodeArsip, setKodeArsip] = useState(item?.kode_arsip)
    const [tanggalPeminjaman, setTanggalPeminjaman] = useState(item?.tanggal_peminjaman)
    const [tanggalPengembalian, setTanggalPengembalian] = useState(item?.tanggal_pengembalian)
    const [errors, setErrors] = useState(null)

    const submitForm = e => {
        e.preventDefault()

        const arsip = new FormData()
        arsip.append('nama_peminjam', namaPeminjam)
        arsip.append('jenis_arsip', jenisArsip)
        arsip.append('kode_arsip', kodeArsip)
        arsip.append('tanggal_pengembalian', tanggalPengembalian)
        arsip.append('tanggal_peminjaman', tanggalPeminjaman)

        axios
            .post(`http://localhost:8000/api/${api}/${item?.session_id}`, arsip, {
                csrf_token: { csrfToken: `{{ csrf_token() }}` },
            })
            .then(res => {
                console.warn(res)
            })

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: toast => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
        })

        Toast.fire({
            icon: 'success',
            title: 'Berhasil mengupdate data arsip peminjaman!',
        })

        setIsOpen(!isOpen)

        fetchSurat()
    }

    useEffect(() => {
        fetchSurat()
    }, [])

    return (
        <>
            <button
                onClick={() => {
                    setIsOpen(true)
                }}
                className="pr-7 pl-5 self-end shadow text-white font-bold text-lg bg-yellow-300  hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300  rounded-lg py-2.5 text-center ">
                <ModeEditIcon color={'white'} sx={{ fontSize: 20 }} />
                Edit
            </button>

            {isOpen && (
                <div
                    tabindex="-1"
                    className="font-poppins overflow-y-auto flex items-center justify-center overflow-x-hidden top-0 right-0 left-0 fixed z-50 w-full md:inset-0 h-modal md:h-full"
                    style={{
                        background: 'rgba(0,0,0,0.6)',
                    }}>
                    <div className="relative p-4 w-full max-w-3xl mt-[170px]  h-full md:h-auto">
                        <div className="relative bg-green-200 rounded-lg shadow">
                            <div className="py-6 px-6 lg:px-8 relative">
                                <div class="flex flex-row  justify-between items-center">
                                    <h3 className="font-bold text-3xl ml-auto mb-5 pl-10 text-black text-center">
                                        Data {active}
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="-mt-4 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fill-rule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </button>
                                </div>
                                <hr className="border-black" />
                                <form
                                    method="post"
                                    onSubmit={submitForm}
                                    encType="multipart/form-data"
                                    className="space-y-6 mt-5 relative text-left flex flex-col"
                                    action="">
                                    <div>
                                        <label
                                            for="nama_peminjam"
                                            className="block mb-2 text-lg font-medium text-black">
                                            Nama Peminjam
                                        </label>
                                        <input
                                            autoFocus
                                            type="text"
                                            name="nama_peminjam"
                                            id="nama_peminjam"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Masukkan Nama Peminjam"
                                            required
                                            onChange={e =>
                                                setNamaPeminjam(e.target.value)
                                            }
                                            value={namaPeminjam}
                                        />
                                        {/* <InputError
                                            messages={errors.tanggalSurat}
                                            className="mt-2"
                                        /> */}
                                    </div>

                                    <div>
                                        <label
                                            for="jenis_arsip"
                                            className="block mb-2 text-lg font-medium text-black">
                                            Jenis Arsip
                                        </label>
                                        <input
                                            type="text"
                                            name="jenis_arsip"
                                            id="jenis_arsip"
                                            placeholder="Masukkan Jenis Arsip"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                            onChange={e =>
                                                setJenisArsip(e.target.value)
                                            }
                                            value={jenisArsip}
                                        />
                                        {/* <InputError
                                            messages={errors.nomor_surat}
                                            className="mt-2"
                                        /> */}
                                    </div>

                                    <div>
                                        <label
                                            for="kode_arsip"
                                            className="block mb-2 text-lg font-medium text-black">
                                            Kode Arsip
                                        </label>
                                        <input
                                            type="text"
                                            name="kode_arsip"
                                            id="kode_arsip"
                                            placeholder="Masukkan Kode Arsip"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                            onChange={e =>
                                                setKodeArsip(e.target.value)
                                            }
                                            value={kodeArsip}
                                        />
                                        {/* <InputError
                                            messages={errors.kode_klasifikasi}
                                            className="mt-2"
                                        /> */}
                                    </div>
                                    <div>
                                        <label
                                            for="tanggal_peminjaman"
                                            className="block mb-2 text-lg font-medium text-black">
                                            Tanggal Peminjaman
                                        </label>
                                        <input
                                            type="date"
                                            name="tanggal_peminjaman"
                                            id="tanggal_peminjaman"
                                            placeholder="Masukkan Perihal"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                            onChange={e =>
                                                setTanggalPeminjaman(
                                                    e.target.value,
                                                )
                                            }
                                            value={tanggalPeminjaman}
                                        />
                                        {/* <InputError
                                            messages={errors.perihal}
                                            className="mt-2"
                                        /> */}
                                    </div>
                                    <div>
                                        <label
                                            for="tanggal_pengembalian"
                                            className="block mb-2 text-lg font-medium text-black">
                                            Tanggal Pengembalian
                                        </label>
                                        <input
                                            type="date"
                                            name="tanggal_pengembalian"
                                            id="tanggal_pengembalian"
                                            placeholder="Masukkan Kode Filling"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                            onChange={e =>
                                                setTanggalPengembalian(
                                                    e.target.value,
                                                )
                                            }
                                            value={tanggalPengembalian}
                                        />
                                        {/* <InputError
                                            messages={errors.kode_filling}
                                            className="mt-2"
                                        /> */}
                                    </div>

                                    <hr className="border-black" />

                                    <div class="self-end flex">
                                        <button
                                            type="submit"
                                            onClick={() => setIsOpen(!isOpen)}
                                            className=" self-end  text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center ">
                                            Close
                                        </button>

                                        <button
                                            type="submit"
                                            className=" self-end ml-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-lg px-5 py-2.5 text-center ">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default BtnEditDataArsip
