// src/pages/UserDirectory.jsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LoaderCircle, UserRound, Mail, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserDirectory() {
  const [editRequests, setEditRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEditRequests = async () => {
      try {
        const res = await axios.get("/auth/profile/requests", {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
            type: localStorage.getItem("type"),
          },
        });

        if (res.data.success) {
          setEditRequests(res.data.requests);
        }
      } catch (error) {
        toast.error("Failed to fetch edit requests");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEditRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await axios.post(`/auth/profile/approve/${id}`, {}, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type"),
        },
      });

      if (res.data.success) {
        toast.success("Edit request approved");
        setEditRequests(editRequests.filter(req => req._id !== id));
      }
    } catch (error) {
      toast.error("Failed to approve edit request");
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axios.delete(`/auth/profile/reject/${id}`, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type"),
        },
      });

      if (res.data.success) {
        toast.success("Edit request rejected");
        setEditRequests(editRequests.filter(req => req._id !== id));
      }
    } catch (error) {
      toast.error("Failed to reject edit request");
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

  if (editRequests.length === 0) {
    return (
      <div className="h-[90vh] flex items-center justify-center p-6">
        <Card className="transition-transform transform hover:scale-125 shadow-md hover:shadow-lg">
          <CardHeader className="text-center text-2xl font-bold text-slate-700">
            Edit Requests
          </CardHeader>
          <CardContent className="w-full space-y-4 rounded-lg shadow-lg text-center text-gray-600">
            No Edit Requests Found
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="h-[90vh] p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {editRequests.map((request) => (
          <Card key={request._id} className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-slate-700">
                Edit Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-2">
                  <UserRound className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Current Name:</p>
                    <p className="text-gray-600">{request.currentName}</p>
                    <p className="font-bold text-gray-800 mt-2">New Name:</p>
                    <p className="text-gray-600">{request.newName}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-2">
                  <Mail className="text-gray-600 w-5 h-7" />
                  <div>
                    <p className="font-bold text-gray-800">Email:</p>
                    <p className="text-gray-600">{request.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-200 flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => handleApprove(request._id)}
                className="text-emerald-700 hover:text-white hover:bg-emerald-700"
              >
                Approve
              </Button>
              <Button
                variant="outline"
                onClick={() => handleReject(request._id)}
                className="text-rose-700 hover:text-white hover:bg-rose-700"
              >
                Reject
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}