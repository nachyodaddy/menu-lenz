import { NextResponse } from 'next/server';
import { generateInitial30DayPackage } from '@/lib/store/mock-db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format') || 'json';

  const pkg = generateInitial30DayPackage();

  if (format === 'xml') {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<My25WeeklyPackage house_id="${pkg.house_id}" week_of="${pkg.week_of}" validation_code="${pkg.my25_validation_code}">
  <Header>
    <HouseName>${pkg.house_name}</HouseName>
    <ComplianceStatus>${pkg.compliance_status}</ComplianceStatus>
    <GeneratedBy>Menu LENZ Companion App</GeneratedBy>
  </Header>
  <MealSchedule total_days="${pkg.meal_plan.length}">
    ${pkg.meal_plan.slice(0, 7).map(d => `
    <Day index="${d.day_index}" date="${d.date_str}">
      <Breakfast>${d.breakfast?.title || 'N/A'}</Breakfast>
      <Lunch>${d.lunch?.title || 'N/A'}</Lunch>
      <Dinner>${d.dinner?.title || 'N/A'}</Dinner>
      <Snack>${d.snack?.title || 'N/A'}</Snack>
    </Day>`).join('')}
  </MealSchedule>
</My25WeeklyPackage>`;

    return new NextResponse(xmlContent, {
      headers: {
        'Content-Type': 'application/xml',
        'Content-Disposition': `attachment; filename="My25_Package_${pkg.house_id}.xml"`
      }
    });
  }

  return NextResponse.json(pkg, {
    headers: {
      'Content-Disposition': `attachment; filename="My25_Package_${pkg.house_id}.json"`
    }
  });
}
