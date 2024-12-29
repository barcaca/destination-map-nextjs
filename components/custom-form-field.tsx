import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFormContext } from 'react-hook-form'

interface CustomFormFieldProps {
  name: string
  label: string
  placeholder?: string
  type?: 'text' | 'textarea'
  defaultValue?: string
}

const CustomFormField = ({
  name,
  label,
  placeholder,
  type = 'text',
  defaultValue,
}: CustomFormFieldProps) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <FormItem className="relative w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'textarea' ? (
              <Textarea
                className="resize-none"
                rows={5}
                placeholder={placeholder}
                {...field}
              />
            ) : (
              <Input type={type} placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { CustomFormField }
