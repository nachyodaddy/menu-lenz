import { WeeklyMenuPackage, IndividualDietaryProfile, AllergenCategory, TextureModification } from '../types/schema';

export interface My25ValidationReport {
  is_valid: boolean;
  score: number; // 0 - 100
  my25_code: string;
  errors: string[];
  warnings: string[];
  resident_compliance_checks: Array<{
    resident_id: string;
    resident_name: string;
    status: 'PASS' | 'WARNING' | 'FAIL';
    details: string[];
  }>;
}

export function validateWeeklyMenuPackage(
  pkg: Partial<WeeklyMenuPackage>,
  residents: IndividualDietaryProfile[]
): My25ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const residentChecks: My25ValidationReport['resident_compliance_checks'] = [];

  // 1. Mandatory My25 Header Schema Validation
  if (!pkg.house_id) {
    errors.push('MY25 ERROR [E01]: Missing mandatory field "house_id". Package rejected by My25 ingestion portal.');
  }
  if (!pkg.week_of) {
    errors.push('MY25 ERROR [E02]: Missing mandatory field "week_of". Must be formatted as YYYY-MM-DD.');
  }
  if (!pkg.meal_plan || !Array.isArray(pkg.meal_plan) || pkg.meal_plan.length === 0) {
    errors.push('MY25 ERROR [E03]: "meal_plan" array is empty. At least 1 day meal schedule required.');
  }

  // 2. Validate Daily Meal Completeness
  if (pkg.meal_plan) {
    pkg.meal_plan.forEach((day, index) => {
      if (!day.breakfast && !day.lunch && !day.dinner) {
        warnings.push(`MY25 WARNING [W04]: Day ${day.day_index || index + 1} (${day.date_str}) has no meals assigned.`);
      }

      // Check meal item mandatory structure
      [day.breakfast, day.lunch, day.dinner, day.snack].forEach((meal) => {
        if (meal) {
          if (!meal.title) {
            errors.push(`MY25 ERROR [E05]: Meal item ID ${meal.id} on Day ${day.day_index} is missing title.`);
          }
          if (meal.sodium_mg > 1200) {
            warnings.push(`MY25 SODIUM ALERT: "${meal.title}" contains ${meal.sodium_mg}mg sodium (exceeds single-meal target of 800mg).`);
          }
        }
      });
    });
  }

  // 3. Cross-reference Resident Dietary Profiles (Woodlane Compliance Check)
  residents.forEach((res) => {
    const details: string[] = [];
    let status: 'PASS' | 'WARNING' | 'FAIL' = 'PASS';

    pkg.meal_plan?.slice(0, 7).forEach((day) => {
      [day.breakfast, day.lunch, day.dinner, day.snack].forEach((meal) => {
        if (!meal) return;

        // Allergen conflict check
        meal.ingredients.forEach((ing) => {
          ing.allergens.forEach((allg) => {
            if (res.allergens.includes(allg as AllergenCategory)) {
              status = 'FAIL';
              details.push(`CRITICAL ALLERGEN CONFLICT: Resident ${res.name} is allergic to ${allg}, present in meal "${meal.title}" (Day ${day.day_index}). Substitute required!`);
            }
          });
        });

        // Texture modification check
        res.texture_mods.forEach((tex) => {
          if (tex !== 'REGULAR' && !meal.texture_suitable.includes(tex as TextureModification)) {
            if (status !== 'FAIL') status = 'WARNING';
            details.push(`TEXTURE MISMATCH: Resident ${res.name} requires ${tex} texture, but meal "${meal.title}" is flagged as ${meal.texture_suitable.join(', ')}.`);
          }
        });
      });
    });

    if (details.length === 0) {
      details.push('Fully compliant with 7-day active meal schedule.');
    }

    residentChecks.push({
      resident_id: res.resident_id,
      resident_name: res.name,
      status,
      details
    });
  });

  const is_valid = errors.length === 0;
  const score = Math.max(0, 100 - errors.length * 25 - warnings.length * 5);
  const my25_code = is_valid ? `MY25-PASS-${Math.floor(10000 + Math.random() * 90000)}-WL` : 'MY25-REJECTED-ERR-400';

  return {
    is_valid,
    score,
    my25_code,
    errors,
    warnings,
    resident_compliance_checks: residentChecks
  };
}
