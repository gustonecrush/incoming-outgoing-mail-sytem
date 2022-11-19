import InfoIcon from '@mui/icons-material/Info'
import ArchiveIcon from '@mui/icons-material/Archive'
import EmailIcon from '@mui/icons-material/Email'
import DraftsIcon from '@mui/icons-material/Drafts'
import AllInboxIcon from '@mui/icons-material/AllInbox'
import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import SDPPILogo from './Dashboard/SDPPILogo'

const menuArsip = [
    {
        id: 1,
        name: 'Surat Masuk',
        link: '/surat-masuk',
        component: <EmailIcon color="#ffffff" sx={{ fontSize: 30 }} />,
    },
    {
        id: 2,
        name: 'Surat Keluar',
        link: '/surat-keluar',
        component: <DraftsIcon color="#ffffff" sx={{ fontSize: 30 }} />,
    },
    {
        id: 3,
        name: 'Peminjaman Arsip',
        link: '/peminjaman-arsip',
        component: <AllInboxIcon color="#ffffff" sx={{ fontSize: 30 }} />,
    },
]

function Sidebar({ active }) {
    const [hide, setHide] = useState(true)

    return (
        <div className="w-3/12 border-r-black border-r-2">
            <SDPPILogo />
            <div
                className={`flex items-center py-4 px-4 border-t-2 ${
                    active == 'Tentang' ? 'bg-blue-300' : ''
                } border-b-2 hover:bg-blue-400 hover:cursor-pointer border-black border-solid`}>
                <div className="rounded-full w-12 h-12 z-10 bg-white border-black border-solid border-2 flex items-center justify-center">
                    <InfoIcon sx={{ fontSize: 30 }} />
                </div>
                <a href="/dashboard" className="font-bold text-lg ml-3">
                    Tentang
                </a>
            </div>

            <div className="flex justify-between items-center shadow bg-green-300 py-4 px-4 border-l-2 border-t-2 border-b-2 border-r-2 border-black border-solid m-5 rounded-lg">
                <div className="flex items-center">
                    <div className="rounded-full w-12 h-12 z-10 bg-white border-black border-solid border-2 flex items-center justify-center">
                        <ArchiveIcon sx={{ fontSize: 30 }} />
                    </div>

                    <p className="font-bold text-lg ml-3">Arsip</p>
                </div>

                {hide ? (
                    <button
                        onClick={e => setHide(false)}
                        className="outline-none border-none rounded-full font-extrabold text-2xl">
                        <ArrowDropUpIcon color="black" sx={{ fontSize: 50 }} />
                    </button>
                ) : (
                    <button
                        onClick={e => setHide(true)}
                        className="outline-none border-none rounded-full font-extrabold text-2xl">
                        <ArrowDropDownIcon
                            color="black"
                            sx={{ fontSize: 50 }}
                        />
                    </button>
                )}
            </div>

            {/* Menu Arsip */}
            {hide &&
                menuArsip.map(item => (
                    <div
                        key={item?.id}
                        className={`flex items-center hover:bg-blue-400 hover:border-black hover:border-2 transition-all hover:cursor-pointer py-3 px-4 mx-9 rounded-lg ${
                            active === item?.name
                                ? 'bg-blue-300 shadow border-black border-2'
                                : ''
                        }`}>
                        <div className="rounded-full w-12 h-12 z-10 bg-white border-black border-solid border-2 flex items-center justify-center">
                            {item.component}
                        </div>

                        <a href={item.link} className="font-bold text-lg ml-3">
                            {item.name}
                        </a>
                    </div>
                ))}
        </div>
    )
}

export default Sidebar
