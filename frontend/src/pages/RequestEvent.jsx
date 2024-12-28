import { 
	Album, 
	ScrollText,
	MapPinned,
	CalendarFold,
	CircleFadingPlus,
	LoaderCircle,
} from "lucide-react";
import { 
	Card, 
	CardHeader, 
	CardContent, 
	CardFooter 
} from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

export default function RequestEvent() {
	const [loading, setLoading] = useState(true);
	const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState({
		title: "",
		description: "",
		venue: "",
		date: "",
	});

	useEffect(() => {
		async function fetchRequested() {
			try {
				const res = await axios.get("/event/check", {
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem("token"),
						type: localStorage.getItem("type"),
					},
				});

				if (res.data.requested || res.data.approved) {
					setDisabled(true);
				} else {
					setDisabled(false);
				}
				console.log(res.data);
			} catch (error) {
				toast.error(res.data.message || "Something Went Wrong");
				console.error(error);
				console.log(res.data);
			} finally {
				setLoading(false);
			}
		}

		fetchRequested();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[600px]">
				<div className="animate-spin text-muted-foreground">
					<LoaderCircle size={64} strokeWidth={1}/>
				</div>
			</div>
		);
	};

  const handleChange = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await axios.post("/event/request", form, {
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem("token"),
					type: localStorage.getItem("type"),
				},
			});

			if (res.data.request) {
				toast.success(res.data.message || "Requested Event Success");
				setForm({
					title: "",
					description: "",
					venue: "",
					date: "",
				});
				setDisabled(true);
			} else {
				toast.error(res.data.message || "Event Request Failed");
			}
			console.log(res.data);
		} catch (error) {
			toast.error(res.data.message || "Something Went Wrong");
			console.error(error);
			console.log(res.data);
		}
	};

	return (
		<div className="h-[90vh] flex items-center justify-center p-6">
			<Card className="w-4/12 shadow-lg space-y-4">
				<form
					onSubmit={handleSubmit}
					encType="multipart/form-data">
					<CardHeader className="text-center text-slate-700">
						<h1 className="text-4xl font-bold tracking-tight">Event Request</h1>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<div className="relative">
								<Album className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
								<Input
									type="text"
									name="title"
									disabled={disabled}
									value={form.title}
									onChange={handleChange}
									placeholder="Event Title"
									className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									required
								/>
							</div>
						</div>
						<div className="space-y-2">
							<div className="relative">
								<ScrollText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
								<Input
									type="text"
									name="description"
									disabled={disabled}
									value={form.description}
									onChange={handleChange}
									placeholder="Event Description"
									className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									required
								/>
							</div>
						</div>
						<div className="space-y-2">
							<div className="relative">
								<MapPinned className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
								<Input
									type="text"
									name="venue"
									disabled={disabled}
									value={form.venue}
									onChange={handleChange}
									placeholder="Event Venue"
									className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									required
								/>
							</div>
						</div>
						<div className="space-y-2">
							<div className="relative">
								<CalendarFold className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
								<Input
									type="text"
									name="date"
									disabled={disabled}
									value={form.date}
									onChange={handleChange}
									placeholder="Event Date"
									className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									required
								/>
							</div>
						</div>
					</CardContent>
					<CardFooter className="space-y-0">
						<Button
							type="submit"
							disabled={disabled}
							className="w-full flex items-center justify-center gap-2 bg-slate-700 text-primary-foreground p-2 rounded-md hover:bg-slate-700/90 transition-colors">
							<span className="flex items-center gap-2">
								{disabled ? "Event Requested" : "Request Event"}
								<CircleFadingPlus />
							</span>
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
