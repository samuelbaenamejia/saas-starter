'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { saveProfile, completeOnboarding } from '@/lib/supabase/profiles'
import type { Step1Data } from './step1'
import type { Step2Data } from './step2'
import type { Step3Data } from './step3'
import { Step1 } from './step1'
import { Step2 } from './step2'
import { Step3 } from './step3'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

type Step = 1 | 2 | 3

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>(1)
  const [step1Data, setStep1Data] = useState<Step1Data>({ full_name: '', company: '' })
  const [step2Data, setStep2Data] = useState<Step2Data>({ use_case: '', team_size: '' })
  const [step3Data, setStep3Data] = useState<Step3Data>({ plan: 'free' })
  const router = useRouter()

  const handleStep1 = (data: Step1Data) => {
    setStep1Data(data)
    setStep(2)
  }

  const handleStep2 = (data: Step2Data) => {
    setStep2Data(data)
    setStep(3)
  }

  const handleStep3 = async (data: Step3Data) => {
    setStep3Data(data)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    saveProfile({
      id: user.id,
      full_name: step1Data.full_name,
      company: step1Data.company || null,
      use_case: step2Data.use_case,
      team_size: step2Data.team_size,
    })

    completeOnboarding(data.plan)

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">SaaS Starter</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Step indicator */}
      <div className="border-b bg-background">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {[
              { number: 1, label: 'Perfil' },
              { number: 2, label: 'Uso' },
              { number: 3, label: 'Plan' },
            ].map((s, i) => (
              <div key={s.number} className="flex items-center gap-2">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    step >= s.number
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > s.number ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.number
                  )}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:inline ${
                    step >= s.number ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {s.label}
                </span>
                {i < 2 && (
                  <div className="flex-1 mx-2 hidden sm:block">
                    <div
                      className={`h-0.5 transition-colors ${
                        step > s.number ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        {step === 1 && (
          <Step1 defaultValues={step1Data} onNext={handleStep1} />
        )}
        {step === 2 && (
          <Step2
            defaultValues={step2Data}
            onNext={handleStep2}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <Step3
            defaultValues={step3Data}
            onNext={handleStep3}
            onBack={() => setStep(2)}
          />
        )}
      </main>
    </div>
  )
}