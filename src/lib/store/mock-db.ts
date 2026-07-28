import {
  WeeklyMenuPackage,
  IndividualDietaryProfile,
  InventoryItem,
  HouseholdWallet,
  MealItem,
  QRMealLogEntry,
  LenzListItem
} from '../types/schema';

export const MOCK_RESIDENTS: IndividualDietaryProfile[] = [
  {
    resident_id: 'RES-101',
    name: 'Arthur Pendelton',
    house_id: 'WOODLANE-HOUSE-A',
    room_number: 'Room 101',
    restrictions: ['Low Sodium', 'Diabetic Friendly'],
    texture_mods: ['PUREED'],
    allergens: ['PEANUTS'],
    notes: 'Requires high visual contrast for plate layout.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    resident_id: 'RES-102',
    name: 'Beatrice Vance',
    house_id: 'WOODLANE-HOUSE-A',
    room_number: 'Room 102',
    restrictions: ['Gluten Free', 'Dairy Free'],
    texture_mods: ['MECHANICAL_SOFT'],
    allergens: ['DAIRY', 'GLUTEN'],
    notes: 'Prefers small frequent portions.',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    resident_id: 'RES-103',
    name: 'Charles Miller',
    house_id: 'WOODLANE-HOUSE-A',
    room_number: 'Room 103',
    restrictions: ['Heart Healthy'],
    texture_mods: ['NECTAR_THICK'],
    allergens: ['SHELLFISH', 'TREE_NUTS'],
    notes: 'Nectar thick liquids mandatory for all meals.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    resident_id: 'RES-104',
    name: 'Diana Prince',
    house_id: 'WOODLANE-HOUSE-A',
    room_number: 'Room 104',
    restrictions: ['Vegetarian', 'Low Potassium'],
    texture_mods: ['REGULAR'],
    allergens: [],
    notes: 'Enjoys fresh herbs and colorful vegetable presentation.',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  }
];

