import { NextResponse } from 'next/server'
import supabase from '@/lib/supabase'
import redis from '@/lib/redis'
import { generateDailyMenu } from '@/lib/menuGenerator'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const week = searchParams.get('week')

  if (week) {
    // Check cache for weekly menu
    const cached = await redis.get('weeklyMenu')
    if (cached) {
      return NextResponse.json({ weeklyMenu: cached })
    }
    // Fetch recipes from Supabase
    const { data: recipes, error } = await supabase.from('recipes').select('*')
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    const weeklyMenu = [] as any[]
    for (let i = 0; i < 7; i++) {
      weeklyMenu.push(generateDailyMenu(recipes ?? []))
    }
    await redis.set('weeklyMenu', weeklyMenu)
    return NextResponse.json({ weeklyMenu })
  } else {
    // Daily menu
    const cached = await redis.get('dailyMenu')
    if (cached) {
      return NextResponse.json({ menu: cached })
    }
    const { data: recipes, error } = await supabase.from('recipes').select('*')
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    const menu = generateDailyMenu(recipes ?? [])
    await redis.set('dailyMenu', menu)
    return NextResponse.json({ menu })
  }
}
