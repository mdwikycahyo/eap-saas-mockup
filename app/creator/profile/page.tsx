import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

export default function Profile() {
  return (
    <div className="p-6 pt-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and view your activity
          </p>
        </div>
        <div className="mt-4 md:mt-0 p-4 bg-slate-100 rounded-lg flex items-center gap-3">
          <Award className="h-5 w-5 text-slate-600" />
          <div>
            <p className="text-sm font-medium">Your Points Balance</p>
            <p className="text-2xl font-bold">3,250</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Sarah Johnson</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full p-2 border rounded-md"
                    defaultValue="Sarah Johnson"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    disabled
                    id="email"
                    type="email"
                    className="w-full p-2 border rounded-md"
                    defaultValue="sarah.johnson@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="instagram" className="text-sm font-medium">
                    Instagram
                  </label>
                  <input
                    disabled
                    id="instagram"
                    type="instagram"
                    className="w-full p-2 border rounded-md"
                    defaultValue="@sarah_johnson"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tiktok" className="text-sm font-medium">
                    TikTok
                  </label>
                  <input
                    disabled
                    id="tiktok"
                    type="tiktok"
                    className="w-full p-2 border rounded-md"
                    defaultValue="@sarah_johnson"
                  />
                </div>

                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
