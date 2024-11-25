"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

  if (user) {
    router.push("/");
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }
    const result = await signIn("credentials", {
      email: email.toLowerCase(),
      password,
      redirect: false,
    });
    if (result?.error && result.error != undefined) {
      setError(result.error);
    } else {
      router.push("/");
      toast.success("Logged in successfully");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex min-h-screen items-center justify-center">
      <div className="dark:bg-gray-800 w-full max-w-md bg-white p-8 shadow-lg">
        <h2 className="text-gray-700 text-center text-2xl font-semibold dark:text-white">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="username"
              className="text-gray-700 dark:text-gray-300 block text-sm font-medium"
            >
              Email
            </label>
            <input
              id="username"
              name="username"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 dark:bg-gray-700 dark:border-gray-600 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-gray-700 dark:text-gray-300 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300 dark:bg-gray-700 dark:border-gray-600 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:text-white sm:text-sm"
            />
          </div>

          {error && <p className="mt-2 font-semibold text-red">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="hover:bg-primary-dark flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
