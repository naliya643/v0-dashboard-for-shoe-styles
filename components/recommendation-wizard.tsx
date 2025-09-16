"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Wand2, ChevronRight, ChevronLeft, Target, Sparkles } from "lucide-react"
import {
  RecommendationEngine,
  type CriteriaWeights,
  type UserPreferences,
  type Shoe,
} from "@/lib/recommendation-engine"

const steps = [
  { id: 1, title: "Preferensi Warna", description: "Pilih warna sepatu yang Anda sukai" },
  { id: 2, title: "Bahan & Material", description: "Tentukan bahan sepatu yang diinginkan" },
  { id: 3, title: "Budget & Harga", description: "Atur range harga sesuai budget" },
  { id: 4, title: "Brand & Kesempatan", description: "Pilih brand dan occasion favorit" },
  { id: 5, title: "Bobot Kriteria", description: "Sesuaikan tingkat kepentingan setiap kriteria" },
]

const colors = ["Black", "White", "Brown", "Navy", "Red", "Blue", "Gray", "Green", "Tan", "Beige"]
const materials = ["Leather", "Canvas", "Mesh", "Suede", "Synthetic", "Primeknit", "Rubber"]
const brands = ["Nike", "Adidas", "Converse", "Vans", "Clarks", "Puma", "New Balance", "Reebok"]
const occasions = ["Casual", "Sport", "Formal", "Party", "Work", "Travel", "Beach", "Hiking"]

// Sample shoes data
const sampleShoes: Shoe[] = [
  {
    id: 1,
    name: "Air Force 1",
    brand: "Nike",
    color: "White",
    material: "Leather",
    price: 1299000,
    occasion: "Casual",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Ultraboost 22",
    brand: "Adidas",
    color: "Black",
    material: "Primeknit",
    price: 2299000,
    occasion: "Sport",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Chuck Taylor",
    brand: "Converse",
    color: "Red",
    material: "Canvas",
    price: 699000,
    occasion: "Casual",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Stan Smith",
    brand: "Adidas",
    color: "White",
    material: "Leather",
    price: 1199000,
    occasion: "Casual",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Old Skool",
    brand: "Vans",
    color: "Black",
    material: "Canvas",
    price: 799000,
    occasion: "Casual",
    imageUrl: "/placeholder.svg?height=200&width=200",
  },
]

