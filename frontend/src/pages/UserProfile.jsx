import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Mail, Phone, IdCard, Wallet, Pencil, X } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
            type: localStorage.getItem("type"),
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data.user);
          setNewName(data.user.name);
        } else {
          toast.error("Failed to Fetch Profile");
        }
      } catch (error) {
        toast.error("Something Went Wrong");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditRequest = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
          type: localStorage.getItem("type"),
        },
        body: JSON.stringify({ newName }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Edit request sent successfully");
        setIsEditing(false);
      } else {
        toast.error(data.message || "Failed to send edit request");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-primary">Loading profile...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-destructive">
        Could not load profile data
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-center space-y-1.5">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="text-2xl font-bold"
                  />
                  <Button
                    onClick={handleEditRequest}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      setNewName(userData.name);
                    }}
                    variant="outline"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="ghost"
                    size="sm"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <p className="text-muted-foreground text-sm font-medium">
                {userData.designation ? userData.designation : userData.role}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="mt-6">
          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{userData.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {userData.club && (
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <IdCard className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Club</p>
                    <p className="font-medium">{userData.club.name}</p>
                  </div>
                </div>
              )}
              {userData.funds !== undefined && (
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <IdCard className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Funds</p>
                    <p className="font-medium">{userData.funds} Taka</p>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Credits</p>
                  <p className="font-medium capitalize">
                    {userData.credits} Taka
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
