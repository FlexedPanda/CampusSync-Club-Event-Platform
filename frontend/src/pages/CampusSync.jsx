import React from "react";
import { LogIn, UserPlus, Handshake} from "lucide-react";

export default function CampusSync() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center space-y-2">
					<h1 className="text-4xl my-5 font-bold tracking-tight  hover:text-gray-700 transition-colors"> 
						<a href="/app">CampusSync</a> 
					</h1>
					<p className="text-muted-foreground">
						Explore Exciting Events with CampusSync
					</p>
				</div>
				<div className="bg-card p-8 rounded-lg shadow-lg border">
					<div className="space-y-2 relative items-center justify-center">
						<div className="flex items-center justify-center">
							<a
								className="w-full py-2 my-2 flex items-center justify-center gap-3 border rounded-md bg-background hover:outline-none hover:ring-2 hover:ring-primary hover:border-transparent"
                href="/app/home/login"
							>
								<span className="font-bold">Authentication</span><LogIn/> 
							</a>
						</div>
					</div>
					<div className="space-y-2 relative items-center justify-center">
						<div className="flex items-center justify-center">
							<a
								className="w-full py-2 my-2 flex items-center justify-center gap-3 border rounded-md bg-background hover:outline-none hover:ring-2 hover:ring-primary hover:border-transparent"
                href="/app/home/register"
							>
								<span className="font-bold">Registration</span><UserPlus/>
							</a>
						</div>
					</div>
					<div className="space-y-2 relative items-center justify-center">
						<div className="flex items-center justify-center">
							<a
								className="w-full py-2 my-2 flex items-center justify-center gap-3 border rounded-md bg-background hover:outline-none hover:ring-2 hover:ring-primary hover:border-transparent"
                href="/app/home/sponsor"
							>
								<span className="font-bold">Sponsorship</span><Handshake/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
