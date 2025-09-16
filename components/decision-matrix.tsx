"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calculator, TrendingUp, Award, Eye, BarChart3 } from "lucide-react"

interface Shoe {
  id: number
  name: string
  brand: string
  color: string
  material: string
  price: number
  occasion: string
  imageUrl: string
}

interface CriteriaScore {
  color: number
  material: number
  price: number
  brand: number
  occasion: number
}

interface ShoeEvaluation {
  shoe: Shoe
  scores: CriteriaScore
  weightedScore: number
  totalScore: number
  rank: number
}

const sampleShoes: Shoe[] = [
  {
    id: 1,
    name: "Air Force 1",
    brand: "Nike",
    color: "White",
    material: "Leather",
    price: 1299000,
    occasion: "Casual",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Ultraboost 22",
    brand: "Adidas",
    color: "Black",
    material: "Primeknit",
    price: 2299000,
    occasion: "Sport",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Chuck Taylor",
    brand: "Converse",
    color: "Red",
    material: "Canvas",
    price: 699000,
    occasion: "Casual",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Oxford Classic",
    brand: "Clarks",
    color: "Brown",
    material: "Leather",
    price: 1899000,
    occasion: "Formal",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "Old Skool",
    brand: "Vans",
    color: "Black",
    material: "Canvas",
    price: 799000,
    occasion: "Casual",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
]

const criteriaWeights = {
  color: 0.2,
  material: 0.2,
  price: 0.25,
  brand: 0.15,
  occasion: 0.2,
}

export default function DecisionMatrix() {
  const [evaluations, setEvaluations] = useState<ShoeEvaluation[]>([])
  const [isCalculating, setIsCalculating] = useState(false)

  // Mock scoring function - in real app, this would be more sophisticated
  const calculateScore = (shoe: Shoe): CriteriaScore => {
    return {
      color: Math.random() * 10, // 0-10 scale
      material: Math.random() * 10,
      price: Math.max(0, 10 - shoe.price / 300000), // Lower price = higher score
      brand: Math.random() * 10,
      occasion: Math.random() * 10,
    }
  }

  const calculateWeightedScore = (scores: CriteriaScore): number => {
    return (
      scores.color * criteriaWeights.color +
      scores.material * criteriaWeights.material +
      scores.price * criteriaWeights.price +
      scores.brand * criteriaWeights.brand +
      scores.occasion * criteriaWeights.occasion
    )
  }

  const runEvaluation = () => {
    setIsCalculating(true)

    setTimeout(() => {
      const newEvaluations: ShoeEvaluation[] = sampleShoes.map((shoe) => {
        const scores = calculateScore(shoe)
        const weightedScore = calculateWeightedScore(scores)
        return {
          shoe,
          scores,
          weightedScore,
          totalScore: weightedScore,
          rank: 0, // Will be set after sorting
        }
      })

      // Sort by total score and assign ranks
      newEvaluations.sort((a, b) => b.totalScore - a.totalScore)
      newEvaluations.forEach((evaluation, index) => {
        evaluation.rank = index + 1
      })

      setEvaluations(newEvaluations)
      setIsCalculating(false)
    }, 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600"
    if (score >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getRankBadgeVariant = (rank: number) => {
    if (rank === 1) return "default"
    if (rank <= 3) return "secondary"
    return "outline"
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-primary" />
            <span>Matriks Keputusan SPK</span>
          </CardTitle>
          <CardDescription>
            Evaluasi dan perbandingan sepatu berdasarkan kriteria yang telah ditentukan menggunakan metode Weighted Sum
            Model (WSM)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {evaluations.length > 0 ? `${evaluations.length} sepatu telah dievaluasi` : "Belum ada evaluasi"}
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>Warna: {(criteriaWeights.color * 100).toFixed(0)}%</span>
                <span>Bahan: {(criteriaWeights.material * 100).toFixed(0)}%</span>
                <span>Harga: {(criteriaWeights.price * 100).toFixed(0)}%</span>
                <span>Brand: {(criteriaWeights.brand * 100).toFixed(0)}%</span>
                <span>Kesempatan: {(criteriaWeights.occasion * 100).toFixed(0)}%</span>
              </div>
            </div>
            <Button onClick={runEvaluation} disabled={isCalculating} className="flex items-center space-x-2">
              {isCalculating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menghitung...</span>
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4" />
                  <span>Jalankan Evaluasi</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      {evaluations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <span>Hasil Evaluasi</span>
            </CardTitle>
            <CardDescription>Ranking sepatu berdasarkan skor total yang dihitung</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Rank</TableHead>
                    <TableHead className="min-w-[200px]">Sepatu</TableHead>
                    <TableHead className="text-center">Warna</TableHead>
                    <TableHead className="text-center">Bahan</TableHead>
                    <TableHead className="text-center">Harga</TableHead>
                    <TableHead className="text-center">Brand</TableHead>
                    <TableHead className="text-center">Kesempatan</TableHead>
                    <TableHead className="text-center">Skor Total</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evaluations.map((evaluation) => (
                    <TableRow key={evaluation.shoe.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Badge
                          variant={getRankBadgeVariant(evaluation.rank)}
                          className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                        >
                          {evaluation.rank}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={evaluation.shoe.imageUrl || "/placeholder.svg"}
                            alt={evaluation.shoe.name}
                            className="w-12 h-12 rounded-lg object-cover bg-muted"
                          />
                          <div>
                            <p className="font-medium">{evaluation.shoe.name}</p>
                            <p className="text-sm text-muted-foreground">{evaluation.shoe.brand}</p>
                            <p className="text-xs text-muted-foreground">Rp {evaluation.shoe.price.toLocaleString()}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className={`font-medium ${getScoreColor(evaluation.scores.color)}`}>
                            {evaluation.scores.color.toFixed(1)}
                          </div>
                          <Progress value={evaluation.scores.color * 10} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className={`font-medium ${getScoreColor(evaluation.scores.material)}`}>
                            {evaluation.scores.material.toFixed(1)}
                          </div>
                          <Progress value={evaluation.scores.material * 10} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className={`font-medium ${getScoreColor(evaluation.scores.price)}`}>
                            {evaluation.scores.price.toFixed(1)}
                          </div>
                          <Progress value={evaluation.scores.price * 10} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className={`font-medium ${getScoreColor(evaluation.scores.brand)}`}>
                            {evaluation.scores.brand.toFixed(1)}
                          </div>
                          <Progress value={evaluation.scores.brand * 10} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className={`font-medium ${getScoreColor(evaluation.scores.occasion)}`}>
                            {evaluation.scores.occasion.toFixed(1)}
                          </div>
                          <Progress value={evaluation.scores.occasion * 10} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1">
                          <div className="text-lg font-bold text-primary">{evaluation.totalScore.toFixed(2)}</div>
                          <Progress value={evaluation.totalScore * 10} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top 3 Recommendations */}
      {evaluations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span>Top 3 Rekomendasi</span>
            </CardTitle>
            <CardDescription>Sepatu dengan skor tertinggi berdasarkan kriteria Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {evaluations.slice(0, 3).map((evaluation, index) => (
                <Card key={evaluation.shoe.id} className={`relative ${index === 0 ? "ring-2 ring-primary" : ""}`}>
                  {index === 0 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Terbaik</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <img
                        src={evaluation.shoe.imageUrl || "/placeholder.svg"}
                        alt={evaluation.shoe.name}
                        className="w-24 h-24 mx-auto rounded-lg object-cover bg-muted"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{evaluation.shoe.name}</h3>
                        <p className="text-muted-foreground">{evaluation.shoe.brand}</p>
                        <p className="text-sm font-medium">Rp {evaluation.shoe.price.toLocaleString()}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Skor Total:</span>
                          <span className="font-bold text-primary">{evaluation.totalScore.toFixed(2)}</span>
                        </div>
                        <Progress value={evaluation.totalScore * 10} className="h-2" />
                      </div>
                      <div className="flex flex-wrap gap-1 justify-center">
                        <Badge variant="outline" className="text-xs">
                          {evaluation.shoe.color}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {evaluation.shoe.material}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {evaluation.shoe.occasion}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
