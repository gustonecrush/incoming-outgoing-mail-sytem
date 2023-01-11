import axios from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import BtnEditDataArsip from './BtnEditDataArsip'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BtnEditData from './BtnEditData'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import ReactPaginate from 'react-paginate'

function Table({ data, fetchSurat, active, api, id, total }) {
    const [keyword, setKeyword] = useState('')
    const [activePage, setActivePage] = useState(1)
    const [blog, setBlogs] = useState([])

    const sweetConfirm = async (title, message, callback) => {
        Swal.fire({
            title: title,
            text: message,
            icon: 'warning',
            showCancelButton: true,
        }).then(confirmed => {
            callback(confirmed && confirmed.value == true)
        })
    }

    const createPDF = () => {
        const pdf = new jsPDF({
            orientation: 'landscape',
        })
        pdf.text(active, 10, 10)
        pdf.autoTable({ html: '#table' })
        pdf.save('data.pdf')
    }

    const onDelete = (e, id) => {
        e.preventDefault()
        console.log(id)
        sweetConfirm(
            'Konfirmasi',
            'Anda yakin ingin menghapus?',
            async confirmed => {
                if (confirmed) {
                    try {
                        const { data } = await axios.delete(
                            `http://localhost:8000/api/${api}/${id}`,
                        )
                        console.log(data)
                        fetchSurat()
                        Swal.fire({
                            title: 'Success!',
                            text: 'Berhasil menghapus surat',
                            icon: 'success',
                            confirmButtonText: 'Oke',
                        })
                    } catch (error) {
                        console.log(error.message)
                    }
                }
            },
        )
    }

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/${api}?page=${activePage}`,
            )
            setBlogs(data.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    const handlePageClick = async data => {
        let currentPage = data.selected + 1
        const url = `http://localhost:8000/api/${api}?page=${currentPage}`
        const response = await axios.get(url)
        console.log('response', response.data.data)
        setBlogs(response.data.data)
    }

    console.log(blog)

    return (
        <div className="border-black border-2 py-10 px-8 mt-10 rounded-lg bg-green-200">
            {/* Heading Text */}
            <p className="font-bold text-3xl text-center w-full border-b-2 border-b-black pb-5">
                Data {active}
            </p>

            {/* Header Menu */}
            <div className="flex justify-between mt-5">
                <div className="buttons flex">
                    <button
                        onClick={e => createPDF()}
                        className="pr-7 pl-8 self-end shadow text-white font-bold text-lg bg-blue-500  hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500  rounded-lg py-2.5 text-center ">
                        PDF
                    </button>

                    {/* <button className="ml-5 pr-7 pl-8 self-end shadow text-white font-bold text-lg bg-blue-500  hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500  rounded-lg py-2.5 text-center ">
                                    Tampilkan 5 Baris
                                </button> */}
                </div>

                <div className="flex items-center">
                    <p className="font-bold text-xl mr-3">Search: </p>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        onChange={e => setKeyword(e.target.value)}
                        placeholder="Masukkan Keyword"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-3 pr-14"
                    />
                </div>
            </div>

            {/* Tables */}
            <div className="flex flex-col rounded-lg mt-5">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 rounded-lg">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 rounded-lg">
                        <div className="overflow-hidden">
                            <table
                                className="min-w-full border border-black text-center rounded-lg mt-5"
                                id={id}>
                                {active === 'Peminjaman Arsip' ? (
                                    <>
                                        <thead className="border-b border-black">
                                            <tr className="bg-white">
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    No
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    Checked
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    Nama Peminjam
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    Nomor Arsip
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    Kode Arsip
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    Tanggal Peminjaman
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    Tanggal Pengembalian
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r max-w-2xl border-black">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data
                                                .filter(value => {
                                                    if (keyword === '') {
                                                        return value
                                                    } else if (
                                                        value.nama_peminjam
                                                            .toLowerCase()
                                                            .includes(
                                                                keyword.toLowerCase(),
                                                            )
                                                    ) {
                                                        return value
                                                    } else if (
                                                        value.jenis_arsip
                                                            .toLowerCase()
                                                            .includes(
                                                                keyword.toLowerCase(),
                                                            )
                                                    ) {
                                                        return value
                                                    } else if (
                                                        value.kode_arsip
                                                            .toLowerCase()
                                                            .includes(
                                                                keyword.toLowerCase(),
                                                            )
                                                    ) {
                                                        return value
                                                    } else if (
                                                        value.tanggal_peminjaman
                                                            .toLowerCase()
                                                            .includes(
                                                                keyword.toLowerCase(),
                                                            )
                                                    ) {
                                                        return value
                                                    }
                                                })
                                                .map((item, index) => (
                                                    <tr
                                                        className="bg-white border-b border-black"
                                                        key={index + 1}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border-r border-black">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border-r border-black">
                                                            {item?.tanggal_pengembalian !==
                                                            null ? (
                                                                <CheckCircleIcon
                                                                    sx={{
                                                                        fontSize: 25,
                                                                    }}
                                                                />
                                                            ) : (
                                                                ''
                                                            )}
                                                        </td>
                                                        <td className="text-lg text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r border-black">
                                                            {
                                                                item?.nama_peminjam
                                                            }
                                                        </td>
                                                        <td className="text-lg text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r border-black">
                                                            {item?.jenis_arsip}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border-r border-black">
                                                            {item?.kode_arsip}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border-r border-black">
                                                            {
                                                                item?.tanggal_peminjaman
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border-r border-black">
                                                            {
                                                                item?.tanggal_pengembalian
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg max-w-2xl font-medium text-gray-900 border-r border-black">
                                                            <BtnEditDataArsip
                                                                item={item}
                                                                fetchSurat={
                                                                    fetchSurat
                                                                }
                                                                active={active}
                                                                api={api}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={e =>
                                                                    onDelete(
                                                                        e,
                                                                        item?.session_id,
                                                                    )
                                                                }
                                                                className="pr-7 pl-5 ml-4 self-end shadow text-white font-bold text-lg bg-red-500  hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-500  rounded-lg py-2.5 text-center ">
                                                                <DeleteOutlineIcon
                                                                    color={
                                                                        'white'
                                                                    }
                                                                    sx={{
                                                                        fontSize: 20,
                                                                    }}
                                                                />
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </>
                                ) : (
                                    <>
                                        <thead className="border-b border-black">
                                            <tr className="bg-white">
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    No
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    Tanggal Surat
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    Nomor Surat
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    {active === 'Surat Masuk'
                                                        ? 'Asal'
                                                        : 'Tujuan'}
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    Kode Klasifikasi
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    Perihal
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    Kode Filing
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    Ket
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r border-black">
                                                    Berkas
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-lg font-bold text-gray-900 px-6 py-4 border-r max-w-2xl border-black">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>

                                        {blog
                                            .filter(value => {
                                                if (keyword === '') {
                                                    return value
                                                } else if (
                                                    value.tanggal_surat
                                                        .toLowerCase()
                                                        .includes(
                                                            keyword.toLowerCase(),
                                                        )
                                                ) {
                                                    return value
                                                } else if (
                                                    value.asal
                                                        .toLowerCase()
                                                        .includes(
                                                            keyword.toLowerCase(),
                                                        )
                                                ) {
                                                    return value
                                                } else if (
                                                    value.perihal
                                                        .toLowerCase()
                                                        .includes(
                                                            keyword.toLowerCase(),
                                                        )
                                                ) {
                                                    return value
                                                } else if (
                                                    value.nomor_surat
                                                        .toLowerCase()
                                                        .includes(
                                                            keyword.toLowerCase(),
                                                        )
                                                ) {
                                                    return value
                                                }
                                            })
                                            .map((item, index) => (
                                                <tbody>
                                                    <tr
                                                        className="bg-white border-b border-black"
                                                        key={index + 1}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border-r border-black">
                                                            {index + 1}
                                                        </td>
                                                        <td className="text-lg text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r border-black">
                                                            {
                                                                item?.tanggal_surat
                                                            }
                                                        </td>
                                                        <td className="text-lg text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r border-black">
                                                            {item?.nomor_surat}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border-r border-black">
                                                            {item?.asal}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border-r border-black">
                                                            {
                                                                item?.kode_klasifikasi
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border-r border-black">
                                                            {item?.perihal}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border-r border-black">
                                                            {item?.kode_filling}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border-r border-black">
                                                            {item?.keterangan}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 border-r border-black">
                                                            <a
                                                                href={
                                                                    api ==
                                                                    'surat-masuk'
                                                                        ? `http://localhost:8000/api/surat-masuk/download/${item?.session_id}`
                                                                        : `http://localhost:8000/api/surat-keluar/download/${item?.session_id}`
                                                                }>
                                                                {
                                                                    item?.original_name_dokumen
                                                                }
                                                            </a>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg max-w-2xl font-medium text-gray-900 border-r border-black">
                                                            <BtnEditData
                                                                item={item}
                                                                fetchSurat={
                                                                    fetchSurat
                                                                }
                                                                active={active}
                                                                api={api}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={e =>
                                                                    onDelete(
                                                                        e,
                                                                        item?.session_id,
                                                                    )
                                                                }
                                                                className="pr-7 pl-5 ml-4 self-end shadow text-white font-bold text-lg bg-red-500  hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-500  rounded-lg py-2.5 text-center ">
                                                                <DeleteOutlineIcon
                                                                    color={
                                                                        'white'
                                                                    }
                                                                    sx={{
                                                                        fontSize: 20,
                                                                    }}
                                                                />
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ))}
                                    </>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={total / 5}
                marginPagesDisplayed={3}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={
                    'isolate inline-flex -space-x-px rounded-md shadow-sm mt-4 self-end'
                }
                pageClassName={'page-item'}
                pageLinkClassName={
                    'relative inline-flex px-4 items-center border border-gray-300 bg-white px-4 py-2 text-lg text-gray-600 hover:bg-gray-50 focus:z-20'
                }
                previousClassName={'page-item'}
                previousLinkClassName={
                    'relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-lg font-medium text-black hover:bg-gray-50 focus:z-20'
                }
                nextClassName={'page-item'}
                nextLinkClassName={
                    'relative z-10 inline-flex px-4 py-2  items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-lg font-medium text-black hover:bg-gray-50 focus:z-20'
                }
                breakLinkClassName={
                    'relative  inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-lg font-medium text-black'
                }
                breakClassName={
                    'relative z-10 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-lg font-medium text-black'
                }
                activeClassName={
                    'relative z-10 inline-flex items-center text-lg font-bold text-black focus:z-20'
                }
            />
        </div>
    )
}

export default Table
