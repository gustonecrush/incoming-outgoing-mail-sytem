import Body from '@/components/Body'
import Header from '@/components/Dashboard/Header'
import SDPPILogo from '@/components/Dashboard/SDPPILogo'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'

const Dashboard = () => {
    
    return (
        <AppLayout>
            {/* Head */}
            <Head>
                <title>Tentang - Dashboard</title>
            </Head>

            {/*  Body */}
           <Body active="Tentang" />
        </AppLayout>
    )
}

export default Dashboard
