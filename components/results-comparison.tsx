"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, Eye, Download, Share2, Filter } from "lucide-react"

interface ComparisonData {
  shoe: {
    id: number
    name: string
    brand: string
    color: string
    material: string
    price: number
    occasion: string
    imageUrl: string
  }
  scores: {
    color: number
    material: number
    price: number
    brand: number
    occasion: number
  }
  totalScore: number
  rank: number
  matchPercentage: number
}

const sampleComparisons: ComparisonData[] = [
  {
    shoe: {
      id: 1,
      name: "Air Force 1",
      brand: "Nike",
      color: "White",
      material: "Leather",
      price: 1299000,
      occasion: "Casual",
      imageUrl: "/placeholder.svg?height=150&width=150",
    },
    scores: { color: 9.2, material: 8.5, price: 7.8, brand: 9.0, occasion: 8.8 },
    totalScore: 8.66,
    rank: 1,
    matchPercentage: 87,
  },
  {
    shoe: {
      id: 2,
      name: "Ultraboost 22",
      brand: "Adidas",
      color: "Black",
      material: "Primeknit",
      price: 2299000,
      occasion: "Sport",
      imageUrl: "/placeholder.svg?height=150&width=150",
    },
    scores: { color: 8.8, material: 9.2, price: 6.5, brand: 8.7, occasion: 9.1 },
    totalScore: 8.46,
    rank: 2,
    matchPercentage: 85,
  },
  {
    shoe: {
      id: 3,
      name: "Chuck Taylor",
      brand: "Converse",
      color: "Red",
      material: "Canvas",
      price: 699000,
      occasion: "Casual",
      imageUrl: "/placeholder.svg?height=150&width=150",
    },
    scores: { color: 7.5, material: 7.2, price: 9.5, brand: 7.8, occasion: 8.2 },
    totalScore: 8.04,
    rank: 3,
    matchPercentage: 80,
  },
]

