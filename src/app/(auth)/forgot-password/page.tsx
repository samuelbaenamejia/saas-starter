'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen flex">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/70 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          <div className="flex flex-col justify-center items-center w-full px-12 relative z-10">
            <div className="max-w-md text-center">
              <h1 className="text-4xl font-bold text-primary-foreground mb-6">
                Revisa tu email
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Te enviamos instrucciones para restablecer tu contraseña.
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Success */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-background">
          <Card className="w-full max-w-md border-0 shadow-none sm:border sm:shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">¡Email enviado!</CardTitle>
              <CardDescription>
                Revisa tu bandeja de entrada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground text-center">
                  Hemos enviado instrucciones a
                </p>
                <p className="text-center font-medium mt-1">{email}</p>
              </div>
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/70 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="flex flex-col justify-center items-center w-full px-12 relative z-10">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold text-primary-foreground mb-6">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-lg text-primary-foreground/80">
              No te preocupes, te enviaremos un enlace para restablecerla.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-background">
        <Card className="w-full max-w-md border-0 shadow-none sm:border sm:shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <div className="lg:hidden mb-4">
              <Link href="/" className="text-2xl font-bold text-center block">SaaS Starter</Link>
            </div>
            <CardTitle className="text-2xl font-bold">Restablecer contraseña</CardTitle>
            <CardDescription>
              Ingresa tu email y te enviaremos un enlace
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleReset}>
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
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
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
                    Enviando...
                  </>
                ) : (
                  'Enviar enlace'
                )}
              </Button>
            </CardContent>
            <div className="px-6 pb-6 pt-2">
              <Link
                href="/login"
                className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al login
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}