import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface SimpleFormProps {
  onSubmit: (data: SimpleFormData) => void
  isLoading?: boolean
}

export interface SimpleFormData {
  name: string
  email: string
  message: string
}

export function SimpleForm({ onSubmit, isLoading = false }: SimpleFormProps) {
  const form = useForm<SimpleFormData>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  function handleSubmit(data: SimpleFormData) {
    onSubmit(data)
    // Reset form after successful submission
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: 'لطفاً نام خود را وارد کنید' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{ 
            required: 'لطفاً ایمیل خود را وارد کنید',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'ایمیل نامعتبر است',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ایمیل</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          rules={{ required: 'لطفاً پیام خود را وارد کنید' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>پیام</FormLabel>
              <FormControl>
                <Input placeholder="پیام خود را بنویسید..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          variant="default" 
          size="lg" 
          className="w-full"
          loading={isLoading}
        >
          ارسال
        </Button>
      </form>
    </Form>
  )
}
