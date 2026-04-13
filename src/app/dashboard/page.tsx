import { createClient } from '@/lib/supabase/server'
import { getProfile } from '@/lib/supabase/profiles'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogoutButton } from '@/components/logout-button'
import {
  Mail,
  User,
  Settings,
  Bell,
  Plug,
  ChevronRight,
  LayoutDashboard,
  Sparkles,
  Calendar,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const profile = await getProfile()
  if (!profile || !profile.onboarding_completed) {
    redirect('/onboarding')
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">SaaS Starter</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10"
              >
                <LayoutDashboard className="h-5 w-5" />
              </Link>
              <Link
                href="/settings"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10"
              >
                <Settings className="h-5 w-5" />
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            ¡Bienvenido de vuelta! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Aquí tienes un resumen de tu cuenta y actividad reciente.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Estado de cuenta
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Activo</div>
              <p className="text-xs text-muted-foreground mt-1">
                Plan gratuito
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Verificación
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Verificado</div>
              <p className="text-xs text-muted-foreground mt-1">
                Email confirmado
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Miembro desde
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date(user.created_at).toLocaleDateString('es-CO', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Fecha de registro
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Two column layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Account info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información de cuenta
              </CardTitle>
              <CardDescription>
                Tus datos de perfil y configuración
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-medium truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">ID de usuario</p>
                  <p className="font-mono text-sm truncate">{user.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Próximos pasos
              </CardTitle>
              <CardDescription>
                Configura tu cuenta para aprovechar al máximo la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                href="#"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <User className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Completa tu perfil</p>
                  <p className="text-sm text-muted-foreground">
                    Añade tu nombre y foto
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Configura notificaciones</p>
                  <p className="text-sm text-muted-foreground">
                    Elige qué alertas recibir
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="#"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Plug className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Conecta integraciones</p>
                  <p className="text-sm text-muted-foreground">
                    Conecta tus herramientas favoritas
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}