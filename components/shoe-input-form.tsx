"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save, Upload } from "lucide-react"

interface ShoeFormData {
  name: string
  brand: string
  color: string
  material: string
  price: string
  occasion: string
  description: string
  imageUrl: string
}

const brands = ["Nike", "Adidas", "Converse", "Vans", "Clarks", "Puma", "New Balance", "Reebok"]
const colors = ["Black", "White", "Brown", "Navy", "Red", "Blue", "Gray", "Green", "Tan", "Beige"]
const materials = ["Leather", "Canvas", "Mesh", "Suede", "Synthetic", "Primeknit", "Rubber"]
const occasions = ["Casual", "Sport", "Formal", "Party", "Work", "Travel", "Beach", "Hiking"]

export default function ShoeInputForm() {
  const [formData, setFormData] = useState<ShoeFormData>({
    name: "",
    brand: "",
    color: "",
    material: "",
    price: "",
    occasion: "",
    description: "",
    imageUrl: "",
  })

  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([])

  const handleInputChange = (field: keyof ShoeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addToSelection = (item: string, list: string[], setList: (items: string[]) => void) => {
    if (!list.includes(item)) {
      setList([...list, item])
    }
  }

  const removeFromSelection = (item: string, list: string[], setList: (items: string[]) => void) => {
    setList(list.filter((i) => i !== item))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your API
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-primary" />
            <span>Tambah Sepatu Baru</span>
          </CardTitle>
          <CardDescription>Masukkan informasi sepatu untuk ditambahkan ke dalam database evaluasi</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Sepatu</Label>
                <Input
                  id="name"
                  placeholder="Contoh: Air Force 1"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Harga (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="1500000"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL Gambar</Label>
                <div className="flex space-x-2">
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <Label>Warna</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedColors.map((color) => (
                  <Badge key={color} variant="secondary" className="flex items-center space-x-1">
                    <span>{color}</span>
                    <button
                      type="button"
                      onClick={() => removeFromSelection(color, selectedColors, setSelectedColors)}
                      className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Select onValueChange={(value) => addToSelection(value, selectedColors, setSelectedColors)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tambah warna" />
                </SelectTrigger>
                <SelectContent>
                  {colors
                    .filter((color) => !selectedColors.includes(color))
                    .map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Material Selection */}
            <div className="space-y-3">
              <Label>Bahan</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedMaterials.map((material) => (
                  <Badge key={material} variant="secondary" className="flex items-center space-x-1">
                    <span>{material}</span>
                    <button
                      type="button"
                      onClick={() => removeFromSelection(material, selectedMaterials, setSelectedMaterials)}
                      className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Select onValueChange={(value) => addToSelection(value, selectedMaterials, setSelectedMaterials)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tambah bahan" />
                </SelectTrigger>
                <SelectContent>
                  {materials
                    .filter((material) => !selectedMaterials.includes(material))
                    .map((material) => (
                      <SelectItem key={material} value={material}>
                        {material}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Occasion Selection */}
            <div className="space-y-3">
              <Label>Kesempatan</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedOccasions.map((occasion) => (
                  <Badge key={occasion} variant="secondary" className="flex items-center space-x-1">
                    <span>{occasion}</span>
                    <button
                      type="button"
                      onClick={() => removeFromSelection(occasion, selectedOccasions, setSelectedOccasions)}
                      className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Select onValueChange={(value) => addToSelection(value, selectedOccasions, setSelectedOccasions)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tambah kesempatan" />
                </SelectTrigger>
                <SelectContent>
                  {occasions
                    .filter((occasion) => !selectedOccasions.includes(occasion))
                    .map((occasion) => (
                      <SelectItem key={occasion} value={occasion}>
                        {occasion}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                placeholder="Deskripsi detail tentang sepatu ini..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline">
                Batal
              </Button>
              <Button type="submit" className="flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Simpan Sepatu</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
