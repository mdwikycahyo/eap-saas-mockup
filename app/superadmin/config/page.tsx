"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addDays } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon, Check, Edit, Eye, Plus, RefreshCw, Save, Trash2, X } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"

export default function SystemConfiguration() {
  // State for maintenance schedules
  const [date, setDate] = useState<Date>()
  const [maintenanceSchedules, setMaintenanceSchedules] = useState([
    {
      id: 1,
      title: "Database Optimization",
      date: new Date(2025, 4, 15),
      startTime: "02:00",
      endTime: "04:00",
      status: "Scheduled",
      description: "Optimize database performance and clean up unused records",
      notifyBefore: "24",
    },
    {
      id: 2,
      title: "System Update",
      date: new Date(2025, 4, 28),
      startTime: "01:00",
      endTime: "05:00",
      status: "Scheduled",
      description: "Deploy new system features and security patches",
      notifyBefore: "48",
    },
  ])
  const [editingMaintenance, setEditingMaintenance] = useState<any>(null)
  const [isEditingMaintenance, setIsEditingMaintenance] = useState(false)

  // State for email templates
  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: 1,
      name: "Welcome Email",
      subject: "Welcome to Employee Advocacy Platform",
      lastUpdated: "2025-04-10",
      content: `<h1>Welcome to Employee Advocacy Platform!</h1>
<p>Dear {name},</p>
<p>We're excited to have you join our platform. Your account has been successfully created for {company}.</p>
<p>Here's what you can do now:</p>
<ul>
  <li>Complete your profile</li>
  <li>Browse available campaigns</li>
  <li>Connect your social media accounts</li>
</ul>
<p>If you have any questions, please don't hesitate to contact our support team.</p>
<p>Best regards,<br>The Employee Advocacy Team</p>`,
    },
    {
      id: 2,
      name: "Password Reset",
      subject: "Reset Your Password",
      lastUpdated: "2025-04-12",
      content: `<h1>Password Reset Request</h1>
<p>Dear {name},</p>
<p>We received a request to reset your password. Please click the link below to create a new password:</p>
<p><a href="{link}">Reset Password</a></p>
<p>If you didn't request this change, please ignore this email or contact our support team.</p>
<p>This link will expire in 24 hours.</p>
<p>Best regards,<br>The Employee Advocacy Team</p>`,
    },
    {
      id: 3,
      name: "Campaign Invitation",
      subject: "You've Been Invited to a Campaign",
      lastUpdated: "2025-04-15",
      content: `<h1>New Campaign Invitation</h1>
<p>Dear {name},</p>
<p>You've been invited to participate in a new campaign for {company}.</p>
<p>Campaign details:</p>
<ul>
  <li>Campaign Name: {campaign_name}</li>
  <li>Start Date: {start_date}</li>
  <li>End Date: {end_date}</li>
</ul>
<p>To view the campaign details and join, please click the link below:</p>
<p><a href="{link}">View Campaign</a></p>
<p>Best regards,<br>The Employee Advocacy Team</p>`,
    },
    {
      id: 4,
      name: "Account Activation",
      subject: "Activate Your Account",
      lastUpdated: "2025-04-18",
      content: `<h1>Activate Your Account</h1>
<p>Dear {name},</p>
<p>Thank you for registering with Employee Advocacy Platform. To complete your registration, please activate your account by clicking the link below:</p>
<p><a href="{link}">Activate Account</a></p>
<p>This link will expire in 48 hours.</p>
<p>If you have any questions, please contact our support team.</p>
<p>Best regards,<br>The Employee Advocacy Team</p>`,
    },
  ])
  const [editingTemplate, setEditingTemplate] = useState<any>(null)
  const [isEditingTemplate, setIsEditingTemplate] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<any>(null)
  const [isPreviewingTemplate, setIsPreviewingTemplate] = useState(false)

  // State for FAQs
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How do I create a campaign?",
      answer:
        "Navigate to the Campaigns section and click on 'Create Campaign' button. Fill in the required details such as campaign name, description, start and end dates, target audience, and content guidelines. Once you've completed all required fields, click 'Submit' to create the campaign. Administrators will review your campaign before it goes live.",
      category: "Campaigns",
      isPublished: true,
    },
    {
      id: 2,
      question: "How are points calculated?",
      answer:
        "Points are calculated based on engagement metrics such as likes, shares, and comments on your social media posts. Different actions carry different point values: Shares typically earn the most points (5-10 points), followed by comments (3-5 points), and likes (1-2 points). Additional points may be awarded for reaching specific engagement thresholds or for participating in featured campaigns. Points are calculated and updated daily, and you can view your current point balance in your dashboard.",
      category: "Rewards",
      isPublished: true,
    },
    {
      id: 3,
      question: "How do I redeem my rewards?",
      answer:
        "To redeem your rewards, go to the Rewards section in your dashboard, browse the available rewards, and select the one you want to redeem. Click on the 'Redeem' button next to the reward. Confirm your selection in the popup dialog. The points will be deducted from your balance, and you'll receive instructions on how to claim your reward. Digital rewards are usually delivered instantly, while physical rewards may take 1-2 weeks for delivery.",
      category: "Rewards",
      isPublished: true,
    },
    {
      id: 4,
      question: "How do I connect my social media accounts?",
      answer:
        "To connect your social media accounts, go to your Profile settings and click on 'Connected Accounts'. Select the social media platform you want to connect (LinkedIn, Twitter, Facebook, etc.) and click 'Connect'. You'll be redirected to the platform's authorization page where you'll need to log in and grant permission to the Employee Advocacy Platform. Once authorized, you'll be redirected back to the platform with your account successfully connected.",
      category: "Account",
      isPublished: false,
    },
  ])
  const [editingFaq, setEditingFaq] = useState<any>(null)
  const [isEditingFaq, setIsEditingFaq] = useState(false)
  const [faqCategories, setFaqCategories] = useState(["General", "Campaigns", "Rewards", "Account", "Technical"])
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>("All")

  // State for Terms & Conditions
  const [termsContent, setTermsContent] = useState(`# Terms of Service

## 1. Introduction

Welcome to the Employee Advocacy Platform. By using our platform, you agree to these Terms of Service.

## 2. Definitions

"Platform" refers to the Employee Advocacy Platform.
"User" refers to any individual who accesses or uses the Platform.
"Content" refers to any material uploaded, shared, or created on the Platform.

## 3. User Responsibilities

Users are responsible for maintaining the confidentiality of their account information.
Users must not use the Platform for any illegal or unauthorized purpose.
Users are responsible for all Content they post on the Platform.

## 4. Intellectual Property

All Content posted on the Platform remains the property of the original creator.
By posting Content on the Platform, users grant the Platform a non-exclusive license to use, display, and distribute the Content.

## 5. Privacy

Our Privacy Policy explains how we collect, use, and protect your personal information.
By using the Platform, you consent to our Privacy Policy.

## 6. Termination

We reserve the right to terminate or suspend any user account at our discretion.
Upon termination, users will lose access to their account and all associated Content.

## 7. Changes to Terms

We reserve the right to modify these Terms at any time.
Users will be notified of any changes to the Terms.

## 8. Disclaimer of Warranties

The Platform is provided "as is" without any warranties.
We do not guarantee that the Platform will be error-free or uninterrupted.

## 9. Limitation of Liability

We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.

## 10. Governing Law

These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction].

## 11. Contact Information

For questions about these Terms, please contact us at legal@employeeadvocacy.com.`)
  const [privacyContent, setPrivacyContent] = useState(`# Privacy Policy

## 1. Introduction

This Privacy Policy explains how we collect, use, and share your personal information when you use our Employee Advocacy Platform.

## 2. Information We Collect

We collect information you provide directly to us, such as your name, email address, and profile information.
We automatically collect certain information about your device and how you interact with the Platform.

## 3. How We Use Your Information

We use your information to provide, maintain, and improve the Platform.
We use your information to communicate with you about the Platform.
We use your information to personalize your experience on the Platform.

## 4. How We Share Your Information

We may share your information with third-party service providers who perform services on our behalf.
We may share your information if required by law or to protect our rights.
We may share aggregated or de-identified information that cannot be used to identify you.

## 5. Your Choices

You can update your account information at any time.
You can opt out of receiving promotional communications from us.
You can delete your account at any time.

## 6. Data Security

We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.

## 7. International Data Transfers

Your information may be transferred to, and processed in, countries other than the country in which you reside.

## 8. Children's Privacy

The Platform is not intended for children under the age of 13.

## 9. Changes to This Privacy Policy

We may update this Privacy Policy from time to time.
We will notify you of any changes by posting the new Privacy Policy on this page.

## 10. Contact Us

If you have any questions about this Privacy Policy, please contact us at privacy@employeeadvocacy.com.`)
  const [cookieContent, setCookieContent] = useState(`# Cookie Policy

## 1. Introduction

This Cookie Policy explains how we use cookies and similar technologies on our Employee Advocacy Platform.

## 2. What Are Cookies

Cookies are small text files that are stored on your device when you visit a website.

## 3. How We Use Cookies

We use cookies to:
- Remember your preferences and settings
- Understand how you interact with the Platform
- Improve your experience on the Platform
- Provide personalized content and advertisements

## 4. Types of Cookies We Use

Essential Cookies: These cookies are necessary for the Platform to function properly.
Preference Cookies: These cookies remember your preferences and settings.
Analytics Cookies: These cookies help us understand how you interact with the Platform.
Marketing Cookies: These cookies are used to deliver advertisements that are relevant to you.

## 5. Your Choices

You can control and manage cookies in various ways. You can delete cookies that are already on your device and you can set most browsers to prevent them from being placed.

## 6. Changes to This Cookie Policy

We may update this Cookie Policy from time to time.
We will notify you of any changes by posting the new Cookie Policy on this page.

## 7. Contact Us

If you have any questions about this Cookie Policy, please contact us at privacy@employeeadvocacy.com.`)
  const [previewingTerms, setPreviewingTerms] = useState(false)
  const [previewingPrivacy, setPreviewingPrivacy] = useState(false)
  const [previewingCookie, setPreviewingCookie] = useState(false)
  const [previewContent, setPreviewContent] = useState("")
  const [previewTitle, setPreviewTitle] = useState("")

  // Function to handle maintenance schedule editing
  const handleEditMaintenance = (schedule: any) => {
    setEditingMaintenance({ ...schedule })
    setDate(new Date(schedule.date))
    setIsEditingMaintenance(true)
  }

  // Function to save edited maintenance schedule
  const handleSaveMaintenance = () => {
    if (editingMaintenance) {
      const updatedSchedules = maintenanceSchedules.map((schedule) =>
        schedule.id === editingMaintenance.id ? { ...editingMaintenance, date: date || new Date() } : schedule,
      )
      setMaintenanceSchedules(updatedSchedules)
      setIsEditingMaintenance(false)
      setEditingMaintenance(null)
      toast({
        title: "Maintenance schedule updated",
        description: "The maintenance schedule has been successfully updated.",
        variant: "success",
      })
    }
  }

  // Function to handle email template editing
  const handleEditTemplate = (template: any) => {
    setEditingTemplate({ ...template })
    setIsEditingTemplate(true)
  }

  // Function to save edited email template
  const handleSaveTemplate = () => {
    if (editingTemplate) {
      const updatedTemplates = emailTemplates.map((template) =>
        template.id === editingTemplate.id
          ? { ...editingTemplate, lastUpdated: format(new Date(), "yyyy-MM-dd") }
          : template,
      )
      setEmailTemplates(updatedTemplates)
      setIsEditingTemplate(false)
      setEditingTemplate(null)
      toast({
        title: "Email template updated",
        description: "The email template has been successfully updated.",
        variant: "success",
      })
    }
  }

  // Function to preview email template
  const handlePreviewTemplate = (template: any) => {
    setPreviewTemplate({ ...template })
    setIsPreviewingTemplate(true)
  }

  // Function to handle FAQ editing
  const handleEditFaq = (faq: any) => {
    setEditingFaq({ ...faq })
    setIsEditingFaq(true)
  }

  // Function to save edited FAQ
  const handleSaveFaq = () => {
    if (editingFaq) {
      const updatedFaqs = faqs.map((faq) => (faq.id === editingFaq.id ? editingFaq : faq))
      setFaqs(updatedFaqs)
      setIsEditingFaq(false)
      setEditingFaq(null)
      toast({
        title: "FAQ updated",
        description: "The FAQ has been successfully updated.",
        variant: "success",
      })
    }
  }

  // Function to toggle FAQ published status
  const toggleFaqPublished = (id: number) => {
    const updatedFaqs = faqs.map((faq) => (faq.id === id ? { ...faq, isPublished: !faq.isPublished } : faq))
    setFaqs(updatedFaqs)
    toast({
      title: "FAQ status updated",
      description: `FAQ has been ${updatedFaqs.find((f) => f.id === id)?.isPublished ? "published" : "unpublished"}.`,
      variant: "success",
    })
  }

  // Function to filter FAQs by category
  const filteredFaqs = selectedFaqCategory === "All" ? faqs : faqs.filter((faq) => faq.category === selectedFaqCategory)

  // Function to preview terms and conditions
  const handlePreviewTerms = (content: string, title: string) => {
    setPreviewContent(content)
    setPreviewTitle(title)

    if (title === "Terms of Service") {
      setPreviewingTerms(true)
      setPreviewingPrivacy(false)
      setPreviewingCookie(false)
    } else if (title === "Privacy Policy") {
      setPreviewingTerms(false)
      setPreviewingPrivacy(true)
      setPreviewingCookie(false)
    } else if (title === "Cookie Policy") {
      setPreviewingTerms(false)
      setPreviewingPrivacy(false)
      setPreviewingCookie(true)
    }
  }

  // Function to close preview
  const closePreview = () => {
    setPreviewingTerms(false)
    setPreviewingPrivacy(false)
    setPreviewingCookie(false)
  }

  // Function to convert markdown to HTML for preview
  const markdownToHtml = (markdown: string) => {
    // This is a simple conversion - in a real app, you'd use a proper markdown parser
    const html = markdown
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/\*\*(.*)\*\*/gm, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gm, "<em>$1</em>")
      .replace(/\n- (.*)/gm, "<ul><li>$1</li></ul>")
      .replace(/<\/ul><ul>/gm, "")
      .replace(/\n/gm, "<br />")

    return html
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Configuration</h1>
          <p className="text-muted-foreground">Manage platform settings and configurations</p>
        </div>
      </div>

      <Tabs defaultValue="maintenance" className="w-full">
        <TabsList className="mb-6 flex flex-wrap">
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="email-templates">Email Templates</TabsTrigger>
          <TabsTrigger value="faq">FAQ Management</TabsTrigger>
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
        </TabsList>

        <TabsContent value="maintenance">
          <div className="grid gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Maintenance Schedule</CardTitle>
                  <CardDescription>Schedule and manage system maintenance tasks</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Maintenance Schedule</DialogTitle>
                      <DialogDescription>
                        Create a new maintenance window for system updates or maintenance.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="maintenance-title">Title</Label>
                        <Input id="maintenance-title" placeholder="e.g. Database Optimization" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="start-time">Start Time</Label>
                          <Input id="start-time" type="time" defaultValue="00:00" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="end-time">End Time</Label>
                          <Input id="end-time" type="time" defaultValue="01:00" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="maintenance-description">Description</Label>
                        <Textarea
                          id="maintenance-description"
                          placeholder="Describe the maintenance activities and potential impact"
                          rows={3}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="notification-time">Notify Users</Label>
                        <Select defaultValue="24">
                          <SelectTrigger>
                            <SelectValue placeholder="Select notification time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6 hours before</SelectItem>
                            <SelectItem value="12">12 hours before</SelectItem>
                            <SelectItem value="24">24 hours before</SelectItem>
                            <SelectItem value="48">48 hours before</SelectItem>
                            <SelectItem value="72">72 hours before</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Schedule Maintenance</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceSchedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium">{schedule.title}</TableCell>
                        <TableCell>{format(schedule.date, "MMM dd, yyyy")}</TableCell>
                        <TableCell>
                          {schedule.startTime} - {schedule.endTime}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                            {schedule.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditMaintenance(schedule)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Edit Maintenance Dialog */}
          <Dialog open={isEditingMaintenance} onOpenChange={setIsEditingMaintenance}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Maintenance Schedule</DialogTitle>
                <DialogDescription>Update the maintenance window details.</DialogDescription>
              </DialogHeader>
              {editingMaintenance && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-maintenance-title">Title</Label>
                    <Input
                      id="edit-maintenance-title"
                      value={editingMaintenance.title}
                      onChange={(e) => setEditingMaintenance({ ...editingMaintenance, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-start-time">Start Time</Label>
                      <Input
                        id="edit-start-time"
                        type="time"
                        value={editingMaintenance.startTime}
                        onChange={(e) => setEditingMaintenance({ ...editingMaintenance, startTime: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-end-time">End Time</Label>
                      <Input
                        id="edit-end-time"
                        type="time"
                        value={editingMaintenance.endTime}
                        onChange={(e) => setEditingMaintenance({ ...editingMaintenance, endTime: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-maintenance-description">Description</Label>
                    <Textarea
                      id="edit-maintenance-description"
                      rows={3}
                      value={editingMaintenance.description}
                      onChange={(e) => setEditingMaintenance({ ...editingMaintenance, description: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-notification-time">Notify Users</Label>
                    <Select
                      value={editingMaintenance.notifyBefore}
                      onValueChange={(value) => setEditingMaintenance({ ...editingMaintenance, notifyBefore: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select notification time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 hours before</SelectItem>
                        <SelectItem value="12">12 hours before</SelectItem>
                        <SelectItem value="24">24 hours before</SelectItem>
                        <SelectItem value="48">48 hours before</SelectItem>
                        <SelectItem value="72">72 hours before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={editingMaintenance.status}
                      onValueChange={(value) => setEditingMaintenance({ ...editingMaintenance, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditingMaintenance(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveMaintenance}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="email-templates">
          <div className="grid gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Manage system email templates</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                      <DialogTitle>Create Email Template</DialogTitle>
                      <DialogDescription>Create a new email template for system communications.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="template-name">Template Name</Label>
                        <Input id="template-name" placeholder="e.g. Welcome Email" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="template-subject">Email Subject</Label>
                        <Input id="template-subject" placeholder="e.g. Welcome to Employee Advocacy Platform" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="template-content">Email Content</Label>
                        <div className="border rounded-md p-2">
                          <div className="bg-muted p-2 rounded-md mb-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Formatting Tools</span>
                            </div>
                          </div>
                          <Textarea
                            id="template-content"
                            placeholder="Enter the email content here. You can use HTML tags for formatting."
                            rows={10}
                          />
                          <div className="mt-2 text-xs text-muted-foreground">
                            Available variables: {"{name}"}, {"{company}"}, {"{link}"}, {"{date}"}
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Preview</Label>
                        <div className="border rounded-md p-4 bg-white">
                          <p className="text-sm text-muted-foreground italic">Preview will appear here</p>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save Template</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emailTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.subject}</TableCell>
                        <TableCell>{template.lastUpdated}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handlePreviewTemplate(template)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditTemplate(template)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Edit Email Template Dialog */}
          <Dialog open={isEditingTemplate} onOpenChange={setIsEditingTemplate}>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Edit Email Template</DialogTitle>
                <DialogDescription>Update the email template details.</DialogDescription>
              </DialogHeader>
              {editingTemplate && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-template-name">Template Name</Label>
                    <Input
                      id="edit-template-name"
                      value={editingTemplate.name}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-template-subject">Email Subject</Label>
                    <Input
                      id="edit-template-subject"
                      value={editingTemplate.subject}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-template-content">Email Content</Label>
                    <div className="border rounded-md p-2">
                      <div className="bg-muted p-2 rounded-md mb-2">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            Bold
                          </Button>
                          <Button variant="ghost" size="sm">
                            Italic
                          </Button>
                          <Button variant="ghost" size="sm">
                            Link
                          </Button>
                          <Button variant="ghost" size="sm">
                            List
                          </Button>
                          <Button variant="ghost" size="sm">
                            Image
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        id="edit-template-content"
                        rows={10}
                        value={editingTemplate.content}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, content: e.target.value })}
                      />
                      <div className="mt-2 text-xs text-muted-foreground">
                        Available variables: {"{name}"}, {"{company}"}, {"{link}"}, {"{date}"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditingTemplate(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveTemplate}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Preview Email Template Dialog */}
          <Dialog open={isPreviewingTemplate} onOpenChange={setIsPreviewingTemplate}>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Email Template Preview</DialogTitle>
                <DialogDescription>Preview how the email will appear to recipients.</DialogDescription>
              </DialogHeader>
              {previewTemplate && (
                <div className="py-4">
                  <div className="bg-gray-50 border rounded-md p-4">
                    <div className="border-b pb-2 mb-4">
                      <div className="text-sm text-gray-500">
                        From: Employee Advocacy Platform &lt;noreply@employeeadvocacy.com&gt;
                      </div>
                      <div className="text-sm text-gray-500">To: John Doe &lt;john.doe@example.com&gt;</div>
                      <div className="text-sm text-gray-500">Subject: {previewTemplate.subject}</div>
                    </div>
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: previewTemplate.content
                          .replace(/{name}/g, "John Doe")
                          .replace(/{company}/g, "Acme Corporation")
                          .replace(/{link}/g, "#")
                          .replace(/{date}/g, format(new Date(), "MMMM dd, yyyy"))
                          .replace(/{campaign_name}/g, "Summer Social Campaign")
                          .replace(/{start_date}/g, format(new Date(), "MMMM dd, yyyy"))
                          .replace(/{end_date}/g, format(addDays(new Date(), 30), "MMMM dd, yyyy")),
                      }}
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button onClick={() => setIsPreviewingTemplate(false)}>Close Preview</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="faq">
          <div className="grid gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>FAQ Management</CardTitle>
                  <CardDescription>Manage frequently asked questions</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedFaqCategory} onValueChange={setSelectedFaqCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      {faqCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1">
                        <Plus className="h-4 w-4" />
                        Add FAQ
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Add FAQ</DialogTitle>
                        <DialogDescription>Create a new frequently asked question and answer.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="faq-question">Question</Label>
                          <Input id="faq-question" placeholder="e.g. How do I create a campaign?" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="faq-answer">Answer</Label>
                          <Textarea id="faq-answer" placeholder="Provide a clear and concise answer" rows={5} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="faq-category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {faqCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="faq-published" defaultChecked />
                          <Label htmlFor="faq-published">Published</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save FAQ</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFaqs.map((faq) => (
                      <TableRow key={faq.id}>
                        <TableCell className="font-medium">{faq.question}</TableCell>
                        <TableCell>{faq.category}</TableCell>
                        <TableCell>
                          {faq.isPublished ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                              Draft
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFaqPublished(faq.id)}
                              title={faq.isPublished ? "Unpublish" : "Publish"}
                            >
                              {faq.isPublished ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditFaq(faq)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Edit FAQ Dialog */}
          <Dialog open={isEditingFaq} onOpenChange={setIsEditingFaq}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit FAQ</DialogTitle>
                <DialogDescription>Update the frequently asked question and answer.</DialogDescription>
              </DialogHeader>
              {editingFaq && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-faq-question">Question</Label>
                    <Input
                      id="edit-faq-question"
                      value={editingFaq.question}
                      onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-faq-answer">Answer</Label>
                    <Textarea
                      id="edit-faq-answer"
                      rows={5}
                      value={editingFaq.answer}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-faq-category">Category</Label>
                    <Select
                      value={editingFaq.category}
                      onValueChange={(value) => setEditingFaq({ ...editingFaq, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {faqCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-faq-published"
                      checked={editingFaq.isPublished}
                      onCheckedChange={(checked) => setEditingFaq({ ...editingFaq, isPublished: checked })}
                    />
                    <Label htmlFor="edit-faq-published">Published</Label>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditingFaq(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveFaq}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="terms">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
                <CardDescription>Manage legal documents and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Terms of Service</h3>
                    <div className="text-xs text-muted-foreground">Last updated: April 15, 2025</div>
                  </div>
                  <Textarea rows={12} value={termsContent} onChange={(e) => setTermsContent(e.target.value)} />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => handlePreviewTerms(termsContent, "Terms of Service")}>
                      Preview
                    </Button>
                    <Button>Update Terms</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Privacy Policy</h3>
                    <div className="text-xs text-muted-foreground">Last updated: April 10, 2025</div>
                  </div>
                  <Textarea rows={12} value={privacyContent} onChange={(e) => setPrivacyContent(e.target.value)} />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => handlePreviewTerms(privacyContent, "Privacy Policy")}>
                      Preview
                    </Button>
                    <Button>Update Policy</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Cookie Policy</h3>
                    <div className="text-xs text-muted-foreground">Last updated: April 5, 2025</div>
                  </div>
                  <Textarea rows={8} value={cookieContent} onChange={(e) => setCookieContent(e.target.value)} />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => handlePreviewTerms(cookieContent, "Cookie Policy")}>
                      Preview
                    </Button>
                    <Button>Update Policy</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Terms & Conditions Preview Dialog */}
          <Dialog open={previewingTerms || previewingPrivacy || previewingCookie} onOpenChange={closePreview}>
            <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>{previewTitle} Preview</DialogTitle>
                <DialogDescription>Preview how the document will appear to users.</DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[60vh] mt-4 pr-4">
                <div className="prose prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: markdownToHtml(previewContent) }} />
                </div>
              </ScrollArea>
              <DialogFooter>
                <Button onClick={closePreview}>Close Preview</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  )
}
