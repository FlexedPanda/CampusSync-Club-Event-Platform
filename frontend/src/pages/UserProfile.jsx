import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Mail, Phone, IdCard, Calendar, Shield } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function UserProfile() {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const res = await fetch( `${import.meta.env.VITE_API_URL}/auth/profile`, {
					method: "GET",
					headers: {
						token: localStorage.getItem("token"),
					},
				});

				if (res.ok) {
					const data = await res.json();
					setUserData(data.user);
				} else {
					toast.error("Failed to Fetch Profile");
				}
			} catch (error) {
				toast.error("Something Went Wrong");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserProfile();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-pulse text-primary">Loading profile...</div>
			</div>
		);
	}

	if (!userData) {
		return (
			<div className="flex items-center justify-center min-h-[400px] text-destructive">
				Could not load profile data
			</div>
		);
	}

	return (
		<div className="container max-w-4xl mx-auto py-8 px-4">
			<Card className="overflow-hidden">
				<CardHeader className="pb-0">
					<div className="flex flex-col items-center space-y-4">
						<div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
							<span className="text-5xl font-semibold text-primary">
								{userData.name ? userData.name[0].toUpperCase() : "?"}
							</span>
						</div>
						<div className="text-center space-y-1.5">
							<h2 className="text-2xl font-bold">{userData.name}</h2>
							<p className="text-muted-foreground">
								{userData.role
									.split("_")
									.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
									.join(" ")}
							</p>
						</div>
					</div>
				</CardHeader>

				<CardContent className="mt-6">
					<Separator className="my-6" />

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="space-y-6">
							<div className="flex items-center space-x-4">
								<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
									<Mail className="h-5 w-5 text-primary" />
								</div>
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Email Address</p>
									<p className="font-medium">{userData.email}</p>
								</div>
							</div>

							<div className="flex items-center space-x-4">
								<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
									<Phone className="h-5 w-5 text-primary" />
								</div>
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Phone Number</p>
									<p className="font-medium">{userData.phone}</p>
								</div>
							</div>

							{userData.club && (
								<div className="flex items-center space-x-4">
									<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
										<IdCard className="h-5 w-5 text-primary" />
									</div>
									<div className="space-y-1">
										<p className="text-sm text-muted-foreground">Club</p>
										<p className="font-medium">{userData.club.name}</p>
									</div>
								</div>
							)}
						</div>

						<div className="space-y-6">
							<div className="flex items-center space-x-4">
								<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
									<Shield className="h-5 w-5 text-primary" />
								</div>
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Role</p>
									<p className="font-medium capitalize">
										{userData.role.replace("_", " ")}
									</p>
								</div>
							</div>

							<div className="flex items-center space-x-4">
								<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
									<Calendar className="h-5 w-5 text-primary" />
								</div>
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Member Since</p>
									<p className="font-medium">
										{new Date(userData.createdAt).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
