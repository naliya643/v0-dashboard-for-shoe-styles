// SPK Recommendation Engine using Weighted Sum Model (WSM)

export interface Shoe {
  id: number
  name: string
  brand: string
  color: string
  material: string
  price: number
  occasion: string
  imageUrl?: string
  description?: string
}

export interface CriteriaWeights {
  color: number
  material: number
  price: number
  brand: number
  occasion: number
}

export interface UserPreferences {
  preferredColors: string[]
  preferredMaterials: string[]
  minPrice: number
  maxPrice: number
  preferredBrands: string[]
  preferredOccasions: string[]
}

export interface CriteriaScore {
  color: number
  material: number
  price: number
  brand: number
  occasion: number
}

export interface ShoeEvaluation {
  shoe: Shoe
  scores: CriteriaScore
  weightedScore: number
  totalScore: number
  rank: number
  matchPercentage: number
}

export class RecommendationEngine {
  private weights: CriteriaWeights
  private preferences: UserPreferences

  constructor(weights: CriteriaWeights, preferences: UserPreferences) {
    this.weights = weights
    this.preferences = preferences
  }

  // Normalize weights to ensure they sum to 1
  private normalizeWeights(weights: CriteriaWeights): CriteriaWeights {
    const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0)
    return {
      color: weights.color / total,
      material: weights.material / total,
      price: weights.price / total,
      brand: weights.brand / total,
      occasion: weights.occasion / total,
    }
  }

  // Calculate color score based on user preferences
  private calculateColorScore(shoeColor: string): number {
    if (this.preferences.preferredColors.length === 0) return 5 // Neutral score if no preference

    // Exact match gets highest score
    if (this.preferences.preferredColors.includes(shoeColor)) return 10

    // Partial match for similar colors
    const colorSimilarity: { [key: string]: string[] } = {
      Black: ["Gray", "Navy"],
      White: ["Beige", "Tan"],
      Brown: ["Tan", "Beige"],
      Navy: ["Black", "Blue"],
      Blue: ["Navy"],
      Gray: ["Black", "White"],
      Red: [],
      Green: [],
      Tan: ["Brown", "Beige"],
      Beige: ["Tan", "White"],
    }

    for (const preferredColor of this.preferences.preferredColors) {
      if (colorSimilarity[preferredColor]?.includes(shoeColor)) {
        return 7 // Good match for similar colors
      }
    }

    return 3 // Low score for non-matching colors
  }

  // Calculate material score based on user preferences
  private calculateMaterialScore(shoeMaterial: string): number {
    if (this.preferences.preferredMaterials.length === 0) return 5 // Neutral score if no preference

    if (this.preferences.preferredMaterials.includes(shoeMaterial)) return 10

    // Material quality hierarchy
    const materialQuality: { [key: string]: number } = {
      Leather: 9,
      Suede: 8,
      Primeknit: 8,
      Canvas: 6,
      Mesh: 7,
      Synthetic: 5,
      Rubber: 4,
    }

    return materialQuality[shoeMaterial] || 5
  }

  // Calculate price score based on user budget and value perception
  private calculatePriceScore(shoePrice: number): number {
    const { minPrice, maxPrice } = this.preferences

    // Outside budget range
    if (shoePrice < minPrice || shoePrice > maxPrice) return 2

    // Perfect price range (middle 50% of budget)
    const budgetRange = maxPrice - minPrice
    const idealMin = minPrice + budgetRange * 0.25
    const idealMax = minPrice + budgetRange * 0.75

    if (shoePrice >= idealMin && shoePrice <= idealMax) return 10

    // Good price range
    if (shoePrice >= minPrice && shoePrice <= maxPrice) {
      // Linear scoring within budget
      const distanceFromIdeal = Math.min(Math.abs(shoePrice - idealMin), Math.abs(shoePrice - idealMax))
      const maxDistance = budgetRange * 0.25
      return 7 + 3 * (1 - distanceFromIdeal / maxDistance)
    }

    return 5
  }

  // Calculate brand score based on user preferences and brand reputation
  private calculateBrandScore(shoeBrand: string): number {
    if (this.preferences.preferredBrands.includes(shoeBrand)) return 10

    // Brand reputation scores
    const brandReputation: { [key: string]: number } = {
      Nike: 9,
      Adidas: 9,
      Converse: 7,
      Vans: 7,
      Clarks: 8,
      Puma: 7,
      "New Balance": 8,
      Reebok: 6,
    }

    return brandReputation[shoeBrand] || 5
  }

  // Calculate occasion score based on user preferences
  private calculateOccasionScore(shoeOccasion: string): number {
    if (this.preferences.preferredOccasions.includes(shoeOccasion)) return 10

    // Occasion versatility scores
    const occasionVersatility: { [key: string]: number } = {
      Casual: 8, // Most versatile
      Sport: 6,
      Formal: 7,
      Party: 5,
      Work: 7,
      Travel: 8,
      Beach: 4,
      Hiking: 5,
    }

    return occasionVersatility[shoeOccasion] || 5
  }

  // Calculate individual criteria scores for a shoe
  private calculateCriteriaScores(shoe: Shoe): CriteriaScore {
    return {
      color: this.calculateColorScore(shoe.color),
      material: this.calculateMaterialScore(shoe.material),
      price: this.calculatePriceScore(shoe.price),
      brand: this.calculateBrandScore(shoe.brand),
      occasion: this.calculateOccasionScore(shoe.occasion),
    }
  }

  // Calculate weighted total score using WSM method
  private calculateWeightedScore(scores: CriteriaScore): number {
    const normalizedWeights = this.normalizeWeights(this.weights)

    return (
      scores.color * normalizedWeights.color +
      scores.material * normalizedWeights.material +
      scores.price * normalizedWeights.price +
      scores.brand * normalizedWeights.brand +
      scores.occasion * normalizedWeights.occasion
    )
  }

  // Calculate match percentage based on preferences
  private calculateMatchPercentage(scores: CriteriaScore): number {
    const maxScore = 10
    const averageScore = (scores.color + scores.material + scores.price + scores.brand + scores.occasion) / 5
    return (averageScore / maxScore) * 100
  }

  // Main evaluation method
  public evaluateShoes(shoes: Shoe[]): ShoeEvaluation[] {
    const evaluations: ShoeEvaluation[] = shoes.map((shoe) => {
      const scores = this.calculateCriteriaScores(shoe)
      const weightedScore = this.calculateWeightedScore(scores)
      const matchPercentage = this.calculateMatchPercentage(scores)

      return {
        shoe,
        scores,
        weightedScore,
        totalScore: weightedScore,
        rank: 0, // Will be assigned after sorting
        matchPercentage,
      }
    })

    // Sort by total score (descending) and assign ranks
    evaluations.sort((a, b) => b.totalScore - a.totalScore)
    evaluations.forEach((evaluation, index) => {
      evaluation.rank = index + 1
    })

    return evaluations
  }

  // Get top N recommendations
  public getTopRecommendations(shoes: Shoe[], limit = 5): ShoeEvaluation[] {
    const evaluations = this.evaluateShoes(shoes)
    return evaluations.slice(0, limit)
  }

  // Filter shoes by criteria
  public filterShoesByCriteria(shoes: Shoe[]): Shoe[] {
    return shoes.filter((shoe) => {
      // Price filter
      if (shoe.price < this.preferences.minPrice || shoe.price > this.preferences.maxPrice) {
        return false
      }

      // Color filter (if preferences exist)
      if (this.preferences.preferredColors.length > 0) {
        if (!this.preferences.preferredColors.includes(shoe.color)) {
          // Allow similar colors
          const colorSimilarity: { [key: string]: string[] } = {
            Black: ["Gray", "Navy"],
            White: ["Beige", "Tan"],
            Brown: ["Tan", "Beige"],
            Navy: ["Black", "Blue"],
            Blue: ["Navy"],
            Gray: ["Black", "White"],
          }

          let hasSimilarColor = false
          for (const preferredColor of this.preferences.preferredColors) {
            if (colorSimilarity[preferredColor]?.includes(shoe.color)) {
              hasSimilarColor = true
              break
            }
          }

          if (!hasSimilarColor) return false
        }
      }

      return true
    })
  }

  // Get recommendation explanation
  public getRecommendationExplanation(evaluation: ShoeEvaluation): string[] {
    const explanations: string[] = []
    const { scores, shoe } = evaluation

    if (scores.color >= 8) {
      explanations.push(`Warna ${shoe.color} sesuai dengan preferensi Anda`)
    }

    if (scores.material >= 8) {
      explanations.push(`Bahan ${shoe.material} berkualitas tinggi`)
    }

    if (scores.price >= 8) {
      explanations.push(`Harga Rp ${shoe.price.toLocaleString()} sesuai dengan budget Anda`)
    }

    if (scores.brand >= 8) {
      explanations.push(`Brand ${shoe.brand} memiliki reputasi yang baik`)
    }

    if (scores.occasion >= 8) {
      explanations.push(`Cocok untuk kesempatan ${shoe.occasion}`)
    }

    if (explanations.length === 0) {
      explanations.push("Sepatu ini memiliki keseimbangan yang baik di semua kriteria")
    }

    return explanations
  }
}

// Default weights and preferences for testing
export const defaultWeights: CriteriaWeights = {
  color: 0.2,
  material: 0.2,
  price: 0.25,
  brand: 0.15,
  occasion: 0.2,
}

export const defaultPreferences: UserPreferences = {
  preferredColors: ["Black", "White"],
  preferredMaterials: ["Leather", "Canvas"],
  minPrice: 500000,
  maxPrice: 2000000,
  preferredBrands: ["Nike", "Adidas"],
  preferredOccasions: ["Casual", "Sport"],
}
