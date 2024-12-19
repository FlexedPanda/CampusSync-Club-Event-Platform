import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import {
	IdCard,
	Building2,
	Phone,
	Mail,
	Lock,
	Tag,
	ClipboardCheck,
} from "lucide-react";

export default function Sponsor() {
	const navigate = useNavigate();
	const [events, setEvents] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		company: "",
		event: "",
		phone: "",
		email: "",
		password: "",
	});

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/event/list`, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				});

				const data = await res.json();
				if (data.events) {
					setEvents(data.events);
				} else {
					toast.error(data.message || "Failed to Fetch Events");
				}
				console.log(data);
			} catch (error) {
				toast.error("Something Went Wrong");
				console.error(error);
			}
		};

		fetchEvents();
	}, []);

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/sponsor`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			if (data.redirect) {
				navigate("/app/home/login");
				toast.success(data.message || "Apply Success");
			} else {
				toast.error(data.message || "Apply Failed");
			}
			console.log(data);
		} catch (error) {
			toast.error("Something Went Wrong");
			console.error(error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center space-y-2">
					<h1 className="text-4xl font-bold tracking-tight">Sponsorship</h1>
					<p className="text-gray-500 font-semibold">
						Enter Your Details to Apply Now
					</p>
				</div>

				<div className="bg-white p-8 rounded-lg shadow-lg border">
					<form
						onSubmit={handleSubmit}
						className="space-y-4"
						encType="multipart/form-data">
						<div className="space-y-2">
							<div className="relative">
								<IdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Name"
									className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<div className="relative">
								<Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
								<input
									type="text"
									name="company"
									value={formData.company}
									onChange={handleChange}
									placeholder="Company"
									className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<div className="relative">
								<Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
								<select
									name="event"
									value={formData.event}
									onChange={handleChange}
									className={`w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
										formData.event ? "text-black" : "text-gray-400"
									}`}>
									<option value="">Event</option>
									{events.map((event) => (
										<option
											key={event._id}
											value={event._id}>
											{event.title}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="space-y-2">
							<div className="relative">
								<Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									placeholder="Phone"
									className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
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
								<Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
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
							<ClipboardCheck className="h-5 w-5" />
							Apply Now
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-500 font-semibold">
							Already a Sponsor?{" "}
							<Link
								to="/app/home/login"
								className="text-primary hover:underline font-medium">
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
