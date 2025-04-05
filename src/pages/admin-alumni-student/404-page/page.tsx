import { Link } from "react-router-dom";

function Page404() {
    return (
        <>
            <main className="flex justify-center items-center min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-xl font-semibold text-[#95323d]">404</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to="/dashboard">
                        <a href="#" className=" flex items-center bg-[#95323d] text-white hover:bg-[#c04757] font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02] ">
                            Go back home
                        </a>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );

}
export default Page404;
