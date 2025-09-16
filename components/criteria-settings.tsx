"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Save, RotateCcw, Palette, Package, DollarSign, Award, Calendar } from "lucide-react"

interface CriteriaWeights {
  color: number
  material: number
  price: number
  brand: number
  occasion: number
}

interface UserPreferences {
  preferredColors: string[]
  preferredMaterials: string[]
  minPrice: number
  maxPrice: number
  preferredBrands: string[]
  preferredOccasions: string[]
}

const colors = ["Black", "White", "Brown", "Navy", "Red", "Blue", "Gray", "Green", "Tan", "Beige"]
const materials = ["Leather", "Canvas", "Mesh", "Suede", "Synthetic", "Primeknit", "Rubber"]
const brands = ["Nike", "Adidas", "Converse", "Vans", "Clarks", "Puma", "New Balance", "Reebok"]
const occasions = ["Casual", "Sport", "Formal", "Party", "Work", "Travel", "Beach", "Hiking"]

export default function CriteriaSettings() {
  const [weights, setWeights] = useState<CriteriaWeights>({
    color: 20,
    material: 20,
    price: 20,
    brand: 20,
    occasion: 20,
  })

  const [preferences, setPreferences] = useState<UserPreferences>({
    preferredColors: [],
    preferredMaterials: [],
    minPrice: 500000,
    maxPrice: 3000000,
    preferredBrands: [],
    preferredOccasions: [],
  })

  const handleWeightChange = (criterion: keyof CriteriaWeights, value: number[]) => {
    setWeights((prev) => ({ ...prev, [criterion]: value[0] }))
  }

  const resetToDefault = () => {
    setWeights({
      color: 20,
      material: 20,
      price: 20,
      brand: 20,
      occasion: 20,
    })
  }

  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0)

  const addPreference = (type: keyof UserPreferences, value: string) => {
    if (Array.isArray(preferences[type])) {
      const currentArray = preferences[type] as string[]
      if (!currentArray.includes(value)) {
        setPreferences((prev) => ({
          ...prev,
          [type]: [...currentArray, value],
        }))
      }
    }
  }

  const removePreference = (type: keyof UserPreferences, value: string) => {
    if (Array.isArray(preferences[type])) {
      const currentArray = preferences[type] as string[]
      setPreferences((prev) => ({
        ...prev,
        [type]: currentArray.filter((item) => item !== value),
      }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Criteria Weights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-primary" />
            <span>Bobot Kriteria</span>
          </CardTitle>
          <CardDescription>
            Atur tingkat kepentingan setiap kriteria dalam evaluasi sepatu (Total: {totalWeight}%)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Weight */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-chart-1" />
                  <span>Warna</span>
                </Label>
                <Badge variant="outline">{weights.color}%</Badge>
              </div>
              <Slider
                value={[weights.color]}
                onValueChange={(value) => handleWeightChange("color", value)}
                max={50}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            {/* Material Weight */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-chart-2" />
                  <span>Bahan</span>
                </Label>
                <Badge variant="outline">{weights.material}%</Badge>
              </div>
              <Slider
                value={[weights.material]}
                onValueChange={(value) => handleWeightChange("material", value)}
                max={50}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            {/* Price Weight */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-chart-3" />
                  <span>Harga</span>
                </Label>
                <Badge variant="outline">{weights.price}%</Badge>
              </div>
              <Slider
                value={[weights.price]}
                onValueChange={(value) => handleWeightChange("price", value)}
                max={50}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            {/* Brand Weight */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-chart-4" />
                  <span>Brand</span>
                </Label>
                <Badge variant="outline">{weights.brand}%</Badge>
              </div>
              <Slider
                value={[weights.brand]}
                onValueChange={(value) => handleWeightChange("brand", value)}
                max={50}
                min={0}
                step={5}
                className="w-full"
              />
            </div>

            {/* Occasion Weight */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-chart-5" />
                  <span>Kesempatan</span>
                </Label>
                <Badge variant="outline">{weights.occasion}%</Badge>
              </div>
              <Slider
                value={[weights.occasion]}
                onValueChange={(value) => handleWeightChange("occasion", value)}
                max={50}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button variant="outline" onClick={resetToDefault} className="flex items-center space-x-2 bg-transparent">
              <RotateCcw className="w-4 h-4" />
              <span>Reset Default</span>
            </Button>
            <div className="text-sm text-muted-foreground">
              {totalWeight === 100 ? (
                <span className="text-green-600">✓ Total bobot seimbang</span>
              ) : (
                <span className="text-orange-600">⚠ Total bobot: {totalWeight}%</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferensi Pengguna</CardTitle>
          <CardDescription>Atur preferensi Anda untuk mendapatkan rekomendasi yang lebih akurat</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preferred Colors */}
          <div className="space-y-3">
            <Label>Warna Favorit</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {preferences.preferredColors.map((color) => (
                <Badge
                  key={color}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removePreference("preferredColors", color)}
                >
                  {color} ×
                </Badge>
              ))}
            </div>
            <Select onValueChange={(value) => addPreference("preferredColors", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Tambah warna favorit" />
              </SelectTrigger>
              <SelectContent>
                {colors
                  .filter((color) => !preferences.preferredColors.includes(color))
                  .map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Materials */}
          <div className="space-y-3">
            <Label>Bahan Favorit</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {preferences.preferredMaterials.map((material) => (
                <Badge
                  key={material}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removePreference("preferredMaterials", material)}
                >
                  {material} ×
                </Badge>
              ))}
            </div>
            <Select onValueChange={(value) => addPreference("preferredMaterials", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Tambah bahan favorit" />
              </SelectTrigger>
              <SelectContent>
                {materials
                  .filter((material) => !preferences.preferredMaterials.includes(material))
                  .map((material) => (
                    <SelectItem key={material} value={material}>
                      {material}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <Label>Range Harga</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Minimum</Label>
                <div className="text-lg font-medium">Rp {preferences.minPrice.toLocaleString()}</div>
                <Slider
                  value={[preferences.minPrice]}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, minPrice: value[0] }))}
                  max={5000000}
                  min={100000}
                  step={100000}
                  className="w-full mt-2"
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Maksimum</Label>
                <div className="text-lg font-medium">Rp {preferences.maxPrice.toLocaleString()}</div>
                <Slider
                  value={[preferences.maxPrice]}
                  onValueChange={(value) => setPreferences((prev) => ({ ...prev, maxPrice: value[0] }))}
                  max={5000000}
                  min={500000}
                  step={100000}
                  className="w-full mt-2"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