export const MOCK_MEAL_LIBRARY: MealItem[] = [
  {
    id: 'MEAL-001',
    title: 'Savory Pureed Roast Chicken & Root Vegetables',
    meal_type: 'DINNER',
    calories: 420,
    protein_g: 32,
    carbs_g: 28,
    fat_g: 14,
    sodium_mg: 380,
    texture_suitable: ['PUREED', 'MECHANICAL_SOFT', 'REGULAR'],
    ingredients: [
      {
        item_id: 'INV-101',
        name: 'Boneless Chicken Breast',
        quantity: 0.5,
        unit: 'lbs',
        category: 'MEAT',
        allergens: [],
        substitutes: [
          { name: 'Pureed Tofu', reason: 'Vegetarian safe', texture_safe: ['PUREED'] }
        ]
      },
      {
        item_id: 'INV-102',
        name: 'Carrots & Sweet Potatoes',
        quantity: 0.75,
        unit: 'cups',
        category: 'PRODUCE',
        allergens: [],
        substitutes: []
      }
    ],
    cooking_steps: [
      {
        step_number: 1,
        instruction: 'Steam chicken breasts until internal temperature reaches 165°F (approx. 18 mins).',
        visual_cue: 'Chicken is opaque white with no pink center.',
        timer_minutes: 18,
        icon: 'Flame'
      },
      {
        step_number: 2,
        instruction: 'Puree roasted carrots and sweet potatoes in commercial food processor with low-sodium broth until silk smooth.',
        visual_cue: 'Consistency resembles smooth custard with no visible lumps.',
        timer_minutes: 5,
        icon: 'Zap'
      },
      {
        step_number: 3,
        instruction: 'Blend chicken with broth and natural thickener to achieve Stage 4 Pureed texture standard.',
        visual_cue: 'Holds shape on a spoon without dripping.',
        timer_minutes: 4,
        icon: 'CheckCircle'
      }
    ],
    image_url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'MEAL-002',
    title: 'Soft Fluffy Oatmeal with Cinnamon & Stewed Apples',
    meal_type: 'BREAKFAST',
    calories: 310,
    protein_g: 11,
    carbs_g: 54,
    fat_g: 6,
    sodium_mg: 140,
    texture_suitable: ['MECHANICAL_SOFT', 'REGULAR'],
    ingredients: [
      {
        item_id: 'INV-103',
        name: 'Rolled Oats',
        quantity: 1,
        unit: 'cup',
        category: 'PANTRY',
        allergens: ['GLUTEN'],
        substitutes: [
          { name: 'Certified GF Rice Porridge', reason: 'Gluten allergy safe', texture_safe: ['MECHANICAL_SOFT', 'PUREED'] }
        ]
      },
      {
        item_id: 'INV-104',
        name: 'Almond Milk (Unsweetened)',
        quantity: 1.5,
        unit: 'cups',
        category: 'DAIRY',
        allergens: ['TREE_NUTS'],
        substitutes: [
          { name: 'Oat Milk', reason: 'Nut free option', texture_safe: ['REGULAR'] }
        ]
      }
    ],
    cooking_steps: [
      {
        step_number: 1,
        instruction: 'Simmer rolled oats with milk alternative and cinnamon for 8 minutes.',
        visual_cue: 'Creamy texture with completely softened oat flakes.',
        timer_minutes: 8,
        icon: 'Clock'
      },
      {
        step_number: 2,
        instruction: 'Fold in peeled stewed apple puree.',
        visual_cue: 'Warm golden color throughout.',
        timer_minutes: 2,
        icon: 'CheckCircle'
      }
    ],
    image_url: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'MEAL-003',
    title: 'Flaked Salmon Fillet with Pureed Pea Mousse',
    meal_type: 'LUNCH',
    calories: 460,
    protein_g: 36,
    carbs_g: 22,
    fat_g: 22,
    sodium_mg: 320,
    texture_suitable: ['MECHANICAL_SOFT', 'REGULAR'],
    ingredients: [
      {
        item_id: 'INV-105',
        name: 'Atlantic Salmon Portion',
        quantity: 6,
        unit: 'oz',
        category: 'MEAT',
        allergens: ['FISH'],
        substitutes: [
          { name: 'Steamed Cod', reason: 'Mild flavor alternative', texture_safe: ['MECHANICAL_SOFT'] }
        ]
      }
    ],
    cooking_steps: [
      {
        step_number: 1,
        instruction: 'Bake salmon at 375°F until easily flaked with a fork.',
        visual_cue: 'Moist pink flakes.',
        timer_minutes: 15,
        icon: 'Flame'
      }
    ],
    image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'MEAL-004',
    title: 'High-Protein Berry Smoothie & Nectar Thick Snack',
    meal_type: 'SNACK',
    calories: 220,
    protein_g: 14,
    carbs_g: 32,
    fat_g: 4,
    sodium_mg: 90,
    texture_suitable: ['NECTAR_THICK', 'PUREED', 'REGULAR'],
    ingredients: [
      {
        item_id: 'INV-106',
        name: 'Mixed Berries & Whey Protein',
        quantity: 1,
        unit: 'serving',
        category: 'FROZEN',
        allergens: ['DAIRY'],
        substitutes: [
          { name: 'Pea Protein Isolate', reason: 'Dairy allergy safe', texture_safe: ['NECTAR_THICK', 'PUREED'] }
        ]
      }
    ],
    cooking_steps: [
      {
        step_number: 1,
        instruction: 'Blend berries with protein and thickener powder to nectar viscosity.',
        visual_cue: 'Coats a straw evenly.',
        timer_minutes: 3,
        icon: 'Zap'
      }
    ],
    image_url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&auto=format&fit=crop&q=80'
  }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    item_id: 'INV-101',
    name: 'Boneless Skinless Chicken Breast',
    quantity: 14,
    unit: 'lbs',
    category: 'MEAT',
    store_source: 'ALDI',
    unit_price: 3.49,
    expiration_date: '2026-08-02',
    balance_wallet_ref: 'WAL-WOODLANE-A',
    reorder_threshold: 5
  },
  {
    item_id: 'INV-102',
    name: 'Organic Carrots & Sweet Potatoes',
    quantity: 18,
    unit: 'lbs',
    category: 'PRODUCE',
    store_source: 'KROGER',
    unit_price: 1.89,
    expiration_date: '2026-08-08',
    balance_wallet_ref: 'WAL-WOODLANE-A',
    reorder_threshold: 8
  },
  {
    item_id: 'INV-103',
    name: 'Rolled Oats (Bulk 5lb)',
    quantity: 3,
    unit: 'bags',
    category: 'PANTRY',
    store_source: 'WALMART',
    unit_price: 4.25,
    expiration_date: '2026-11-15',
    balance_wallet_ref: 'WAL-WOODLANE-A',
    reorder_threshold: 1
  },
  {
    item_id: 'INV-104',
    name: 'Almond Milk Unsweetened',
    quantity: 8,
    unit: 'cartons',
    category: 'DAIRY',
    store_source: 'ALDI',
    unit_price: 2.29,
    expiration_date: '2026-08-14',
    balance_wallet_ref: 'WAL-WOODLANE-A',
    reorder_threshold: 3
  },
  {
    item_id: 'INV-105',
    name: 'Atlantic Salmon Portions',
    quantity: 10,
    unit: 'portions',
    category: 'MEAT',
    store_source: 'LOCAL_FARM',
    unit_price: 4.99,
    expiration_date: '2026-08-01',
    balance_wallet_ref: 'WAL-WOODLANE-A',
    reorder_threshold: 4
  }
];

