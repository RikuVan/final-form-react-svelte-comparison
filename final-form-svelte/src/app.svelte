<script lang="ts">
  import { setContext } from 'svelte'
  import { onDestroy, onMount } from 'svelte/internal'
  import Field from './field.svelte'
  import FieldArray from './field_array.svelte'
  import arrayMutators from 'final-form-arrays'
  import FormStateDebugger from './form_state_debugger.svelte'

  import { createForm } from './form'
  const formStore = createForm({
    onSubmit,
    initialValues: { list_length: undefined, list_of_stuff: [] },
    validate,
    mutators: { ...arrayMutators },
  })
  const fieldNames = [...Array(10).keys()].map((k) => `field_${k + 1}`)
  const { form, fields, state } = formStore

  setContext('form', formStore)

  let listOfStuffField
  let stuffLength = null
  let interval
  let count = 0
  let listLengthField = null

  onMount(() => {
    listOfStuffField = fields.get('list_of_stuff')
    interval = setInterval(() => (count = count + 1), 1000)
  })

  onDestroy(() => {
    clearInterval(interval)
  })

  function onSubmit(values: any) {
    alert(JSON.stringify(values, null, 2))
  }

  function validate(values: Record<string, string>) {
    return Object.entries(values).reduce((acc, [key, value]) => {
      if (/(\w*shit\w*)/.test(value)) {
        acc[key] = 'bad word!'
      }
      return acc
    }, {} as Record<string, string>)
  }

  $: stuffLength = $listOfStuffField?.input ? $listOfStuffField?.input.value.length : null

  function handleUpdate(lenValue?: number) {
    listLengthField = lenValue
    if (stuffLength === null) {
      return
    } else if (!lenValue) {
      form.mutators.removeBatch('list_of_stuff', [...Array(stuffLength).keys()])
    } else if (lenValue > stuffLength) {
      form.mutators.concat(
        'list_of_stuff',
        Array(lenValue - stuffLength).map(() => ({}))
      )
    } else if (lenValue < stuffLength) {
      form.mutators.removeBatch(
        'list_of_stuff',
        [...Array(stuffLength).keys()].slice(lenValue - stuffLength - 1, -1)
      )
    }
  }
</script>

<main>
  <div class="count">{count}</div>
  <h1>Final form with Svelte</h1>
  <form on:submit|preventDefault={form.submit}>
    <FormStateDebugger />
    <FieldArray name="list_of_stuff" let:fields let:mutators let:meta>
      <div class="array-row">
        {#if !listLengthField}
          <div class="buttons">
            <button type="button" on:click|preventDefault={() => mutators.pop()}>-</button>
            <button type="button" on:click|preventDefault={() => mutators.push({})}>+</button>
          </div>
        {/if}
        {listLengthField + ''}
        <div class="list-length-input">
          <Field name="list_length" let:input on:update={({ detail }) => handleUpdate(detail)}>
            <input type="number" on:keyup={input.onChange} value={input.value} />
          </Field>
        </div>
        {#if meta.length > 0}
          {#each fields as name, i}
            <div class="row">
              <Field name={`${name}.item_1`} let:input>
                <input type="text" on:keyup={input.onChange} value={input.value} />
              </Field>
              <Field name={`${name}.item_2`} let:input>
                <input type="text" on:keyup={input.onChange} value={input.value} />
              </Field>
            </div>
          {/each}
        {/if}
      </div>
    </FieldArray>
    <div class="grid">
      {#each fieldNames as name}
        <Field {name} let:input let:meta>
          <input type="text" on:keyup={input.onChange} value={input.value} />
          {#if meta.error}
            <div class="error">{meta.error}</div>
          {/if}
        </Field>
      {/each}
    </div>
  </form>
</main>