export default function RecommendationWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [preferences, setPreferences] = useState<UserPreferences>({
    preferredColors: [],
    preferredMaterials: [],
    minPrice: 500000,
    maxPrice: 2000000,
    preferredBrands: [],
    preferredOccasions: [],
  })
  const [weights, setWeights] = useState<CriteriaWeights>({
    color: 20,
    material: 20,
    price: 25,
    brand: 15,
    occasion: 20,
  })
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const togglePreference = (type: keyof UserPreferences, value: string) => {
    if (Array.isArray(preferences[type])) {
      const currentArray = preferences[type] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value]

      setPreferences((prev) => ({ ...prev, [type]: newArray }))
    }
  }

  const handleWeightChange = (criterion: keyof CriteriaWeights, value: number[]) => {
    setWeights((prev) => ({ ...prev, [criterion]: value[0] }))
  }

  const generateRecommendations = () => {
    setIsGenerating(true)

    setTimeout(() => {
      const normalizedWeights = {
        color: weights.color / 100,
        material: weights.material / 100,
        price: weights.price / 100,
        brand: weights.brand / 100,
        occasion: weights.occasion / 100,
      }

      const engine = new RecommendationEngine(normalizedWeights, preferences)
      const results = engine.getTopRecommendations(sampleShoes, 5)

      setRecommendations(results)
      setIsGenerating(false)
    }, 2000)
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      generateRecommendations()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wand2 className="w-5 h-5 text-primary" />
            <span>Wizard Rekomendasi Sepatu</span>
          </CardTitle>
          <CardDescription>
            Ikuti langkah-langkah berikut untuk mendapatkan rekomendasi sepatu yang sesuai dengan preferensi Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Langkah {currentStep} dari {steps.length}
              </span>
              <span className="text-sm font-medium">{Math.round((currentStep / steps.length) * 100)}% selesai</span>
            </div>
            <Progress value={(currentStep / steps.length) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`text-center ${step.id === currentStep ? "text-primary font-medium" : ""}`}
                >
                  {step.title}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {currentStep <= steps.length && (
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Color Preferences */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <Label>Pilih warna yang Anda sukai (bisa lebih dari satu)</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {colors.map((color) => (
                    <Button
                      key={color}
                      variant={preferences.preferredColors.includes(color) ? "default" : "outline"}
                      onClick={() => togglePreference("preferredColors", color)}
                      className="justify-start bg-transparent"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {preferences.preferredColors.map((color) => (
                    <Badge key={color} variant="secondary">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Material Preferences */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <Label>Pilih bahan sepatu yang Anda inginkan</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {materials.map((material) => (
                    <Button
                      key={material}
                      variant={preferences.preferredMaterials.includes(material) ? "default" : "outline"}
                      onClick={() => togglePreference("preferredMaterials", material)}
                      className="justify-start bg-transparent"
                    >
                      {material}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {preferences.preferredMaterials.map((material) => (
                    <Badge key={material} variant="secondary">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Price Range */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label>Harga Minimum</Label>
                    <div className="text-2xl font-bold text-primary">Rp {preferences.minPrice.toLocaleString()}</div>
                    <Slider
                      value={[preferences.minPrice]}
                      onValueChange={(value) => setPreferences((prev) => ({ ...prev, minPrice: value[0] }))}
                      max={3000000}
                      min={100000}
                      step={100000}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>Harga Maksimum</Label>
                    <div className="text-2xl font-bold text-primary">Rp {preferences.maxPrice.toLocaleString()}</div>
                    <Slider
                      value={[preferences.maxPrice]}
                      onValueChange={(value) => setPreferences((prev) => ({ ...prev, maxPrice: value[0] }))}
                      max={5000000}
                      min={500000}
                      step={100000}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Budget Anda: Rp {preferences.minPrice.toLocaleString()} - Rp {preferences.maxPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Brand & Occasion */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Brand Favorit</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {brands.map((brand) => (
                      <Button
                        key={brand}
                        variant={preferences.preferredBrands.includes(brand) ? "default" : "outline"}
                        onClick={() => togglePreference("preferredBrands", brand)}
                        className="justify-start bg-transparent"
                      >
                        {brand}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Kesempatan Penggunaan</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {occasions.map((occasion) => (
                      <Button
                        key={occasion}
                        variant={preferences.preferredOccasions.includes(occasion) ? "default" : "outline"}
                        onClick={() => togglePreference("preferredOccasions", occasion)}
                        className="justify-start bg-transparent"
                      >
                        {occasion}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Criteria Weights */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(weights).map(([criterion, weight]) => (
                    <div key={criterion} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="capitalize">
                          {criterion === "color"
                            ? "Warna"
                            : criterion === "material"
                              ? "Bahan"
                              : criterion === "price"
                                ? "Harga"
                                : criterion === "brand"
                                  ? "Brand"
                                  : "Kesempatan"}
                        </Label>
                        <Badge variant="outline">{weight}%</Badge>
                      </div>
                      <Slider
                        value={[weight]}
                        onValueChange={(value) => handleWeightChange(criterion as keyof CriteriaWeights, value)}
                        max={50}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Total bobot: {totalWeight}%
                    {totalWeight === 100 ? (
                      <span className="text-green-600 ml-2">✓ Seimbang</span>
                    ) : (
                      <span className="text-orange-600 ml-2">⚠ Tidak seimbang</span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      {currentStep <= steps.length && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="bg-transparent">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Sebelumnya
          </Button>
          <Button onClick={nextStep}>
            {currentStep === steps.length ? (
              <>
                <Target className="w-4 h-4 mr-2" />
                Generate Rekomendasi
              </>
            ) : (
              <>
                Selanjutnya
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* Results */}
      {isGenerating && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-lg font-medium">Menganalisis preferensi Anda...</p>
              <p className="text-sm text-muted-foreground">Mohon tunggu sebentar</p>
            </div>
          </CardContent>
        </Card>
      )}

      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span>Rekomendasi Untuk Anda</span>
            </CardTitle>
            <CardDescription>Berdasarkan preferensi dan kriteria yang Anda tentukan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.slice(0, 3).map((rec, index) => (
                <Card key={rec.shoe.id} className={`${index === 0 ? "ring-2 ring-primary" : ""}`}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={rec.shoe.imageUrl || "/placeholder.svg"}
                          alt={rec.shoe.name}
                          className="w-full h-48 object-cover rounded-lg bg-muted"
                        />
                        {index === 0 && (
                          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">Terbaik</Badge>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{rec.shoe.name}</h3>
                        <p className="text-muted-foreground">{rec.shoe.brand}</p>
                        <p className="text-lg font-semibold text-primary">Rp {rec.shoe.price.toLocaleString()}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Match Score:</span>
                          <span className="font-bold text-primary">{rec.matchPercentage.toFixed(0)}%</span>
                        </div>
                        <Progress value={rec.matchPercentage} className="h-2" />
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          {rec.shoe.color}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {rec.shoe.material}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {rec.shoe.occasion}
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
