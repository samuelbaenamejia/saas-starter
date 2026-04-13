'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Building2, ArrowRight, Loader2 } from 'lucide-react'

export type Step1Data = {
  full_name: string
  company: string
}

type Step1Props = {
  defaultValues: Step1Data
  onNext: (data: Step1Data) => void
}

export function Step1({ defaultValues, onNext }: Step1Props) {
  const [fullName, setFullName] = useState(defaultValues.full_name)
  const [company, setCompany] = useState(defaultValues.company)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim()) return
    setLoading(true)
    onNext({ full_name: fullName.trim(), company: company.trim() })
  }

  return (
    <Card className="w-full max-w-lg border-0 shadow-none sm:border sm:shadow-lg">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-7 h-7 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Cuéntanos sobre ti</CardTitle>
        <CardDescription>
          Tu nombre y empresa nos ayudan a personalizar tu experiencia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Nombre completo *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Tu nombre"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Nombre de tu empresa (opcional)"
                className="pl-10"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={!fullName.trim() || loading}
            className="w-full h-11 text-base font-medium"
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
        </form>
      </CardContent>
    </Card>
  )
}