import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@/hooks/auth'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

function Header() {
    const router = useRouter()
    const { logout } = useAuth()

    return (
        <div className="border-b-2 h-[138px] flex items-center justify-between border-b-black m-0 p-0">
            <Image
                className="block -mt-5 p-0"
                width={270} //use the width of the image being used
                height={300} //use the height of the image being used
                alt="SiSuka Logo"
                src="/assets/logosisuka.png"
            />

            <div className="flex mr-12">
                <div className="rounded-full w-12 h-12 -mr-6 z-10 bg-white border-black border-solid border-2 flex items-center justify-center"><LogoutIcon  sx={{ fontSize: 25}} /></div>
                <button
                    onClick={logout}
                    className="pr-7 pl-8 self-end shadow text-black font-bold text-lg bg-yellow-300  hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300  rounded-lg py-2.5 text-center ">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Header
