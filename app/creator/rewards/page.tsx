import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, CreditCard, ShoppingBag, Coffee, Ticket, Smartphone, Headphones } from "lucide-react"

export default function Rewards() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rewards Catalog</h1>
          <p className="text-muted-foreground">Redeem your points for exciting rewards</p>
        </div>
        <div className="mt-4 md:mt-0 p-4 bg-slate-100 rounded-lg flex items-center gap-3">
          <Award className="h-5 w-5 text-slate-600" />
          <div>
            <p className="text-sm font-medium">Your Points Balance</p>
            <p className="text-2xl font-bold">3,250</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="all">All Rewards</TabsTrigger>
          <TabsTrigger value="gift-cards">Gift Cards</TabsTrigger>
          <TabsTrigger value="merchandise">Merchandise</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Gift Card 1 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Rp 500.000 Gift Card</CardTitle>
                  <Badge>2,500 pts</Badge>
                </div>
                <CardDescription>E-commerce gift card</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Redeem your points for a Rp 500.000 gift card that can be used at any major online retailer.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>

            {/* Gift Card 2 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Rp 250.000 Gift Card</CardTitle>
                  <Badge>1,250 pts</Badge>
                </div>
                <CardDescription>E-commerce gift card</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Redeem your points for a Rp 250.000 gift card that can be used at any major online retailer.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>

            {/* Merchandise 1 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Company Branded Backpack</CardTitle>
                  <Badge>1,000 pts</Badge>
                </div>
                <CardDescription>Premium merchandise</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingBag className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  High-quality backpack with company branding, perfect for work or travel.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>

            {/* Experience 1 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Coffee Shop Gift Card</CardTitle>
                  <Badge>750 pts</Badge>
                </div>
                <CardDescription>Food & beverage</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Coffee className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enjoy your favorite coffee and treats with a Rp 150.000 gift card to a popular coffee chain.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>

            {/* Experience 2 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Movie Tickets</CardTitle>
                  <Badge>500 pts</Badge>
                </div>
                <CardDescription>Entertainment</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Ticket className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Two movie tickets to enjoy the latest blockbuster at your local cinema.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>

            {/* Merchandise 2 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Wireless Earbuds</CardTitle>
                  <Badge>2,000 pts</Badge>
                </div>
                <CardDescription>Electronics</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Headphones className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  High-quality wireless earbuds with noise cancellation and long battery life.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gift-cards" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Gift Card 1 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Rp 500.000 Gift Card</CardTitle>
                  <Badge>2,500 pts</Badge>
                </div>
                <CardDescription>E-commerce gift card</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Redeem your points for a Rp 500.000 gift card that can be used at any major online retailer.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>

            {/* Gift Card 2 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Rp 250.000 Gift Card</CardTitle>
                  <Badge>1,250 pts</Badge>
                </div>
                <CardDescription>E-commerce gift card</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Redeem your points for a Rp 250.000 gift card that can be used at any major online retailer.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>

            {/* Gift Card 3 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Rp 100.000 Gift Card</CardTitle>
                  <Badge>500 pts</Badge>
                </div>
                <CardDescription>E-commerce gift card</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Redeem your points for a Rp 100.000 gift card that can be used at any major online retailer.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="merchandise" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Merchandise 1 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Company Branded Backpack</CardTitle>
                  <Badge>1,000 pts</Badge>
                </div>
                <CardDescription>Premium merchandise</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingBag className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  High-quality backpack with company branding, perfect for work or travel.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>

            {/* Merchandise 2 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Wireless Earbuds</CardTitle>
                  <Badge>2,000 pts</Badge>
                </div>
                <CardDescription>Electronics</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Headphones className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  High-quality wireless earbuds with noise cancellation and long battery life.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>

            {/* Merchandise 3 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Power Bank</CardTitle>
                  <Badge>750 pts</Badge>
                </div>
                <CardDescription>Electronics</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  10,000mAh power bank to keep your devices charged on the go.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="experiences" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Experience 1 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Coffee Shop Gift Card</CardTitle>
                  <Badge>750 pts</Badge>
                </div>
                <CardDescription>Food & beverage</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Coffee className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enjoy your favorite coffee and treats with a Rp 150.000 gift card to a popular coffee chain.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>

            {/* Experience 2 */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>Movie Tickets</CardTitle>
                  <Badge>500 pts</Badge>
                </div>
                <CardDescription>Entertainment</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Ticket className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Two movie tickets to enjoy the latest blockbuster at your local cinema.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem Reward</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
