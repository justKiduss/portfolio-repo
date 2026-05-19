import LoginForm from "../pages/loginPage";

export default function Welcome(){
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full">
            <section className="flex flex-col justify-center bg-gray-500 text-white p-8 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome page</h1>
                <p className="text-gray-600 max-w-sm">
                    Join us today to get started with your new account.
                </p>
            </section>
            <section className="">
                <LoginForm/>
            </section>
        </div>
    )
}