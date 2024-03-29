import React, { useEffect, useState } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import Swal from 'sweetalert2'
import axios from '@/lib/axios'

function BtnEditData({ item, fetchSurat, active, api }) {
    const [isOpen, setIsOpen] = useState(false)

    const [tanggalSurat, setTanggalSurat] = useState(item?.tanggal_surat)
    const [nomorSurat, setNomorSurat] = useState(item?.nomor_surat)
    const [asal, setAsal] = useState(item?.asal)
    const [tujuan, setTujuan] = useState(item?.asal)
    const [kodeKlasifikasi, setKodeKlasifikasi] = useState(
        item?.kode_klasifikasi,
    )
    const [perihal, setPerihal] = useState(item?.perihal)
    const [kodeFilling, setKodeFilling] = useState(item?.kode_filling)
    const [keterangan, setKeterangan] = useState(item?.keterangan)
    const [dokumen, setDokumen] = useState(item?.dokumen)
    const [errors, setErrors] = useState(null)

    const submitForm = e => {
        e.preventDefault()

        const surat = new FormData()
        surat.append('tanggal_surat', tanggalSurat)
        surat.append('nomor_surat', nomorSurat)
        if (active == 'Surat Masuk') {
            surat.append('asal', asal)
        } else {
            surat.append('tujuan', tujuan)
        }
        surat.append('kode_klasifikasi', kodeKlasifikasi)
        surat.append('perihal', perihal)
        surat.append('kode_filling', kodeFilling)
        surat.append('keterangan', keterangan)
        surat.append('dokumen', dokumen)

        axios
            .post(
                `http://localhost:8000/api/${api}/${item?.session_id}`,
                surat,
                {
                    csrf_token: { csrfToken: `{{ csrf_token() }}` },
                },
            )
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
            title: 'Berhasil mengupdate data surat keluar!',
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
                    tabIndex="-1"
                    className="font-poppins text-left overflow-y-auto flex items-center justify-center overflow-x-hidden top-0 right-0 left-0 fixed z-50 w-full md:inset-0 h-modal md:h-full"
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
                                    className="space-y-6 mt-5 relative flex flex-col"
                                    action="">
                                    <div>
                                        <label
                                            for="username"
                                            className="block mb-2 text-lg font-medium text-black">
                                            Tanggal Surat
                                        </label>
                                        <input
                                            autoFocus
                                            type="date"
                                            name="tanggal_surat"
                                            id="tanggal_surat"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Masukkan Tanggal Surat"
                                            required
                                            onChange={e =>
                                                setTanggalSurat(e.target.value)
                                            }
                                            value={tanggalSurat}
                                        />
                                        {/* <InputError
                                            messages={errors.tanggalSurat}
                                            className="mt-2"
                                        /> */}
                                    </div>

                                    <div>
                                        <label
                                            for="nomor_surat"
                                            className="block mb-2 text-lg font-medium text-black">
                                            Nomor Surat
                                        </label>
                                        <input
                                            type="text"
                                            name="nomor_surat"
                                            id="nomor_surat"
                                            placeholder="Masukkan Nomor Surat"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                            onChange={e =>
                                                setNomorSurat(e.target.value)
                                            }
                                            value={nomorSurat}
                                        />
                                        {/* <InputError
                                            messages={errors.nomor_surat}
                                            className="mt-2"
                                        /> */}
                                    </div>

                                    <div>
                                        <label
                                            for="asal"
                                            className="block mb-2 text-lg font-medium text-black">
                                            {active == 'Surat Masuk'
                                                ? 'Asal'
                                                : 'Tujuan'}
                                        </label>
                                        {active === 'Surat Masuk' ? (
                                            <input
                                                type="text"
                                                name="asal"
                                                id="asal"
                                                placeholder={`Masukkan Asal`}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                required
                                                onChange={e =>
                                                    setAsal(e.target.value)
                                                }
                                                value={asal}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                name="tujuan"
                                                id="tujuan"
                                                placeholder={`Masukkan Tujuan`}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                required
                                                onChange={e =>
                                                    setTujuan(e.target.value)
                                                }
                                                value={tujuan}
                                            />
                                        )}

                                        {/* <InputError
                                            messages={errors.asal}
                                            className="mt-2"
                                        /> */}
                                    </div>
                                    <div>
                                        <label
                                            for="kode_klasifikasi"
                                            className="block mb-2 text-lg font-medium text-black">
                                            Kode Klasifikasi
                                        </label>
                                        <input
                                            type="text"
                                            name="kode_klasifikasi"
                                            id="kode_klasifikasi"
                                            placeholder="Masukkan Kode Klasifikasi"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                            onChange={e =>
                                                setKodeKlasifikasi(
                                                    e.target.value,
                                                )
                                            }
                                            value={kodeKlasifikasi}
                                        />
                                        {/* <InputError
                                            messages={errors.kode_klasifikasi}
                                            className="mt-2"
                                        /> */}
                                    </div>
                                    <div>
                                        <label
                                            for="perihal"
                                            className="block mb-2 text-lg font-medium text-black">
                                            Perihal
                                        </label>
                                        <input
                                            type="text"
                                            name="perihal"
                                            id="perihal"
                                            placeholder="Masukkan Perihal"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                            onChange={e =>
                                                setPerihal(e.target.value)
                                            }
                                            value={perihal}
                                        />
                                        {/* <InputError
                                            messages={errors.perihal}
                                            className="mt-2"
                                        /> */}
                                    </div>
                                    <div>
                                        <label
                                            for="kode_filling"
                                            className="block mb-2 text-lg font-medium text-black">
                                            Kode Filling
                                        </label>
                                        <input
                                            type="text"
                                            name="kode_filling"
                                            id="kode_filling"
                                            placeholder="Masukkan Kode Filling"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                            onChange={e =>
                                                setKodeFilling(e.target.value)
                                            }
                                            value={kodeFilling}
                                        />
                                        {/* <InputError
                                            messages={errors.kode_filling}
                                            className="mt-2"
                                        /> */}
                                    </div>
                                    <div>
                                        <label
                                            for="keterangan"
                                            className="block mb-2 text-lg font-medium text-black">
                                            Keterangan
                                        </label>
                                        <div class="flex">
                                            <input
                                                type="radio"
                                                name="keterangan"
                                                id="keterangan"
                                                placeholder="Masukkan Keterangan"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                required
                                                value="Asli"
                                                onChange={e =>
                                                    setKeterangan(
                                                        e.target.value,
                                                    )
                                                }
                                                checked={
                                                    keterangan === 'Asli'
                                                        ? "checked"
                                                        : false
                                                }
                                            />
                                            &nbsp;&nbsp;&nbsp;Asli
                                            <input
                                                type="radio"
                                                name="keterangan"
                                                id="keterangan"
                                                placeholder="Masukkan Keterangan"
                                                className="bg-gray-50 border ml-4 border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                required
                                                value="Copy"
                                                onChange={e =>
                                                    setKeterangan(
                                                        e.target.value,
                                                    )
                                                }
                                                checked={
                                                    keterangan === 'Copy'
                                                        ? "checked"
                                                        : false
                                                }
                                            />
                                            &nbsp;&nbsp;&nbsp;Copy
                                        </div>

                                        {/* <InputError
                                            messages={errors.keterangan}
                                            className="mt-2"
                                        /> */}
                                    </div>

                                    {/* <div className=""> */}
                                        {/* <label
                                            for="dokumen"
                                            className="block mb-2 text-lg font-medium text-black">
                                            Upload Berkas
                                        </label>
                                        <input
                                            type="file"
                                            name="dokumen"
                                            id="dokumen"
                                            placeholder="Masukkan Kode Filling"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                            // value={dokumen !== null ? 'http://localhost:8000/storage/' + dokumen : dokumen}
                                            onChange={e =>
                                                setDokumen(e.target.files[0])
                                            }
                                        />
                                        <p className="text-sm text-red-600 mt-3">
                                            *format dokumen pdf
                                        </p> */}
                                        {/* <InputError
                                            messages={errors.dokumen}
                                            className="mt-2"
                                        /> */}
                                    {/* </div> */}

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

export default BtnEditData
