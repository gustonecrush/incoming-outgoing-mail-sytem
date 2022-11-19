import React, { useState } from 'react'
import Main from './Main'
import Sidebar from './Sidebar'

function Body({ surat = [], fetchSurat = null, active = '', api = "" }) {
    return (
        <div className="font-poppins w-full flex h-full">
            {/* Sidebar */}
            <Sidebar active={active} />

            {/* Main */}
            <Main surat={surat} fetchSurat={fetchSurat} active={active} api={api} />
        </div>
    )
}

export default Body
