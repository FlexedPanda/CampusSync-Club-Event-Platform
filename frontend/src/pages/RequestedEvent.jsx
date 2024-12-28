import {
	ScrollText,
	MapPinned,
	CalendarFold,
	UserRound,
	LoaderCircle,
	X,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

export default function RequestedEvent() {
	const [loading, setLoading] = useState(true);
	const [proposals, setProposals] = useState([]);

	useEffect(() => {
		async function fetchRequested() {
			try {
				const res = await axios.get("/event/requests", {
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem("token"),
						type: localStorage.getItem("type"),
					},
				});

				if (res.data.proposal) {
					setProposals(res.data.proposal);
				} else {
					toast.error(res.data.message || "Failed to Fetch Proposals");
				}
				console.log(res.data);
			} catch (error) {
				toast.error(res.data.message || "Something Went Wrong");
				console.error(error);
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

	if (!proposals || proposals.length === 0) {
		return (
			<div className="h-[90vh] flex items-center justify-center p-6">
				<Card className="transition-transform transform hover:scale-125 shadow-md hover:shadow-lg">
					<CardHeader className="text-center text-2xl font-bold text-slate-700">
						Event Proposals
					</CardHeader>
					<CardContent className="w-5/1 space-y-4 rounded-lg shadow-lg text-center text-gray-600">
							Could Not Find Any Event Proposals
					</CardContent>
			</Card>
			</div>
		);
		};

	const handleCancel = async (event, id) => {
		event.preventDefault();
		try {
			const res = await axios.delete(`/event/requests/${id}`, {
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem("token"),
					type: localStorage.getItem("type"),
				},
			});

			if (res.data.request) {
				toast.success(res.data.message || "Success Request Cancel");
				setProposals(proposals.filter((proposal) => proposal._id !== id));
			} else {
				toast.error(res.data.message || "Failed Request Cancel");
			}
			console.log(res.data);
		} catch (error) {
			toast.error(res.data.message || "Something Went Wrong");
			console.error(error);
			console.log(res.data);
		}
	};

	return (
		<main className="h-[90vh] p-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-5">
				{proposals.map((proposal) => (
					<Card
						key={proposal._id}
						className="transition-transform transform hover:scale-95 shadow-md hover:shadow-lg border border-gray-300 rounded-lg bg-gray-50">
						<CardHeader className="flex justify-between items-center bg-gradient-to-r from-slate-700 to-zinc-900 text-white rounded-t-lg p-6">
							<div className="text-center">
								<CardTitle>
									<h4 className="text-lg font-semibold">{proposal.title}</h4>
								</CardTitle>
								<Badge className="text-xs bg-gray-600 text-white">
									{proposal.club.name}
								</Badge>
							</div>
						</CardHeader>
						<CardContent className="p-6">
							<div className="flex flex-col gap-4">
								<div className="flex items-start gap-2">
									<ScrollText className="text-gray-600 w-5 h-7" />
									<div>
										<p className="font-bold text-gray-800">Description:</p>
										<p className="text-gray-600">{proposal.description}</p>
									</div>
								</div>
								<div className="flex items-start gap-2">
									<CalendarFold className="text-gray-600 w-5 h-7" />
									<div>
										<p className="font-bold text-gray-800">Date:</p>
										<p className="text-gray-600">
											{new Date(proposal.date).toLocaleDateString("en-UK", {
												day: "2-digit",
												month: "long",
												year: "numeric",
											})}
										</p>
									</div>
								</div>
								<div className="flex items-start gap-2">
									<MapPinned className="text-gray-600 w-5 h-7" />
									<div>
										<p className="font-bold text-gray-800">Venue:</p>
										<p className="text-gray-600">{proposal.venue}</p>
									</div>
								</div>
								<Separator />
								<div className="flex items-start gap-2">
									<UserRound className="text-gray-600 w-5 h-7" />
									<div>
										<p className="font-bold text-gray-800">Requested By:</p>
										<p className="text-gray-600 font-semibold">
											{proposal.panel.name}
										</p>
										<p className="text-gray-600">
											{`${proposal.panel.designation}, ${proposal.club.name}`}
										</p>
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter className="p-4 bg-gray-200 flex justify-center">
							<Button
								onClick={(event) => handleCancel(event, proposal._id)}
								className="bg-rose-700 text-white hover:bg-rose-800">
								<span className="flex items-center gap-1">Cancel Request</span>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}
