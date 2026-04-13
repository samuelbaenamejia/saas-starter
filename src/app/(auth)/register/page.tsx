'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, Loader2, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const getErrorMessage = (error: string): string => {
    if (error.includes('already registered')) {
      return 'Este email ya está registrado.'
    }
    if (error.includes('Password') && error.includes('6')) {
      return 'La contraseña debe tener al menos 6 caracteres.'
    }
    if (error.includes('Invalid email')) {
      return 'El formato del email no es válido.'
    }
    return error
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsDuplicateEmail(false)

    // Validation
    if (!email.trim()) {
      setError('Por favor, ingresa tu email.')
      return
    }
    if (!password) {
      setError('Por favor, ingresa una contraseña.')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      const message = getErrorMessage(error.message)
      setError(message)
      setIsDuplicateEmail(error.message.includes('already registered'))
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
              Únete a nosotros
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Crea tu cuenta y comienza a construir algo increíble.
            </p>
            <div className="grid grid-cols-2 gap-4 text-left text-primary-foreground/80">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm">Configuración en minutos</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm">Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm">Plan gratuito disponible</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm">Soporte incluido</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Register form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-background">
        <Card className="w-full max-w-md border-0 shadow-none sm:border sm:shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <div className="lg:hidden mb-4">
              <Link href="/" className="text-2xl font-bold text-center block">SaaS Starter</Link>
            </div>
            <CardTitle className="text-2xl font-bold">Crear cuenta</CardTitle>
            <CardDescription>
              Completa tus datos para registrarte
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
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
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Mínimo 6 caracteres"
                    className="pl-10"
                  />
                </div>
              </div>
              {error && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  {isDuplicateEmail ? (
                    <p className="text-sm text-destructive">
                      {error}{' '}
                      <Link href="/login" className="underline underline-offset-2 hover:text-destructive/80">
                        ¿Quieres iniciar sesión?
                      </Link>
                    </p>
                  ) : (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
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
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    Crear cuenta
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
                    ¿Ya tienes cuenta?
                  </span>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline underline-offset-4"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}