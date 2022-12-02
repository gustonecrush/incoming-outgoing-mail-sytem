import Body from '@/components/Body'
import AppLayout from '@/components/Layouts/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

function SuratKeluar() {
    // variable to store data surat keluar
    const [suratKeluar, setSuratKeluar] = useState([])
    const [total, setTotal] = useState()

    // function to fetch data surat keluar
    const fetchSuratKeluar = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/surat-keluar`,
            )
            setTotal(data.total)
            setSuratKeluar(data.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    // to effect the window with data surat keluar which fetched
    useEffect(() => {
        fetchSuratKeluar()
    }, [])

    return (
        <AppLayout>
            {/* Head */}
            <Head>
                <title>Surat Keluar - Dashboard</title>
            </Head>

            {/* Body */}
            <Body
                surat={suratKeluar}
                fetchSurat={fetchSuratKeluar}
                active={'Surat Keluar'}
                api={'surat-keluar'}
                total={total}
            />
        </AppLayout>
    )
}

export default SuratKeluar
