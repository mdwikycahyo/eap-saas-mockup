"use client"

import { useState } from "react"
import { flexRender } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus, Upload } from "lucide-react"
import { CustomPagination } from "@/components/ui/custom-pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

// Import extracted components and hooks
import { User } from "./types/user"
import { AddUserPanel } from "./components/dialogs/AddUserPanel"
import { EditUserPanel } from "./components/dialogs/EditUserPanel"
import { ViewProfileDialog } from "./components/dialogs/ViewProfileDialog"
import { AdjustPointsDialog } from "./components/dialogs/AdjustPointsDialog"
import { useUserManagement } from "./hooks/useUserManagement"
import { useCreatorTable } from "./hooks/useCreatorTable"
import { useAdminTable } from "./hooks/useAdminTable"

export default function ManageUsersPage() {
  // Dialog states
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isImportUsersOpen, setIsImportUsersOpen] = useState(false)
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false)
  const [viewingUserProfile, setViewingUserProfile] = useState<User | null>(null)
  const [isAdjustPointsOpen, setIsAdjustPointsOpen] = useState(false)
  const [adjustingPointsForUser, setAdjustingPointsForUser] = useState<User | null>(null)
  const [isResendDialogOpen, setIsResendDialogOpen] = useState(false)
  const [userToResend, setUserToResend] = useState<User | null>(null)

  // Use custom hooks
  const {
    creatorUsers,
    adminUsers,
    handleAddUser,
    handleUpdateUser,
    handlePointsAdjusted,
    handleResendInvitation,
  } = useUserManagement()

  // Event handlers
  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsEditUserOpen(true)
  }

  const handleViewProfile = (user: User) => {
    setViewingUserProfile(user)
    setIsViewProfileOpen(true)
  }

  const confirmResendInvitation = (user: User) => {
    setUserToResend(user)
    setIsResendDialogOpen(true)
  }

  const executeResendInvitation = () => {
    if (userToResend) {
      handleResendInvitation(userToResend)
    }
    setIsResendDialogOpen(false)
    setUserToResend(null)
  }

  const handleOpenAdjustPointsDialog = (user: User) => {
    setAdjustingPointsForUser(user)
    setIsAdjustPointsOpen(true)
  }

  // Use table hooks
  const creatorTable = useCreatorTable({
    creators: creatorUsers,
    onViewProfile: handleViewProfile,
    onEditCreator: handleEditUser,
    onResendInvitation: confirmResendInvitation,
    onAdjustPoints: handleOpenAdjustPointsDialog,
  })

  const adminTable = useAdminTable({
    admins: adminUsers,
    onViewProfile: handleViewProfile,
    onEditCreator: handleEditUser,
    onResendInvitation: confirmResendInvitation,
  })

  return (
    <div className="p-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Manage User</h1>
        <Button className="bg-gray-800 hover:bg-gray-600 text-white" onClick={() => setIsAddUserOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage creators and administrators in your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="creators" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="creators">Creators ({creatorTable.filteredCreators.length})</TabsTrigger>
              <TabsTrigger value="administrators">Administrators ({adminTable.filteredAdmins.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="creators" className="space-y-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-grow w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search creators..."
                    value={creatorTable.globalFilter}
                    onChange={(e) => creatorTable.setGlobalFilter(e.target.value)}
                    className="pl-8 w-full"
                  />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Select value={creatorTable.invitationStatusFilter} onValueChange={creatorTable.setInvitationStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="All Invitations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Invitations</SelectItem>
                      <SelectItem value="Accepted">Accepted</SelectItem>
                      <SelectItem value="Pending Invitation">Pending Invitation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {creatorTable.table.getHeaderGroups().map((hg) => (
                      <TableRow key={hg.id}>
                        {hg.headers.map((h) => (
                          <TableHead key={h.id}>
                            {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {creatorTable.table.getRowModel().rows?.length ? (
                      creatorTable.table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={creatorTable.columns.length} className="h-24 text-center">
                          No creators found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <CustomPagination
                currentPage={creatorTable.table.getState().pagination.pageIndex + 1}
                totalPages={creatorTable.table.getPageCount()}
                totalItems={creatorTable.table.getFilteredRowModel().rows.length}
                itemsPerPage={creatorTable.table.getState().pagination.pageSize}
                onPageChange={(page) => creatorTable.table.setPageIndex(page - 1)}
                onItemsPerPageChange={(size) => creatorTable.table.setPageSize(size)}
                itemName="creators"
              />
            </TabsContent>

            <TabsContent value="administrators" className="space-y-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-grow w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search administrators..."
                    value={adminTable.globalFilter}
                    onChange={(e) => adminTable.setGlobalFilter(e.target.value)}
                    className="pl-8 w-full"
                  />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Select value={adminTable.invitationStatusFilter} onValueChange={adminTable.setInvitationStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="All Invitations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Invitations</SelectItem>
                      <SelectItem value="Accepted">Accepted</SelectItem>
                      <SelectItem value="Pending Invitation">Pending Invitation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {adminTable.table.getHeaderGroups().map((hg) => (
                      <TableRow key={hg.id}>
                        {hg.headers.map((h) => (
                          <TableHead key={h.id}>
                            {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {adminTable.table.getRowModel().rows?.length ? (
                      adminTable.table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={adminTable.columns.length} className="h-24 text-center">
                          No administrators found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <CustomPagination
                currentPage={adminTable.table.getState().pagination.pageIndex + 1}
                totalPages={adminTable.table.getPageCount()}
                totalItems={adminTable.table.getFilteredRowModel().rows.length}
                itemsPerPage={adminTable.table.getState().pagination.pageSize}
                onPageChange={(page) => adminTable.table.setPageIndex(page - 1)}
                onItemsPerPageChange={(size) => adminTable.table.setPageSize(size)}
                itemName="administrators"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog Components */}
      <AddUserPanel
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onUserAdded={handleAddUser}
      />

      {editingUser && (
        <EditUserPanel
          isOpen={isEditUserOpen}
          onClose={() => setIsEditUserOpen(false)}
          user={editingUser}
          onUserUpdated={handleUpdateUser}
        />
      )}

      {viewingUserProfile && (
        <ViewProfileDialog
          isOpen={isViewProfileOpen}
          onOpenChange={setIsViewProfileOpen}
          user={viewingUserProfile}
        />
      )}

      {adjustingPointsForUser && (
        <AdjustPointsDialog
          isOpen={isAdjustPointsOpen}
          onOpenChange={setIsAdjustPointsOpen}
          user={adjustingPointsForUser}
          onPointsAdjusted={handlePointsAdjusted}
        />
      )}

      {userToResend && (
        <AlertDialog open={isResendDialogOpen} onOpenChange={setIsResendDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Resend Invitation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to resend the invitation to {userToResend.fullName}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setUserToResend(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-gray-800 hover:bg-gray-600 text-white" onClick={executeResendInvitation}>Resend</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <Dialog open={isImportUsersOpen} onOpenChange={setIsImportUsersOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Users</DialogTitle>
            <DialogDescription>
              Upload an Excel file with user information. Make sure to use the correct template format.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-center text-gray-600 mb-4">
                Drag and drop your Excel file here, or click to browse
              </p>
              <div className="flex gap-2">
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Browse Files
                </Button>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
              <p className="font-medium mb-1">Important Notes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Make sure all required fields are filled in the template</li>
                <li>Email addresses must be unique and valid</li>
                <li>Supported file formats: .xlsx, .xls</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportUsersOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({ title: "Upload Initiated", description: "User upload process has started." })
                setIsImportUsersOpen(false)
              }}
            >
              Upload File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
