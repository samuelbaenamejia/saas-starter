'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, Loader2, ArrowRight, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const getErrorMessage = (error: string): string => {
    if (error.includes('Invalid login credentials')) {
      return 'Email o contraseña incorrectos. Por favor, verifica tus datos.'
    }
    if (error.includes('Email not confirmed')) {
      return 'Tu email no ha sido confirmado. Revisa tu bandeja de entrada.'
    }
    if (error.includes('Invalid email')) {
      return 'El formato del email no es válido.'
    }
    return error
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!email.trim()) {
      setError('Por favor, ingresa tu email.')
      return
    }
    if (!password) {
      setError('Por favor, ingresa tu contraseña.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(getErrorMessage(error.message))
      return
    }

    router.push('/onboarding')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/70 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="flex flex-col justify-center items-center w-full px-12 relative z-10">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold text-primary-foreground mb-6">
              Bienvenido de nuevo
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Accede a tu cuenta y continúa construyendo tu próximo proyecto.
            </p>
            <div className="flex justify-center gap-8 text-primary-foreground/60">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm">Rápido</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-sm">Seguro</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-background">
        <Card className="w-full max-w-md border-0 shadow-none sm:border sm:shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <div className="lg:hidden mb-4">
              <Link href="/" className="text-2xl font-bold text-center block">SaaS Starter</Link>
            </div>
            <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tu@email.com"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>
              {error && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 text-base font-medium"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    Iniciar sesión
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
            <div className="px-6 pb-6 pt-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    ¿Nuevo aquí?
                  </span>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                <Link
                  href="/register"
                  className="font-medium text-primary hover:underline underline-offset-4"
                >
                  Crea una cuenta gratis
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}