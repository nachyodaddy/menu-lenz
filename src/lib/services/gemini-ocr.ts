import { IngestionResult, WeeklyMenuPackage, MealItem, TextureModification, AllergenCategory } from '../types/schema';
import { validateWeeklyMenuPackage } from './my25-validator';
import { MOCK_RESIDENTS, MOCK_MEAL_LIBRARY } from '../store/mock-db';

export async function parseKitchenDocumentWithGemini(
  fileBufferBase64: string | null,
  fileName: string,
  sampleTextFallback?: string
): Promise<IngestionResult> {
  // Simulate Gemini 1.5/2.0 Multimodal API processing
  // In production, this invokes standard Google Gemini REST API or @google/genai with model 'gemini-1.5-flash'
  
  await new Promise((res) => setTimeout(res, 1200)); // Simulate AI processing delay

  const filenameLower = fileName.toLowerCase();
  
  let extractedTitle = 'Handwritten Kitchen Log & Recipe Sheet';
  let isHandwrittenNote = filenameLower.includes('note') || filenameLower.includes('handwritten') || filenameLower.includes('scan');
  
  // Construct extracted weekly menu package from Gemini Vision parsing
  const mockDayMeals: MealItem[] = [
    {
      id: 'AI-MEAL-101',
      title: isHandwrittenNote ? 'Braised Beef & Pureed Carrots (Parsed from Note)' : 'Roast Turkey Breast with Pureed Gravy',
      meal_type: 'DINNER',
      calories: 450,
      protein_g: 34,
      carbs_g: 26,
      fat_g: 16,
      sodium_mg: 420,
      texture_suitable: ['PUREED', 'MECHANICAL_SOFT', 'REGULAR'],
      ingredients: [
        {
          item_id: 'AI-ING-1',
          name: 'Lean Ground Beef / Turkey',
          quantity: 0.5,
          unit: 'lbs',
          category: 'MEAT',
          allergens: [],
          substitutes: []
        },
        {
          item_id: 'AI-ING-2',
          name: 'Fresh Carrots',
          quantity: 1,
          unit: 'cups',
          category: 'PRODUCE',
          allergens: [],
          substitutes: []
        }
      ],
      cooking_steps: [
        {
          step_number: 1,
          instruction: 'Simmer meat and root vegetables until thoroughly soft.',
          visual_cue: 'Fork tender consistency.',
          timer_minutes: 20
        },
        {
          step_number: 2,
          instruction: 'Puree in commercial blender with vegetable stock.',
          visual_cue: 'Smooth texture, zero lumps.',
          timer_minutes: 5
        }
      ]
    },
    ...MOCK_MEAL_LIBRARY
  ];

  const extractedPackage: Partial<WeeklyMenuPackage> = {
    package_id: `PKG-AI-${Math.floor(1000 + Math.random() * 9000)}`,
    house_id: 'WOODLANE-HOUSE-A',
    house_name: 'Woodlane Residential Management - House A',
    week_of: new Date().toISOString().split('T')[0],
    meal_plan: [
      {
        day_index: 1,
        date_str: new Date().toISOString().split('T')[0],
        breakfast: MOCK_MEAL_LIBRARY[1],
        lunch: MOCK_MEAL_LIBRARY[2],
        dinner: mockDayMeals[0],
        snack: MOCK_MEAL_LIBRARY[3],
        notes: 'Extracted via Gemini AI Multimodal Vision Parser'
      }
    ],
    compliance_status: 'COMPLIANT',
    parsed_from_source: `Gemini Multimodal Vision API (File: ${fileName})`
  };

  // Run My25 validation check
  const report = validateWeeklyMenuPackage(extractedPackage, MOCK_RESIDENTS);

  return {
    success: report.is_valid,
    confidence_score: isHandwrittenNote ? 0.94 : 0.99,
    raw_text: sampleTextFallback || `[Gemini Vision OCR Extraction Log]
Source File: ${fileName}
Detected Content:
- Breakfast: Soft Oatmeal with Stewed Apples (Texture: Mechanical Soft)
- Lunch: Flaked Salmon Fillet with Pureed Pea Mousse
- Dinner: ${mockDayMeals[0].title}
- Dietary Cues: Pureed texture verified for Resident Arthur Pendelton. Low Sodium compliance passed.`,
    extracted_package: extractedPackage,
    validation_errors: report.errors,
    warnings: report.warnings
  };
}
