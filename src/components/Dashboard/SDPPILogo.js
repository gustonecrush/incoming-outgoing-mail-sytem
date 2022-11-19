import Image from 'next/image'
import React from 'react'

function SDPPILogo() {
    return (
        <div className="h-[138px] -mt-0.5 flex items-center pl-4">
            <Image
                className="block"
                width={1220} //use the width of the image being used
                height={250} //use the height of the image being used
                alt="SiSuka Logo"
                src="/assets/SDPII.png"
            /> 
        </div>
    )
}

export default SDPPILogo
