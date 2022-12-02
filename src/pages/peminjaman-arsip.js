import Body from '@/components/Body'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useState } from 'react'

function PeminjamanArsip() {
    // variable to store data peminjaman arip
    const [peminjamanSurat, setPeminjamanSurat] = useState([])
    const [total, setTotal] = useState()

    // function to fetch data peminjaman arip
    const fetchPeminjamanArsip = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/peminjaman-arsip`,
            )
            setTotal(data.total)
            setPeminjamanSurat(data.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchPeminjamanArsip()
    }, [])

    return (
        <AppLayout>
            {/* Head */}
            <Head>
                <title>Peminjaman Surat - Dashboard</title>
            </Head>

            {/*  Body */}
            <Body
                surat={peminjamanSurat}
                fetchSurat={fetchPeminjamanArsip}
                active={'Peminjaman Arsip'}
                api={"peminjaman-arsip"}
                total={total}
            />
        </AppLayout>
    )
}

export default PeminjamanArsip
