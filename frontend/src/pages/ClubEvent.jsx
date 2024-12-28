import {
  Album,
  MapPinned,
  CalendarFold,
  Landmark,
  CircleDollarSign,
  Armchair,
	UserRound,
  UsersRound,
  ScrollText,
  LoaderCircle,
	HandCoins,
	DollarSign,
	Coins,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function ClubEvent() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchClubEvent = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/event/club", {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
            type: localStorage.getItem("type"),
          },
        });

        if (res.data.clubevent) {
          setEvents(res.data.clubevent);
          console.log(res.data.clubevent);
        } else {
          toast.error(res.data.message || "Failed to Fetch Club Event");
        }
      } catch (error) {
        toast.error("Something Went Wrong");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubEvent();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="animate-spin text-muted-foreground">
          <LoaderCircle size={64} strokeWidth={1} />
        </div>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="h-[90vh] flex items-center justify-center p-6">
        <Card className="transition-transform transform hover:scale-125 shadow-md hover:shadow-lg">
          <CardHeader className="text-center text-2xl font-bold text-slate-700">
            Club Event
          </CardHeader>
          <CardContent className="w-5/1 space-y-4 rounded-lg shadow-lg text-center text-gray-600">
            Could Not Find Any Hosted Club Event
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-[90vh] flex items-center justify-center p-6">
      {events.map((event) => (
        <Card
          key={event._id}
          className="w-9/12 h-[600px] rounded-lg shadow-lg bg-zinc-100"
        >
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="text-center text-3xl font-bold text-slate-700">
              Club Event
            </CardTitle>
            <CardDescription className="flex justify-between items-center">
              <Badge className="text-xs bg-gray-600 text-white">
                {event.club.name}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
						<img
							src={`${import.meta.env.VITE_API_URL}/${event.cover}`}
							alt={`${event.title} cover`}
							className="rounded-lg object-cover w-full h-48"
						/>
            <div className="flex items-start space-x-6">
              <div className="flex flex-col text-left p-2 space-y-4 flex-1">
                <div className="flex items-start gap-2">
                  <Album className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Event Title:</p>
                    <p className="text-gray-600">{event.title}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ScrollText className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Description:</p>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPinned className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Event Venue:</p>
                    <p className="text-gray-600">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CalendarFold className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Event Date:</p>
                    <p className="text-gray-600">
                      {new Date(event.date).toLocaleDateString("en-UK", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col text-left space-y-4 p-2 flex-1">
                <div className="flex items-start gap-2">
                  <Landmark className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Club Reserve:</p>
                    <p className="text-gray-600">{event.club.reserve} Taka</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Armchair className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Capacity:</p>
                    <p className="text-gray-600">{event.capacity} Guests</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <UsersRound className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Event Guests:</p>
                    <p className="text-gray-600">{event.guests} Guest/s</p>
                  </div>
                </div>
								<div className="flex items-start gap-2">
                  <CircleDollarSign className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Entry Fee:</p>
                    <p className="text-gray-600">{event.entry} Taka</p>
                  </div>
                </div>
              </div>
							<Separator orientation="vertical" />
							<div className="flex flex-col text-left p-2 space-y-4 flex-1">
								<div className="flex items-start gap-2">
                  <DollarSign className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Event Cost:</p>
                    <p className="text-gray-600">{event.cost} Taka</p>
                  </div>
                </div>
								<div className="flex items-start gap-2">
                  <HandCoins className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Event Funds:</p>
                    <p className="text-gray-600">{event.funds} Taka</p>
                  </div>
                </div>
								<div className="flex items-start gap-2">
                  <Coins className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Event Revenue:</p>
                    <p className="text-gray-600">{event.revenue} Taka</p>
                  </div>
                </div>
								<div className="flex items-start gap-2">
                  <UserRound className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Approved By:</p>
                    <p className="text-gray-600 font-semibold">
                      {event.officer.name}
                    </p>
                    <p className="text-gray-600">
                      {`${event.officer.role}, ${event.officer.designation}`}
                    </p>
                  </div>
                </div>
							</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
