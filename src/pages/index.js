import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import bgbalmonhd from '../../public/assets/bgbalmonhd.png'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import InputError from '@/components/InputError'
import Swal from 'sweetalert2'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    const router = useRouter()
    const [loginModalActive, setLoginModalActive] = useState(false)

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            username,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })

        // if (errors !== null) {
        //     const Toast = Swal.mixin({
        //         toast: true,
        //         position: 'top-end',
        //         showConfirmButton: false,
        //         timer: 3000,
        //         timerProgressBar: true,
        //         didOpen: toast => {
        //             toast.addEventListener('mouseenter', Swal.stopTimer)
        //             toast.addEventListener('mouseleave', Swal.resumeTimer)
        //         },
        //     })

        //     Toast.fire({
        //         icon: 'error',
        //         title: 'Username atau Password anda salah!',
        //     })

        //     setUsername('')
        //     setPassword('')
        // } else {
        //     const Toast = Swal.mixin({
        //         toast: true,
        //         position: 'top-end',
        //         showConfirmButton: false,
        //         timer: 3000,
        //         timerProgressBar: true,
        //         didOpen: toast => {
        //             toast.addEventListener('mouseenter', Swal.stopTimer)
        //             toast.addEventListener('mouseleave', Swal.resumeTimer)
        //         },
        //     })

        //     Toast.fire({
        //         icon: 'success',
        //         title: 'Berhasil Login!',
        //     })
        // }
    }

    // console.log(errors == null)

    // const Toast = Swal.mixin({
    //     toast: true,
    //     position: 'top-end',
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //     didOpen: toast => {
    //         toast.addEventListener('mouseenter', Swal.stopTimer)
    //         toast.addEventListener('mouseleave', Swal.resumeTimer)
    //     },
    // })

    //     Toast.fire({
    //         icon: 'success',
    //         title: 'Berhasil Login!',
    //     })

    return (
        <>
            <Head>
                <title>SISUKA BALMON</title>
            </Head>

            <div
                style={{
                    backgroundImage: `url('${bgbalmonhd}') !important`,
                    backgroundSize: 'cover',
                    width: '100%',
                    height: '100%',
                }}
                className="font-poppins relative flex flex-col items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
                <Image
                    width={2746} //use the width of the image being used
                    height={4681} //use the height of the image being used
                    layout="fill"
                    alt="Background BALMON"
                    src="/assets/bgbalmonhd.png" //image saved in public/home
                />

                <div className="max-w-3xl mx-auto top-0 sm:px-6 lg:px-8 z-20 flex flex-col items-center justify-center">
                    <Image
                        className="inline-block mb-5"
                        width={300} //use the width of the image being used
                        height={170} //use the height of the image being used
                        alt="SiSuka Logo"
                        src="/assets/sisukawhite.png" //image saved in public/home
                    />
                    <p className="text-white text-2xl font-bold text-center">
                        Sistem Informasi Surat Masuk dan Surat Keluar
                        Kemenkominfo Ditjen SDPPI Balai Monitor Spektrum
                        Frekuensi Radio Kelas I Palembang
                    </p>
                    <button
                        type="button"
                        onClick={() => setLoginModalActive(!loginModalActive)}
                        className="mt-10 text-white font-bold text-lg inline-block py-3 px-6 bg-orange-600 w-auto rounded-lg">
                        Login
                    </button>
                </div>

                <div className=" mx-auto top-0 sm:px-6 lg:px-8 z-50 flex mt-12 flex-row items-center justify-between ">
                    <div className="max-w-lg h-56 bg-green-600 text-white px-10 pt-7 pb-8 rounded-lg">
                        <p className="font-bold text-center mb-3 text-xl">
                            TENTANG BALMON PALEMBANG
                        </p>
                        <hr />
                        <p className="mt-3">
                            Alamat: JL. Macan Kumbang Raya No. 50, Siring Agung,
                            Kec. Ilir Barat I, Kota Palembang, Sumatera Selatan
                            30137
                        </p>
                        <div className="flex flex-row justify-between mt-5">
                            <a
                                href="mailto:upt-plg@postel.go.id"
                                target={'_blank'}>
                                Email: upt-plg@postel.go.id
                            </a>
                            <a href="">Kontak: (0711) 444423</a>
                        </div>
                    </div>
                    <div className="max-w-lg h-56 bg-blue-600 ml-10 text-white px-10 pt-7 pb-8 rounded-lg">
                        <p className="font-bold text-center mb-3 text-xl ">
                            MANFAAT
                        </p>
                        <hr />
                        <p className="mt-12 text-center">
                            Memudahkan Petugas Untuk Mencari Berkas Yang Akan
                            Dicari
                        </p>
                    </div>
                </div>
            </div>

            {loginModalActive && (
                <div
                    tabIndex="-1"
                    className="font-poppins overflow-y-auto flex items-center justify-center overflow-x-hidden top-0 right-0 left-0 fixed z-50 w-full md:inset-0 h-modal md:h-full"
                    style={{
                        background: 'rgba(0,0,0,0.6)',
                    }}>
                    <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                        <div className="relative bg-blue-200 rounded-lg shadow">
                            <div className="py-6 px-6 lg:px-8 relative">
                                <div className="flex flex-row justify-between items-center">
                                    <h3 className="mb-4 text-2xl font-medium text-black">
                                        Masuk Administrator
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setLoginModalActive(
                                                !loginModalActive,
                                            )
                                        }
                                        className="-mt-4 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </div>
                                <hr className="border-black" />
                                <form
                                    onSubmit={submitForm}
                                    className="space-y-6 mt-5 relative flex flex-col"
                                    action="#"
                                    autoComplete='off'
                                    >
                                    <div>
                                        <label
                                            className="block mb-2 text-lg font-medium text-black">
                                            Username
                                        </label>
                                        <input
                                            onChange={event =>
                                                setUsername(event.target.value)
                                            }
                                            value={username}
                                            autoFocus
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Masukkan Username"
                                            required
                                        />
                                        {/* <InputError
                                            messages={errors.username}
                                            className="mt-2"
                                        /> */}
                                    </div>

                                    <div>
                                        <label
                                            className="block mb-2 text-lg font-medium text-black">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            onChange={event =>
                                                setPassword(event.target.value)
                                            }
                                            value={password}
                                            placeholder="Masukkan Password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                        />
                                        {/* <InputError
                                            messages={errors.password}
                                            className="mt-2"
                                        /> */}
                                    </div>

                                    <button
                                        type="submit"
                                        className=" self-end  text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center ">
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
