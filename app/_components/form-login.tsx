'use client'
import { CustomFormField } from '@/components/custom-form-field'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { customToast } from '@/lib/custom-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { signUpAction } from '../_actions'
import { FormLoginSchema, type TFormLoginData } from '../_actions/schema'

const FormLogin = () => {
  const [formState, formAction, isPending] = useActionState(
    signUpAction,
    undefined
  )
  const form = useForm<TFormLoginData>({
    resolver: zodResolver(FormLoginSchema),
    defaultValues: { email: '' },
  })
  const { handleSubmit } = form

  async function onSubmit(formData: TFormLoginData) {
    startTransition(() => formAction(formData))
  }

  useEffect(() => {
    if (formState) {
      customToast(formState)
    }
  }, [formState])

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <CustomFormField
          name="email"
          label="Email"
          placeholder="johndoe@example.com"
        />
        <Button type="submit" disabled={isPending}>
          Entrar / Cadastrar
        </Button>
      </form>
    </Form>
  )
}

export { FormLogin }
