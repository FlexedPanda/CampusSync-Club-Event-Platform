import {
  ScrollText,
  MapPinned,
  CalendarFold,
  UsersRound,
  CircleDollarSign,
  LoaderCircle,
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

export default function JoinedEvents() {
  const [loading, setLoading] = useState(true);
  const [joins, setJoins] = useState([]);

  useEffect(() => {
    async function fetchJoined() {
      try {
        const res = await axios.get("/event/joins", {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
            type: localStorage.getItem("type"),
          },
        });

        if (res.data.joined) {
          setJoins(res.data.joined);
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

    fetchJoined();
  }, []);

  const handleLeaveEvent = async (event, id) => {
    event.preventDefault();
    try {
      const res = await axios.delete(`/event/joins/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type"),
        },
      });

      if (res.data.left) {
        toast.success(res.data.message || "Successfully Left Event");
        setJoins((prevJoins) => prevJoins.filter((join) => join.event._id !== id)); 
      } else {
        toast.error(res.data.message || "Failed to Leave Event");
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

  if (!joins || joins.length === 0) {
    return (
      <div className="h-[90vh] flex items-center justify-center p-6">
        <Card className="transition-transform transform hover:scale-125 shadow-md hover:shadow-lg">
          <CardHeader className="text-center text-2xl font-bold text-slate-700">
            Joined Events
          </CardHeader>
          <CardContent className="w-full space-y-4 rounded-lg shadow-lg text-center text-gray-600">
            Could Not Find Any Events You've Joined
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="h-[90vh] p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-5">
        {joins.map((join) => (
          <Card
            key={join._id}
            className="transition-transform transform hover:scale-95 shadow-md hover:shadow-lg border border-gray-300 rounded-lg bg-gray-50"
          >
            <CardHeader className="flex justify-between items-center bg-gradient-to-r from-slate-700 to-zinc-900 text-white rounded-t-lg p-4">
              <div className="text-center">
                <CardTitle>
                  <h4 className="text-lg font-semibold">{join.event.title}</h4>
                </CardTitle>
                <Badge className="text-xs bg-gray-600 text-white">
                  {join.event.club.name}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${join.event.cover}`}
                  alt={`${join.event.title} cover`}
                  className="rounded-lg object-cover w-full h-36"
                />
                <div className="flex items-start gap-2">
                  <ScrollText className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Description:</p>
                    <p className="text-gray-600">{join.event.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPinned className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Venue:</p>
                    <p className="text-gray-600">{join.event.venue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CalendarFold className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Date:</p>
                    <p className="text-gray-600">
                      {new Date(join.event.date).toLocaleDateString("en-Uk", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex flex-col text-left p-2 flex-1">
                    <div className="flex items-start gap-2">
                      <UsersRound className="text-gray-600 w-5 h-7" />
                      <div>
                        <p className="font-bold text-gray-800">Capacity:</p>
                        <p className="text-gray-600">{join.event.capacity} Guests</p>
                      </div>
                    </div>
                  </div>
                  <Separator orientation="vertical" />
                  <div className="flex flex-col text-left p-2 flex-1">
                    <div className="flex items-start gap-2">
                      <CircleDollarSign className="text-gray-600 w-5 h-7" />
                      <div>
                        <p className="font-bold text-gray-800">Entry Fee:</p>
                        <p className="text-gray-600">{join.event.entry} Taka</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-200 flex justify-center">
              <Button
                variant="outline"
                onClick={(event) => handleLeaveEvent(event, join.event._id)}
                className="text-rose-700 hover:text-white hover:bg-rose-700"
              >
                Leave Event
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
