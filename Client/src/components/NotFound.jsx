import {Link} from 'react-router-dom'
export const NotFound = () => {
    return (
        <div className="min-h-screen flex-col flex items-center justify-center gap-2">
            <h1 className="text-6xl font-bold text-blue-600 ">404</h1>
            <p className="text-gray-500 text-3xl">Page not found</p>
            <Link to="/" className="text-xl text-blue-600 hover:underline transition-all duration-300">Return Home</Link>
        </div>
    )
}