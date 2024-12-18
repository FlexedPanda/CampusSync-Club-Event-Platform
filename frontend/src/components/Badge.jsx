import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import * as React from "react";
import { CalendarSearch } from "lucide-react";

export function Badge() {
	const handleRedirect = () => {
    localStorage.clear();
    window.location.href = "/app";
  };

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					tooltip="CampusSync"
					onClick={handleRedirect}
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
					<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<CalendarSearch className="size-4" />
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">CampusSync</span>
						<span className="truncate text-xs">Club Event Platform</span>
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
