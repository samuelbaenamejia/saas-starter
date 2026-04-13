'use client'

import { useState, useTransition } from 'react'
import { logout } from '@/app/dashboard/actions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LogOut, Loader2 } from 'lucide-react'

export function LogoutButton() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logout()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10">
        <LogOut className="h-5 w-5" />
        <span className="sr-only">Cerrar sesión</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cerrar sesión</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres cerrar sesión? Tendrás que volver a
            iniciar sesión para acceder a tu cuenta.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cerrando...
              </>
            ) : (
              'Cerrar sesión'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}