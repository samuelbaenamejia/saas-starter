import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, Sparkles, Zap, Shield, Clock } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">SaaS Starter</span>
            </div>
            <nav className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className={cn(buttonVariants({ size: 'sm' }))}
              >
                Empezar gratis
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl opacity-20" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                Listo para producción
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Construye tu SaaS{' '}
                <span className="text-primary">en minutos</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Autenticación, base de datos y pagos listos para usar.
                Enfócate en tu producto, no en la infraestructura.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'h-12 px-8 text-base font-medium'
                  )}
                >
                  Empezar gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="#features"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'h-12 px-8 text-base font-medium'
                  )}
                >
                  Ver características
                </Link>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                Sin tarjeta de crédito • Plan gratuito disponible
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                Todo lo que necesitas para empezar
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Un starter kit completo con las mejores tecnologías
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="relative group p-6 rounded-2xl bg-background border hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Autenticación lista</h3>
                <p className="text-muted-foreground">
                  Login, registro y recuperación de contraseña con Supabase Auth.
                  Seguro y listo para usar.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="relative group p-6 rounded-2xl bg-background border hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Base de datos incluida</h3>
                <p className="text-muted-foreground">
                  PostgreSQL con Supabase. Escalable, en tiempo real y con
                  backups automáticos.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="relative group p-6 rounded-2xl bg-background border hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Configura en minutos</h3>
                <p className="text-muted-foreground">
                  Sin configuración compleja. Clona, instala dependencias y
                  comienza a desarrollar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="border-t">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <p className="text-center text-sm font-medium text-muted-foreground mb-8">
              CONSTRUIDO CON LAS MEJORES HERRAMIENTAS
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.057C8.384.522 6.142 1.814 4.468 3.892c-.943 1.17-1.603 2.506-2.003 4.058-.175.68-.294 1.372-.37 2.188-.046.487-.056.975-.056 1.457 0 .595.016 1.198.074 1.744.108 1.017.32 2.014.655 2.98.628 1.805 1.608 3.418 2.904 4.774a10.328 10.328 0 0 0 4.275 2.652c.803.268 1.628.451 2.477.563.607.08 1.22.12 1.832.134.16.003.32.004.482.004.414 0 .828-.008 1.24-.036a10.55 10.55 0 0 0 2.733-.477 10.307 10.307 0 0 0 4.275-2.652c1.296-1.356 2.276-2.969 2.904-4.774.335-.966.547-1.963.655-2.98.058-.546.074-1.149.074-1.744 0-.482-.01-.97-.056-1.457a12.16 12.16 0 0 0-.37-2.188c-.4-1.552-1.06-2.888-2.003-4.058-1.674-2.078-3.916-3.37-6.382-3.828a8.877 8.877 0 0 0-.364-.057C12.438.001 12.304 0 12.128 0h-.556z"/>
                </svg>
                <span className="font-medium">Next.js</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.714 18.91v-5.607H6.79l5.496-8.213v5.607h4.496l-5.496 8.213z"/>
                </svg>
                <span className="font-medium">Supabase</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
                </svg>
                <span className="font-medium">Tailwind</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span className="font-medium">shadcn/ui</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 0h24v24H0V0zm22.034 18.275c-.073-.916-.61-1.697-2.019-2.426-.572-.324-1.208-.56-1.463-1.094-.122-.215-.144-.327-.064-.47.092-.183.247-.263.486-.263.578 0 1.163.392 1.448.79l1.1-.79c-.555-.815-1.488-1.338-2.548-1.338-1.375 0-2.382.815-2.382 2.083 0 .965.516 1.642 1.583 2.073.468.205.894.365 1.164.575.305.235.457.59.457.96 0 .527-.424.927-1.016.927-.767 0-1.36-.387-1.642-1.044l-1.294.778c.487 1.03 1.488 1.675 2.86 1.675 1.567 0 2.61-.828 2.61-2.164 0-1.024-.484-1.708-1.544-2.178zm-7.68-4.494h-1.63v6.47h1.63v-6.47zm0-2.57h-1.63v1.63h1.63v-1.63zm-3.85 2.57c-1.544 0-2.64.878-2.64 2.29 0 .885.388 1.56 1.117 1.957-.61.393-.894.91-.894 1.47 0 .532.237 1.016.678 1.338-.687.393-1.1.995-1.1 1.702 0 1.213 1.052 1.955 2.75 1.955 1.8 0 2.87-.784 2.87-2.05 0-1.378-1.143-1.805-2.57-1.944-.87-.087-1.35-.282-1.35-.674 0-.338.327-.634.87-.634.528 0 .895.237 1.04.612l1.22-.578c-.35-.752-1.173-1.23-2.2-1.23-.726 0-1.37.277-1.787.755-.295-.257-.458-.606-.458-1.012 0-.715.554-1.22 1.426-1.22.67 0 1.18.295 1.395.78l1.082-.56c-.377-.79-1.268-1.282-2.378-1.282z"/>
                </svg>
                <span className="font-medium">Stripe</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-medium">SaaS Starter</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 SaaS Starter. Construido con Next.js y Supabase.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}