export const MOCK_WALLET: HouseholdWallet = {
  wallet_id: 'WAL-WOODLANE-A',
  house_id: 'WOODLANE-HOUSE-A',
  monthly_budget: 1850.00,
  current_balance: 1245.50,
  spent_this_month: 604.50,
  projected_cost_30day: 1520.00,
  recent_receipts: [
    {
      receipt_id: 'RCP-9921',
      store: 'ALDI Food Market',
      date: '2026-07-25',
      total: 142.35,
      items_count: 24,
      scanned_image: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=300&auto=format&fit=crop&q=80'
    },
    {
      receipt_id: 'RCP-9884',
      store: 'Kroger Fresh',
      date: '2026-07-21',
      total: 98.15,
      items_count: 14
    },
    {
      receipt_id: 'RCP-9750',
      store: 'Walmart Supercenter',
      date: '2026-07-16',
      total: 364.00,
      items_count: 52
    }
  ]
};

export const MOCK_QR_LOGS: QRMealLogEntry[] = [
  {
    log_id: 'LOG-7701',
    timestamp: '2026-07-27T18:30:00Z',
    resident_id: 'RES-101',
    resident_name: 'Arthur Pendelton',
    meal_id: 'MEAL-001',
    meal_title: 'Savory Pureed Roast Chicken & Root Vegetables',
    meal_type: 'DINNER',
    staff_id: 'STF-402',
    staff_name: 'Nurse Sarah Jenkins',
    texture_verified: true,
    notes: 'Consumed 90% of portion. Pureed texture was Stage 4 verified.',
    qr_code_hash: 'QR-RES-101-MEAL-001-20260727'
  },
  {
    log_id: 'LOG-7702',
    timestamp: '2026-07-27T12:15:00Z',
    resident_id: 'RES-102',
    resident_name: 'Beatrice Vance',
    meal_id: 'MEAL-003',
    meal_title: 'Flaked Salmon Fillet with Pureed Pea Mousse',
    meal_type: 'LUNCH',
    staff_id: 'STF-402',
    staff_name: 'Nurse Sarah Jenkins',
    texture_verified: true,
    notes: 'Gluten-free substitution confirmed prior to serving.',
    qr_code_hash: 'QR-RES-102-MEAL-003-20260727'
  }
];

export function generateInitial30DayPackage(): WeeklyMenuPackage {
  const mealPlan: WeeklyMenuPackage['meal_plan'] = [];
  const startDate = new Date('2026-08-01');

  for (let i = 1; i <= 30; i++) {
    const curDate = new Date(startDate);
    curDate.setDate(startDate.getDate() + (i - 1));
    const dateStr = curDate.toISOString().split('T')[0];

    // Cycle through mock meals
    const bf = MOCK_MEAL_LIBRARY[1]; // Oatmeal
    const lunch = MOCK_MEAL_LIBRARY[2]; // Salmon
    const dinner = MOCK_MEAL_LIBRARY[0]; // Chicken
    const snack = MOCK_MEAL_LIBRARY[3]; // Smoothie

    mealPlan.push({
      day_index: i,
      date_str: dateStr,
      breakfast: bf,
      lunch: lunch,
      dinner: dinner,
      snack: snack,
      notes: i % 7 === 0 ? 'Weekly dietary audit day' : undefined
    });
  }

  return {
    package_id: 'PKG-MY25-WOODLANE-2026-W31',
    house_id: 'WOODLANE-HOUSE-A',
    house_name: 'Woodlane Residential House A',
    week_of: '2026-08-01',
    meal_plan: mealPlan,
    compliance_status: 'MY25_VALIDATED',
    my25_validation_code: 'MY25-PASS-89210-WL',
    parsed_from_source: 'Gemini Vision AI Engine (Processed Kitchen Log #882)',
    created_at: '2026-07-27T10:00:00Z',
    updated_at: '2026-07-27T14:30:00Z'
  };
}
