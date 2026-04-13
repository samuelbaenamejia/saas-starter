'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Users, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'

export type Step2Data = {
  use_case: string
  team_size: string
}

type Step2Props = {
  defaultValues: Step2Data
  onNext: (data: Step2Data) => void
  onBack: () => void
}

const USE_CASES = [
  { value: 'side_project', label: 'Proyecto personal', description: 'Para aprender o experimentar' },
  { value: 'freelance', label: 'Freelance', description: 'Para clientes o portfolio' },
  { value: 'startup', label: 'Startup', description: 'Para lanzar un producto' },
  { value: 'enterprise', label: 'Empresa', description: 'Para uso interno o comercial' },
]

const TEAM_SIZES = [
  { value: '1', label: 'Solo yo' },
  { value: '2-5', label: '2–5 personas' },
  { value: '6-20', label: '6–20 personas' },
  { value: '20+', label: 'Más de 20' },
]

export function Step2({ defaultValues, onNext, onBack }: Step2Props) {
  const [useCase, setUseCase] = useState(defaultValues.use_case)
  const [teamSize, setTeamSize] = useState(defaultValues.team_size)
  const [loading, setLoading] = useState(false)

  const canContinue = useCase !== '' && teamSize !== ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canContinue) return
    setLoading(true)
    onNext({ use_case: useCase, team_size: teamSize })
  }

  return (
    <Card className="w-full max-w-lg border-0 shadow-none sm:border sm:shadow-lg">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Target className="w-7 h-7 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">¿Para qué lo vas a usar?</CardTitle>
        <CardDescription>
          Esto nos ayuda a adaptar la plataforma a tus necesidades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Caso de uso</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {USE_CASES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setUseCase(option.value)}
                  className={`relative flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all hover:border-primary/50 ${
                    useCase === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-background'
                  }`}
                >
                  {useCase === option.value && (
                    <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-primary" />
                  )}
                  <span className="font-medium text-sm">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Tamaño del equipo</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TEAM_SIZES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTeamSize(option.value)}
                  className={`relative flex items-center justify-center rounded-xl border-2 p-3 text-sm transition-all hover:border-primary/50 ${
                    teamSize === option.value
                      ? 'border-primary bg-primary/5 font-medium'
                      : 'border-border bg-background'
                  }`}
                >
                  {teamSize === option.value && (
                    <CheckCircle2 className="absolute top-1.5 right-1.5 w-3.5 h-3.5 text-primary" />
                  )}
                  {option.label}
                </button>
              ))}
            </div>
          </div>

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
              disabled={!canContinue || loading}
              className="flex-1 h-11 text-base font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}