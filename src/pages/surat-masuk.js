import AppLayout from '@/components/Layouts/AppLayout'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Head from 'next/head'
import Body from '@/components/Body'

function SuratMasuk() {

    // variable to store data surat masuk
    const [suratMasuk, setSuratMasuk] = useState([])
    const [total, setTotal] = useState()

    // function to fetch data surat masuk
    const fetchSuratMasuk = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/surat-masuk`,
            )
            setTotal(data.total)
            setSuratMasuk(data.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    // to effect the window with data surat masuk which fetched
    useEffect(() => {
        fetchSuratMasuk()
    }, [])

    return (
        <AppLayout>
            {/* Head */}
            <Head>
                <title>Surat Masuk - Dashboard</title>
            </Head>

            {/*  Body */}
            <Body
                surat={suratMasuk}
                total={total}
                fetchSurat={fetchSuratMasuk}
                active={'Surat Masuk'}
                api={'surat-masuk'}
            />
        </AppLayout>
    )
}

export default SuratMasuk
