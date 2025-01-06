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
	Stamp,
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
		title: "Host Event",
		path: "/app/panel/dashboard/host",
		icon: Stamp,
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
		title: "Joined Events",
		path: "/app/panel/dashboard/joined",
		icon: BetweenHorizontalStart,
	},
	{
		title: "Requested Event",
		path: "/app/panel/dashboard/requested",
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
		title: "Funds Offered",
		path: "/app/sponsor/dashboard/offered",
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
		path: "/app/officer/dashboard/sponsors",
		icon: GalleryVerticalEnd,
	},
	{
		title: "Event Funds",
		path: "/app/officer/dashboard/funds",
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

// ... other exports ...

export const rejectRegistration = async (req, res) => {
  try {
    // Check if user is panel member
    if (req.user.role !== "Panel") {
      return res.status(403).json({
        success: false,
        message: "Only panel members can reject registrations"
      });
    }

    const registration = await Register.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found"
      });
    }

    // Check if panel member has permission for this club
    if (registration.club.toString() !== req.user.club.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only reject registrations for your club"
      });
    }

    // Delete the registration
    await Register.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Registration rejected successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};