export default function ResultsComparison() {
  const [selectedShoes, setSelectedShoes] = useState<number[]>([1, 2, 3])
  const [viewMode, setViewMode] = useState<"grid" | "table" | "chart">("grid")

  const toggleShoeSelection = (shoeId: number) => {
    setSelectedShoes((prev) => (prev.includes(shoeId) ? prev.filter((id) => id !== shoeId) : [...prev, shoeId]))
  }

  const selectedComparisons = sampleComparisons.filter((comp) => selectedShoes.includes(comp.shoe.id))

  // Prepare data for charts
  const chartData = selectedComparisons.map((comp) => ({
    name: comp.shoe.name,
    color: comp.scores.color,
    material: comp.scores.material,
    price: comp.scores.price,
    brand: comp.scores.brand,
    occasion: comp.scores.occasion,
    total: comp.totalScore,
  }))

  const radarData = [
    {
      criteria: "Warna",
      ...Object.fromEntries(selectedComparisons.map((comp) => [comp.shoe.name, comp.scores.color])),
    },
    {
      criteria: "Bahan",
      ...Object.fromEntries(selectedComparisons.map((comp) => [comp.shoe.name, comp.scores.material])),
    },
    {
      criteria: "Harga",
      ...Object.fromEntries(selectedComparisons.map((comp) => [comp.shoe.name, comp.scores.price])),
    },
    {
      criteria: "Brand",
      ...Object.fromEntries(selectedComparisons.map((comp) => [comp.shoe.name, comp.scores.brand])),
    },
    {
      criteria: "Kesempatan",
      ...Object.fromEntries(selectedComparisons.map((comp) => [comp.shoe.name, comp.scores.occasion])),
    },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Perbandingan Hasil</span>
          </CardTitle>
          <CardDescription>Bandingkan sepatu berdasarkan skor evaluasi dan kriteria yang berbeda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Tampilan:</span>
                <div className="flex rounded-lg border">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className="rounded-none border-x"
                  >
                    Tabel
                  </Button>
                  <Button
                    variant={viewMode === "chart" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("chart")}
                    className="rounded-l-none"
                  >
                    Chart
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shoe Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Pilih Sepatu untuk Dibandingkan</CardTitle>
          <CardDescription>Klik pada sepatu untuk menambah/menghapus dari perbandingan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleComparisons.map((comp) => (
              <div
                key={comp.shoe.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedShoes.includes(comp.shoe.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => toggleShoeSelection(comp.shoe.id)}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={comp.shoe.imageUrl || "/placeholder.svg"}
                    alt={comp.shoe.name}
                    className="w-12 h-12 rounded-lg object-cover bg-muted"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{comp.shoe.name}</p>
                    <p className="text-sm text-muted-foreground">{comp.shoe.brand}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        #{comp.rank}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{comp.matchPercentage}% match</span>
                    </div>
                  </div>
                  {selectedShoes.includes(comp.shoe.id) && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Display */}
      {selectedComparisons.length > 0 && (
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="chart">Chart View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedComparisons.map((comp) => (
                <Card key={comp.shoe.id} className={comp.rank === 1 ? "ring-2 ring-primary" : ""}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={comp.shoe.imageUrl || "/placeholder.svg"}
                          alt={comp.shoe.name}
                          className="w-full h-48 object-cover rounded-lg bg-muted"
                        />
                        <Badge variant={comp.rank === 1 ? "default" : "secondary"} className="absolute top-2 right-2">
                          #{comp.rank}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{comp.shoe.name}</h3>
                        <p className="text-muted-foreground">{comp.shoe.brand}</p>
                        <p className="text-lg font-semibold text-primary">Rp {comp.shoe.price.toLocaleString()}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Total Score:</span>
                          <span className="font-bold text-primary">{comp.totalScore.toFixed(2)}</span>
                        </div>
                        <Progress value={comp.matchPercentage} className="h-2" />
                        <p className="text-xs text-muted-foreground text-center">{comp.matchPercentage}% match</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span>Warna:</span>
                          <span className="font-medium">{comp.scores.color.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bahan:</span>
                          <span className="font-medium">{comp.scores.material.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Harga:</span>
                          <span className="font-medium">{comp.scores.price.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Brand:</span>
                          <span className="font-medium">{comp.scores.brand.toFixed(1)}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Detail
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="table">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4">Sepatu</th>
                        <th className="text-center p-4">Rank</th>
                        <th className="text-center p-4">Warna</th>
                        <th className="text-center p-4">Bahan</th>
                        <th className="text-center p-4">Harga</th>
                        <th className="text-center p-4">Brand</th>
                        <th className="text-center p-4">Kesempatan</th>
                        <th className="text-center p-4">Total</th>
                        <th className="text-center p-4">Match</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedComparisons.map((comp) => (
                        <tr key={comp.shoe.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={comp.shoe.imageUrl || "/placeholder.svg"}
                                alt={comp.shoe.name}
                                className="w-12 h-12 rounded-lg object-cover bg-muted"
                              />
                              <div>
                                <p className="font-medium">{comp.shoe.name}</p>
                                <p className="text-sm text-muted-foreground">{comp.shoe.brand}</p>
                              </div>
                            </div>
                          </td>
                          <td className="text-center p-4">
                            <Badge variant={comp.rank === 1 ? "default" : "secondary"}>#{comp.rank}</Badge>
                          </td>
                          <td className="text-center p-4 font-medium">{comp.scores.color.toFixed(1)}</td>
                          <td className="text-center p-4 font-medium">{comp.scores.material.toFixed(1)}</td>
                          <td className="text-center p-4 font-medium">{comp.scores.price.toFixed(1)}</td>
                          <td className="text-center p-4 font-medium">{comp.scores.brand.toFixed(1)}</td>
                          <td className="text-center p-4 font-medium">{comp.scores.occasion.toFixed(1)}</td>
                          <td className="text-center p-4">
                            <span className="font-bold text-primary">{comp.totalScore.toFixed(2)}</span>
                          </td>
                          <td className="text-center p-4">
                            <div className="space-y-1">
                              <div className="text-sm font-medium">{comp.matchPercentage}%</div>
                              <Progress value={comp.matchPercentage} className="h-1 w-16 mx-auto" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chart">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Perbandingan Skor per Kriteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="color" fill="#059669" name="Warna" />
                      <Bar dataKey="material" fill="#0891b2" name="Bahan" />
                      <Bar dataKey="price" fill="#164e63" name="Harga" />
                      <Bar dataKey="brand" fill="#10b981" name="Brand" />
                      <Bar dataKey="occasion" fill="#ecfeff" name="Kesempatan" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Radar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Profil Performa</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="criteria" />
                      <PolarRadiusAxis angle={90} domain={[0, 10]} />
                      {selectedComparisons.map((comp, index) => (
                        <Radar
                          key={comp.shoe.id}
                          name={comp.shoe.name}
                          dataKey={comp.shoe.name}
                          stroke={`hsl(${index * 120}, 70%, 50%)`}
                          fill={`hsl(${index * 120}, 70%, 50%)`}
                          fillOpacity={0.1}
                        />
                      ))}
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Summary Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Statistik</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedComparisons.map((comp) => (
                    <div key={comp.shoe.id} className="text-center space-y-2">
                      <h4 className="font-semibold">{comp.shoe.name}</h4>
                      <div className="text-3xl font-bold text-primary">{comp.totalScore.toFixed(2)}</div>
                      <p className="text-sm text-muted-foreground">Skor Total</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Tertinggi:</span>
                          <span className="font-medium">{Math.max(...Object.values(comp.scores)).toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Terendah:</span>
                          <span className="font-medium">{Math.min(...Object.values(comp.scores)).toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
