import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'

const AppLayout = ({ header = "", children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="min-h-screen bg-blue-200">
            {/* <Navigation user={user} /> */}

            {/* Page Heading */}
            {/* <header className="bg-white shadow">
                <div className="font-poppins max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header> */}

            {/* Page Content */}
            <main className="">{children}</main>
        </div>
    )
}

export default AppLayout
