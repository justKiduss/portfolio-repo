export default function SignUpForm(){
    return(
        <>
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="w-96 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-2">Create your account</h2>
                    <p>Enter your details below to sign up </p>

                    <div className="flex flex-col gap-2 mb-4">
                        <label className="text-sm font-medium">Username</label>
                        <input type="text" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    <div className="flex flex-col gap-2 mb-2">
                        <label className="text-sm font-medium">Email</label>
                        <input type="email" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    <div className="flex flex-col gap-2 mb-2">
                        <label className="text-sm font-medium">Password</label>
                        <input type="password" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    <button className="w-full bg-black text-white py-2 rounded mt-4"> Sign Up</button>
                    <p className="text-sm text-center my-4">Already have an account? {" "} 
                        <a href="/login" className="text-blue-500 hover:underline">Login</a>
                    </p>
                </div>
                
            </div>
        </>
    )
} 