import {
  Album,
  MapPinned,
  CalendarFold,
  Landmark,
  CircleDollarSign,
  Armchair,
  UserRound,
  ScrollText,
  DollarSign,
  Image,
	LoaderCircle,
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardFooter, 
  CardTitle 
} from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function HostEvent() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    entry: "",
    cover: "",
  });

  useEffect(() => {
    const fetchApprovals = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/event/approvals", {
          headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem("token"),
						type: localStorage.getItem("type"),
					},
        });

        if (res.data.startup) {
					setApprovals(res.data.startup);
				} else {
					toast.error(res.data.message || "Failed to Fetch Approvals");
				}
				console.log(res.data);
      } catch (error) {
        toast.error("Something Went Wrong");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApprovals();
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

	if (!approvals || approvals.length === 0) {
		return (
			<div className="h-[90vh] flex items-center justify-center p-6">
				<Card className="transition-transform transform hover:scale-125 shadow-md hover:shadow-lg">
					<CardHeader className="text-center text-2xl font-bold text-slate-700">
						Host Event
					</CardHeader>
					<CardContent className="w-5/1 space-y-4 rounded-lg shadow-lg text-center text-gray-600">
							Event Request Not Approved Yet For Hosting
					</CardContent>
			</Card>
			</div>
		);
	};

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleLaunch = async (event, id) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("entry", form.entry);
      formData.append("cover", form.cover);

      const res = await axios.post(`/event/approvals/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.event) {
        toast.success(res.data.message || "Launch Success");
        setApprovals(approvals.filter((approval) => approval._id !== id));
      } else {
        toast.error(res.data.message || "Launch Failed");
      }
      console.log(res.data);
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error(error);
    }
  };

  const handlePostpone = async (event, id) => {
    event.preventDefault();
    try {
      const res = await axios.delete(`/event/approvals/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.startup) {
        toast.success(res.data.message || "Postpone Success");
        setApprovals(approvals.filter((approval) => approval._id !== id));
      } else {
        toast.error(res.data.message || "Postpone Failed");
      }
      console.log(res.data);
    } catch (error) {
      toast.error("Something Went Wrong");
      console.error(error);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center p-6">
      {approvals.map((approval) => (
        <Card 
          key={approval._id}
          className="w-8/12 h-auto rounded-lg shadow-lg bg-zinc-100">
          <CardHeader className="flex justify-center items-center">
            <CardTitle className="text-center text-3xl font-bold text-slate-700">
              Host Event
            </CardTitle>
            <CardDescription className="flex justify-between items-center">
              <Badge className="text-xs bg-gray-600 text-white">
                {approval.club.name}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator className="h-[1px] bg-zinc-300" />
            <div className="flex items-start space-x-6">
              <div className="flex flex-col text-left p-2 space-y-4 flex-1">
                <div className="flex items-start gap-2">
                  <Album className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Event Title:</p>
                    <p className="text-gray-600">{approval.title}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ScrollText className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Description:</p>
                    <p className="text-gray-600">{approval.description}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPinned className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Event Venue:</p>
                    <p className="text-gray-600">{approval.venue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CalendarFold className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Event Date:</p>
                    <p className="text-gray-600">
                      {new Date(approval.date).toLocaleDateString("en-UK", {
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
                    <p className="text-gray-600">{approval.club.reserve}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CircleDollarSign className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Event Cost:</p>
                    <p className="text-gray-600">{approval.cost}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Armchair className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Venue Capacity:</p>
                    <p className="text-gray-600">{approval.capacity}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <UserRound className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Approved By:</p>
                    <p className="text-gray-600 font-semibold">
                      {approval.officer.name}
                    </p>
                    <p className="text-gray-600">
                      {`${approval.officer.role}, ${approval.officer.designation}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex flex-col text-left p-2 space-y-4 flex-1">
                <div className="w-full flex items-center gap-2">
                  <DollarSign className="text-gray-600 w-15 h-7" />
                  <label htmlFor="entry" className="w-1/6 text-gray-800 font-semibold">
                    Entry
                  </label>
                  <Input
                    type="text"
                    name="entry"
                    value={form.entry}
                    placeholder="Entry Fee"
                    onChange={handleChange}
                    className="w-4/6 pl-2 pr-4 mr-10 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col text-left space-y-4 p-2 flex-1">
                <div className="w-full flex items-center gap-2">
                  <Image className="text-gray-600 w-15 h-7" />
                  <label htmlFor="cover" className="w-1/6 text-gray-800 font-semibold">
                    Cover
                  </label>
                  <Input
                    type="file"
                    name="cover"
                    onChange={handleChange}
                    className="w-4/6 pl-2 pr-4 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-start space-x-6">
            <div className="flex flex-col text-left p-2 space-y-4 flex-1">
              <Button
                variant="outline"
                onClick={(e) => handleLaunch(e, approval._id)}
                className="w-full flex items-center gap-6 bg-slate-700 text-white hover:bg-slate-800 hover:text-white">
                Launch Event
              </Button>
            </div>
            <div className="flex flex-col text-left p-2 space-y-4 flex-1">
              <Button
                variant="outline"
                onClick={(e) => handlePostpone(e, approval._id)}
                className="w-full flex items-center gap-2 bg-zinc-700 text-white hover:bg-zinc-800 hover:text-white">
                Postpone Event
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
