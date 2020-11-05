<script lang="ts">
  import { getContext, onMount, createEventDispatcher } from 'svelte'
  import type { GetFieldValidator, Subscription } from 'final-form'
  import type { FormStore, ReadableField } from './form'

  const dispatch = createEventDispatcher()

  export let validate: ReturnType<GetFieldValidator<any>> = () => undefined
  export let name: string

  let field: ReadableField
  let subscription: Subscription = undefined

  const { registerField, fields }: FormStore = getContext('form')

  onMount(() => {
    registerField(
      name,
      {
        getValidator: () => validate,
      },
      subscription
    )
    field = fields.get(name)
  })

  function onChange(e: any) {
    $field.input.onChange(e.target.value)
    dispatch('update', e.target.value)
  }
</script>

<div class="field">
  {#if $field && $field.meta}
    <slot input={{ ...$field.input, onChange }} meta={$field.meta} />
  {/if}
</div>
