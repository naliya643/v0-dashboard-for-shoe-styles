import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Settings, Zap, TrendingUp, Filter, Search } from "lucide-react"
import ShoeInputForm from "@/components/shoe-input-form"
import CriteriaSettings from "@/components/criteria-settings"
import DecisionMatrix from "@/components/decision-matrix"
import RecommendationWizard from "@/components/recommendation-wizard"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">SPK Sepatu</h1>
              </div>
              <Badge variant="secondary" className="text-xs">
                Sistem Pendukung Keputusan
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Pengaturan
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2 text-balance">Temukan Sepatu Ideal Anda</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Gunakan sistem pendukung keputusan untuk menemukan sepatu yang paling sesuai dengan kriteria dan preferensi
            Anda.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Sepatu</CardTitle>
              <div className="text-2xl font-bold text-foreground">156</div>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-secondary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Brand Tersedia</CardTitle>
              <div className="text-2xl font-bold text-foreground">12</div>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-chart-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Evaluasi Hari Ini</CardTitle>
              <div className="text-2xl font-bold text-foreground">24</div>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-chart-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Akurasi Sistem</CardTitle>
              <div className="text-2xl font-bold text-foreground">94%</div>
            </CardHeader>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="wizard">Wizard</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluasi</TabsTrigger>
            <TabsTrigger value="criteria">Kriteria</TabsTrigger>
            <TabsTrigger value="input">Input Data</TabsTrigger>
            <TabsTrigger value="results">Hasil</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span>Mulai Evaluasi</span>
                  </CardTitle>
                  <CardDescription>Mulai proses evaluasi sepatu berdasarkan kriteria Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" size="lg">
                    <Search className="w-4 h-4 mr-2" />
                    Evaluasi Sepatu Baru
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Filter className="w-4 h-4 mr-2" />
                      Set Kriteria
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Lihat Hasil
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                    <span>Aktivitas Terbaru</span>
                  </CardTitle>
                  <CardDescription>Evaluasi dan rekomendasi terbaru</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Nike Air Force 1</p>
                        <p className="text-xs text-muted-foreground">Skor: 8.5/10</p>
                      </div>
                      <Badge variant="secondary">Casual</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Adidas Ultraboost</p>
                        <p className="text-xs text-muted-foreground">Skor: 9.2/10</p>
                      </div>
                      <Badge variant="secondary">Sport</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Clarks Oxford</p>
                        <p className="text-xs text-muted-foreground">Skor: 7.8/10</p>
                      </div>
                      <Badge variant="secondary">Formal</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popular Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Kategori Populer</CardTitle>
                <CardDescription>Kategori sepatu yang paling sering dievaluasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">👟</div>
                    <p className="font-medium text-sm">Casual</p>
                    <p className="text-xs text-muted-foreground">45%</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">🏃</div>
                    <p className="font-medium text-sm">Sport</p>
                    <p className="text-xs text-muted-foreground">30%</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">👔</div>
                    <p className="font-medium text-sm">Formal</p>
                    <p className="text-xs text-muted-foreground">15%</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">🥾</div>
                    <p className="font-medium text-sm">Boots</p>
                    <p className="text-xs text-muted-foreground">7%</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">🩴</div>
                    <p className="font-medium text-sm">Sandal</p>
                    <p className="text-xs text-muted-foreground">3%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wizard">
            <RecommendationWizard />
          </TabsContent>

          <TabsContent value="evaluation">
            <DecisionMatrix />
          </TabsContent>

          <TabsContent value="criteria">
            <CriteriaSettings />
          </TabsContent>

          <TabsContent value="input">
            <ShoeInputForm />
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Hasil Rekomendasi</CardTitle>
                <CardDescription>Lihat hasil evaluasi dan rekomendasi sepatu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Gunakan tab "Wizard" atau "Evaluasi" untuk mendapatkan rekomendasi
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
