import { type FormInstance } from 'element-plus'

export function useForm<Data extends Record<string, any>>(data: Data) {
  const form$ = ref<FormInstance>()
  const form = ref<Data>({
    ...data,
  })

  function resetForm() {
    resetFields()
    form.value = {
      ...data,
    }
  }

  function resetFields() {
    return form$.value?.resetFields()
  }

  function validate() {
    return form$.value?.validate()
  }

  return {
    form$,
    form,
    resetForm,
    validate,
    resetFields,
  }
}
