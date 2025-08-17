"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CampaignListWrapper } from "@/components/admin/campaigns/CampaignListWrapper";

export default function AdminCampaigns() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Or your preferred default
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="p-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Campaign Management
        </h1>
        <CreateCampaignDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Management</CardTitle>
          <CardDescription>
            Manage and track all your campaigns across different statuses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={statusFilter}
            className="w-full"
            onValueChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="relative flex-grow w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search campaigns..."
                  className="pl-8 w-full"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Campaigns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Campaigns</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Drafts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <CampaignListWrapper
                status="all"
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <CampaignListWrapper
                status="active"
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <CampaignListWrapper
                status="completed"
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              <CampaignListWrapper
                status="draft"
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function CreateCampaignDialog() {
  const router = useRouter();

  return (
    <Button
      className="gap-1 bg-gray-800 hover:bg-gray-600 text-white"
      onClick={() => router.push("/admin/campaign-create")}
    >
      <Plus className="h-4 w-4" />
      Add New Campaign
    </Button>
  );
}
