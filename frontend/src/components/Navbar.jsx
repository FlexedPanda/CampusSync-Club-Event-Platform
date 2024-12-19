import * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { 
	ScrollText, 
	LayoutDashboard, 
	Album, 
	ClipboardPenLine,
	SquarePen,
	CircleFadingPlus,
	UsersRound,
	Origami,
	CalendarClock,
	Tag,
	Send,
	UserRoundPen,
	UserRoundSearch,
	Inbox,
	GalleryVerticalEnd,
	BetweenHorizontalStart,
} from "lucide-react";

import { Badge } from "./Badge.jsx";
import { Profile } from "./Profile.jsx";
import { Navlink } from "./Navlink.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const HomeNavLinks = [ //other home routes just as reference
	{
		title: "Frontend App Running...",
		path: "/",
	},
	{
		title: "CampusSync",
		path: "/app",
	},
	{
		title: "Login",
		path: "/app/home/login",
	},
	{
		title: "Register",
		path: "/app/home/register",
	},
	{
		title: "Sponsor",
		path: "/app/home/sponsor",
	},
	{
		title: "Profile",
		path: "/app/type/dashboard/profile",
	},
	{
		title: "Logout",
		path: "/app/type/dashboard/logout",
	},
];

const GuestNavLinks = [
	{
		title: "Announcements",
		path: "/app/guest/dashboard/announcements",
		icon: ScrollText,
	},
	{
		title: "Campus Events",
		path: "/app/guest/dashboard/events",
		icon: LayoutDashboard,
	},
	{
		title: "Club Event",
		path: "/app/guest/dashboard/clubevent",
		icon: Album,
	},
	{
		title: "Joined Events",
		path: "/app/guest/dashboard/joined",
		icon: BetweenHorizontalStart,
	},
];

const PanelNavLinks = [
	{
		title: "Announcements",
		path: "/app/panel/dashboard/announcements",
		icon: ScrollText,
	},
	{
		title: "Campus Events",
		path: "/app/panel/dashboard/events",
		icon: LayoutDashboard,
	},
	{
		title: "Club Event",
		path: "/app/panel/dashboard/clubevent",
		icon: Album,
	},
	{
		title: "Joined Events",
		path: "/app/panel/dashboard/joined",
		icon: BetweenHorizontalStart,
	},
	{
		title: "Create Post",
		path: "/app/panel/dashboard/post",
		icon: SquarePen,
	},
	{
		title: "Request Event",
		path: "/app/panel/dashboard/request",
		icon: CircleFadingPlus,
	},
	{
		title: "Participants",
		path: "/app/panel/dashboard/participants",
		icon: UsersRound,
	},
	{
		title: "Applications",
		path: "/app/panel/dashboard/applications",
		icon: ClipboardPenLine,
	},
	{
		title: "Proposed Event",
		path: "/app/panel/dashboard/proposed",
		icon: CalendarClock,
	},
];

const SponsorNavLinks = [
	{
		title: "Announcements",
		path: "/app/sponsor/dashboard/announcements",
		icon: ScrollText,
	},
	{
		title: "Campus Events",
		path: "/app/sponsor/dashboard/events",
		icon: LayoutDashboard,
	},
	{
		title: "Sponsored Events",
		path: "/app/sponsor/dashboard/sponsored",
		icon: Tag,
	},
	{
		title: "Funds Provided",
		path: "/app/sponsor/dashboard/provided",
		icon: Send,
	},
];

const OfficerNavLinks = [
	{
		title: "Announcements",
		path: "/app/officer/dashboard/announcements",
		icon: ScrollText,
	},
	{
		title: "Campus Events",
		path: "/app/officer/dashboard/events",
		icon: LayoutDashboard,
	},
	{
		title: "Registrations",
		path: "/app/officer/dashboard/registrations",
		icon: UserRoundPen,
	},
	{
		title: "Sponsorships",
		path: "/app/officer/dashboard/sponsorships",
		icon: ClipboardPenLine,
	},
	{
		title: "User Directory",
		path: "/app/officer/dashboard/users",
		icon: UserRoundSearch,
	},
	{
		title: "Event Proposals",
		path: "/app/officer/dashboard/proposals",
		icon: Inbox,
	},
	{
		title: "Sponsored Funds",
		path: "/app/officer/dashboard/funds",
		icon: GalleryVerticalEnd,
	},
	{
		title: "Funded Events",
		path: "/app/officer/dashboard/funded",
		icon: Origami,
	},
];

export function Navbar() {
	const roles = {
		Guest: GuestNavLinks,
		Panel: PanelNavLinks,
		Sponsor: SponsorNavLinks,
		Officer: OfficerNavLinks,
	};

	const { user, type } = useAuth();
	const dashboard = type && roles[type];

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<Badge />
			</SidebarHeader>
			<SidebarContent>
				{user && type && dashboard && <Navlink links={dashboard} />}
			</SidebarContent>
			<SidebarFooter>
				<Profile />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
