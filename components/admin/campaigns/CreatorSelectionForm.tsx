"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { Creator } from "@/types/campaign";
import { useCreatorSelection } from "@/hooks/useCreatorSelection";
import { provinces, cities } from "@/data/mockCreators";

interface CreatorSelectionFormProps {
  creators: Creator[];
  selectedCreators: Set<number>;
  onSelectionChange: (creatorId: number, checked: boolean) => void;
  isEdit?: boolean;
}

export function CreatorSelectionForm({
  creators,
  selectedCreators,
  onSelectionChange,
  isEdit = false,
}: CreatorSelectionFormProps) {
  const {
    filters,
    pagination,
    filteredCreators,
    paginatedCreators,
    totalPages,
    areAllCurrentPageSelected,
    updateFilter,
    updatePagination,
    handleSelectAll,
  } = useCreatorSelection({
    creators,
    selectedCreators,
    onSelectionChange,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-800 text-primary-foreground rounded-full text-sm font-bold">
            2
          </div>
          Invite Creators
        </CardTitle>
        <CardDescription>Select which creators to invite to this campaign. *</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search creators by name, email, city..."
              className="pl-8"
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={filters.province}
              onValueChange={(value) => updateFilter("province", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Provinces</SelectItem>
                {provinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.city}
              onValueChange={(value) => updateFilter("city", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={areAllCurrentPageSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Province</TableHead>
                <TableHead>City</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCreators.length > 0 ? (
                paginatedCreators.map((creator) => (
                  <TableRow key={creator.id}>
                    <TableCell>
                      <Checkbox
                        id={`creator-${isEdit ? 'edit' : 'create'}-${creator.id}`}
                        checked={selectedCreators.has(creator.id)}
                        onCheckedChange={(checked) => onSelectionChange(creator.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <span>{creator.name}</span>
                    </TableCell>
                    <TableCell>{creator.email}</TableCell>
                    <TableCell>{creator.province}</TableCell>
                    <TableCell>{creator.city}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No creators found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {selectedCreators.size === 0 && (
          <p className="text-xs text-red-500">Please select at least one creator</p>
        )}

        {totalPages > 1 && (
          <CustomPagination
            currentPage={pagination.currentPage}
            totalPages={totalPages}
            totalItems={filteredCreators.length}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={(page) => updatePagination("currentPage", page)}
            onItemsPerPageChange={(value) => updatePagination("itemsPerPage", value)}
            itemName="creators"
          />
        )}
      </CardContent>
    </Card>
  );
}
