import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

import { useAuth } from "../contexts/AuthContext.jsx";

export default function Login() {
	const navigate = useNavigate();
	const { loggedIn } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			if (data.token) {
				loggedIn(data.token, data.type);
				const path = data.type.toLowerCase();
				navigate(`/app/${path}/dashboard`);
				toast.success(data.message || "SignIn Success");
			} else {
				toast.error(data.message || "SignIn Failed");
			}
			console.log(data);
		} catch (error) {
			toast.error("Something Went Wrong");
			console.log(error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center space-y-2">
					<h1 className="text-4xl font-bold tracking-tight hover:text-gray-700 transition-colors">
						<a href="/app">CampusSync</a>
					</h1>
					<p className="text-muted-foreground font-semibold">
						Enter Your Credentials to Sign In
					</p>
				</div>

				<div className="bg-card p-8 rounded-lg shadow-lg border">
					<form
						onSubmit={handleSubmit}
						className="space-y-6">
						<div className="space-y-2">
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Email"
									className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
								<input
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Password"
									className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									required
								/>
							</div>
						</div>

						<button
							type="submit"
							className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors">
							<LogIn className="h-5 w-5" />
							Sign In
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-muted-foreground font-semibold">
							Don&apos;t have an Account?{" "}
							<Link
								to="/app/home/register"
								className="text-primary hover:underline font-medium">
								Sign Up
							</Link>
						</p>
					</div>
					<div className="mt-3 text-center">
						<p className="text-sm text-muted-foreground font-semibold">
							Become a Sponsor?{" "}
							<Link
								to="/app/home/sponsor"
								className="text-primary hover:underline font-medium">
								Apply Now
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
