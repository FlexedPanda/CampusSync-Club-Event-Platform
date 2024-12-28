import {
  ScrollText,
  MapPinned,
  CalendarFold,
  UsersRound,
  CircleDollarSign,
  LoaderCircle,
  HandCoins,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

export default function CampusEvents() {
  const type = localStorage.getItem("type");
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [funding, setFunding] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    async function fetchCampusEvents() {
      try {
        const res = await axios.get("/event/campus", {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
            type: localStorage.getItem("type"),
          },
        });

        if (res.data.events) {
          setEvents(res.data.events);
        } else {
          toast.error(res.data.message || "Failed to Fetch Events");
        }
        console.log(res.data);
      } catch (error) {
        toast.error("Something Went Wrong");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCampusEvents();
  }, []);

  const handleJoinEvent = async (event, id) => {
    event.preventDefault();
    try {
      const res = await axios.post(`/event/campus/${id}`, {}, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type"),
        },
      });

      if (res.data.join) {
        toast.success(res.data.message || "Successfully Joined Event");
        setEvents(events.filter((event) => event._id !== id));
      } else {
        toast.error(res.data.message || "Failed to Join Event");
      }
      console.log(res.data);
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error(error);
    }
  };

  const handleFunding = (id) => {
    setFunding(id);
    setAmount(null);
  };

  const handleCancel = () => {
    setFunding(null);
    setAmount(null);
  };

  const handleProvideFund = async (id) => {
    try {
      const res = await axios.post(`/fund/provide/${id}`, {amount}, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type"),
        },
      });

      if (res.data.fund) {
        toast.success(res.data.message || "Successfully Funded Event");
        setEvents(events.filter((event) => event._id !== id));
        setAmount(null);
      } else {
        toast.error(res.data.message || "Failed to Fund Event");
      }
      console.log(res.data);
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error(error);
    }
  };

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
            Campus Events
          </CardHeader>
          <CardContent className="w-full space-y-4 rounded-lg shadow-lg text-center text-gray-600">
            Could Not Find Any Events to Join
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="h-[90vh] p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-5">
        {events.map((event) => (
          <Card
            key={event._id}
            className="transition-transform transform hover:scale-95 shadow-md hover:shadow-lg border border-gray-300 rounded-lg bg-gray-50">
            <CardHeader className="flex justify-between items-center bg-gradient-to-r from-slate-700 to-zinc-900 text-white rounded-t-lg p-4">
              <div className="text-center">
                <CardTitle>
                  <h4 className="text-lg font-semibold">{event.title}</h4>
                </CardTitle>
                <Badge className="text-xs bg-gray-600 text-white">
                  {event.club.name}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${event.cover}`}
                  alt={`${event.title} cover`}
                  className="rounded-lg object-cover w-full h-36"
                />
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
                    <p className="font-bold text-gray-800">Venue:</p>
                    <p className="text-gray-600">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CalendarFold className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Date:</p>
                    <p className="text-gray-600">
                      {new Date(event.date).toLocaleDateString("en-Uk", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                {funding === event._id ? (
                  <div className="flex items-center gap-2 mt-4 p-1">
                    <HandCoins className="text-gray-600 w-15 h-15" />
                    <label htmlFor="cost" className="w-1/6 text-gray-800 font-semibold">
                      Fund
                    </label>
                    <Input
                      type="number"
                      name="amount"
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter Amount"
                      className="w-4/6 pl-4 pr-4 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                ) : (
                  <div className="flex items-start">
                    <div className="flex flex-col text-left p-2 flex-1">
                      <div className="flex items-start gap-2">
                        <UsersRound className="text-gray-600 w-5 h-7" />
                        <div>
                          <p className="font-bold text-gray-800">Capacity:</p>
                          <p className="text-gray-600">
                            {event.capacity} Guests
                          </p>
                        </div>
                      </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex flex-col text-left p-2 flex-1">
                      <div className="flex items-start gap-2">
                        <CircleDollarSign className="text-gray-600 w-5 h-7" />
                        <div>
                          <p className="font-bold text-gray-800">Entry Fee:</p>
                          <p className="text-gray-600">{event.entry} Taka</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-200 flex justify-center gap-12">
              {funding === event._id ? (
                <>
                {type === "Officer" && (
                  <Button
                    onClick={() => handleProvideFund(event._id)}
                    className="bg-emerald-700 text-white hover:bg-emerald-700">
                    Provide
                  </Button>
                )}
                {type === "Sponsor" && (
                  <Button
                    onClick={() => handleSubmitEdit(event._id)}
                    className="bg-emerald-700 text-white hover:bg-emerald-700">
                    Sponsor
                  </Button>
                )}
                <Button
                  onClick={handleCancel}
                  className="bg-rose-700 text-white hover:bg-rose-700">
                  Cancel
                </Button>
                </>
              ) : (
                <>
                  {type === "Guest" || type === "Panel" ? (
                    <Button
                      variant="outline"
                      onClick={(e) => handleJoinEvent(e, event._id)}
                      className="text-emerald-700 border-emerald-700 hover:bg-emerald-700 hover:text-white">
                      Join Event
                    </Button>
                  ) : type === "Sponsor" ? (
                    <Button
                      variant="outline"
                      onClick={() => handleFunding(event._id)}
                      className="text-slate-700 border-slate-700 hover:bg-slate-700 hover:text-white">
                      Sponsor Event
                    </Button>
                  ) : (
                    type === "Officer" && (
                      <Button
                        variant="outline"
                        onClick={() => handleFunding(event._id)}
                        className="text-slate-700 border-slate-700 hover:bg-slate-700 hover:text-white">
                        Fund Event
                      </Button>
                    )
                  )}
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
