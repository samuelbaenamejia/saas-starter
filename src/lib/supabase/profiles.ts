'use server'

import { createClient } from '@/lib/supabase/server'

export type Profile = {
  id: string
  full_name: string | null
  company: string | null
  use_case: string | null
  team_size: string | null
  plan: 'free' | 'pro'
  onboarding_completed: boolean
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return data as Profile | null
}

export async function saveProfile(profile: Partial<Profile>): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const data = { id: user.id, ...profile }
  console.log('saving profile...', data)

  const result = await supabase
    .from('profiles')
    .upsert(data)

  if (result.error) {
    console.log('error:', result.error)
  } else {
    console.log('result:', result)
  }

  return { error: result.error?.message ?? null }
}

export async function completeOnboarding(plan: 'free' | 'pro'): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const data = { id: user.id, plan, onboarding_completed: true }
  console.log('saving profile...', data)

  const result = await supabase
    .from('profiles')
    .upsert(data)

  if (result.error) {
    console.log('error:', result.error)
  } else {
    console.log('result:', result)
  }

  return { error: result.error?.message ?? null }
}