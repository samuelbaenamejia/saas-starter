'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Zap, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export type Step3Data = {
  plan: 'free' | 'pro'
}

type Step3Props = {
  defaultValues: Step3Data
  onNext: (data: Step3Data) => Promise<void>
  onBack: () => void
}

const PLANS = [
  {
    value: 'free' as const,
    name: 'Gratis',
    price: '$0',
    period: '/mes',
    description: 'Perfecto para empezar',
    features: [
      '1 proyecto',
      'Datos básicos',
      'Soporte por email',
      'Sin tarjeta de crédito',
    ],
  },
  {
    value: 'pro' as const,
    name: 'Pro',
    price: '$19',
    period: '/mes',
    description: 'Para equipos y proyectos serios',
    features: [
      'Proyectos ilimitados',
      'Análisis avanzados',
      'Soporte prioritario',
      'Integraciones',
    ],
  },
]

export function Step3({ defaultValues, onNext, onBack }: Step3Props) {
  const [plan, setPlan] = useState<'free' | 'pro'>(defaultValues.plan)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await onNext({ plan })
    } catch {
      setError('Error al guardar. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-lg border-0 shadow-none sm:border sm:shadow-lg">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Elige tu plan</CardTitle>
        <CardDescription>
          Puedes cambiar de plan en cualquier momento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {PLANS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPlan(p.value)}
                className={`relative flex flex-col rounded-xl border-2 p-5 text-left transition-all hover:border-primary/50 ${
                  plan === p.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-background'
                }`}
              >
                {plan === p.value && (
                  <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-primary" />
                )}
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    {p.value === 'pro' && <Zap className="w-4 h-4 text-primary" />}
                    <span className="font-bold text-lg">{p.name}</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-2xl font-bold">{p.price}</span>
                    <span className="text-sm text-muted-foreground">{p.period}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{p.description}</p>
                <ul className="space-y-1.5">
                  {p.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          {error && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 h-11"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Atrás
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 h-11 text-base font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  Comenzar
                  <Sparkles className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}