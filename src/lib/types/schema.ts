// Menu LENZ Data Schema Models

export type TextureModification = 'REGULAR' | 'MECHANICAL_SOFT' | 'PUREED' | 'NECTAR_THICK' | 'HONEY_THICK';
export type AllergenCategory = 'PEANUTS' | 'TREE_NUTS' | 'DAIRY' | 'GLUTEN' | 'EGGS' | 'SHELLFISH' | 'SOY' | 'FISH';
export type ComplianceStatus = 'COMPLIANT' | 'WARNING_NEEDS_SUBSTITUTE' | 'NON_COMPLIANT_REJECTED' | 'MY25_VALIDATED';

export type UserRole = 'ADMIN' | 'CAREGIVER_STAFF' | 'RESIDENT_HOUSE_MANAGER';

export interface IndividualDietaryProfile {
  resident_id: string;
  name: string;
  house_id: string;
  room_number: string;
  restrictions: string[]; // e.g. ["Low Sodium", "Diabetic Friendly"]
  texture_mods: TextureModification[];
  allergens: AllergenCategory[];
  notes?: string;
  avatar_url?: string;
}

export interface CookingStep {
  step_number: number;
  instruction: string;
  visual_cue: string;
  timer_minutes?: number;
  icon?: string;
}

export interface IngredientRequirement {
  item_id: string;
  name: string;
  quantity: number;
  unit: string;
  category: 'PRODUCE' | 'MEAT' | 'DAIRY' | 'PANTRY' | 'FROZEN';
  allergens: AllergenCategory[];
  substitutes: Array<{
    name: string;
    reason: string;
    texture_safe: TextureModification[];
  }>;
}

export interface MealItem {
  id: string;
  title: string;
  meal_type: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  sodium_mg: number;
  texture_suitable: TextureModification[];
  ingredients: IngredientRequirement[];
  cooking_steps: CookingStep[];
  image_url?: string;
}

export interface DailyMealSlot {
  day_index: number; // 1 to 30
  date_str: string;
  breakfast: MealItem | null;
  lunch: MealItem | null;
  dinner: MealItem | null;
  snack: MealItem | null;
  notes?: string;
}

export interface WeeklyMenuPackage {
  package_id: string;
  house_id: string; // e.g. "Woodlane-House-A"
  house_name: string;
  week_of: string; // ISO Date YYYY-MM-DD
  meal_plan: DailyMealSlot[];
  compliance_status: ComplianceStatus;
  my25_validation_code?: string;
  parsed_from_source?: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryItem {
  item_id: string;
  name: string;
  quantity: number;
  unit: string;
  category: 'PRODUCE' | 'MEAT' | 'DAIRY' | 'PANTRY' | 'FROZEN';
  store_source: 'ALDI' | 'WALMART' | 'KROGER' | 'LOCAL_FARM';
  unit_price: number;
  expiration_date: string;
  balance_wallet_ref: string; // Wallet ID tracking this expense
  reorder_threshold: number;
}

export interface HouseholdWallet {
  wallet_id: string;
  house_id: string;
  monthly_budget: number;
  current_balance: number;
  spent_this_month: number;
  projected_cost_30day: number;
  recent_receipts: Array<{
    receipt_id: string;
    store: string;
    date: string;
    total: number;
    items_count: number;
    scanned_image?: string;
  }>;
}

export interface LenzListItem {
  id: string;
  name: string;
  required_qty: number;
  unit: string;
  category: string;
  in_stock_qty: number;
  to_buy_qty: number;
  estimated_cost: number;
  store: string;
  checked: boolean;
}

export interface QRMealLogEntry {
  log_id: string;
  timestamp: string;
  resident_id: string;
  resident_name: string;
  meal_id: string;
  meal_title: string;
  meal_type: string;
  staff_id: string;
  staff_name: string;
  texture_verified: boolean;
  notes?: string;
  qr_code_hash: string;
}

export interface IngestionResult {
  success: boolean;
  raw_text?: string;
  confidence_score: number;
  extracted_package?: Partial<WeeklyMenuPackage>;
  validation_errors: string[];
  warnings: string[];
}
