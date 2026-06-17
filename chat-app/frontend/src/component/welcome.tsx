import LoginForm from "../pages/loginPage";

export default function Welcome(){
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full">
            {/* Left side: Hero Section */}
            <section className="hidden md:flex flex-col justify-center items-center bg-zinc-900 text-white p-12 text-center">
                <h1 className="text-5xl font-extrabold mb-6">Welcome Back</h1>
                <p className="text-zinc-400 text-lg max-w-sm">
                    Join us today to get started with your new account and connect with the community.
                </p>
            </section>

            {/* Right side: Login Form */}
            <section className="flex flex-col justify-center items-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <LoginForm />
                </div>
            </section>
        </div>
    )
}