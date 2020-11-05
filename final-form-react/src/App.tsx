import { Field, Form, FormSpy } from 'react-final-form'
import type { MutableState, Mutator, Tools } from 'final-form'

import { AutoListUpdater } from './AutoListUpdater'
import { FormStateDebugger } from './FormStateDebugger'
import { InputList } from './InputList'
import React from 'react'
import arrayMutators from 'final-form-arrays'

export type FormValues = {
  list_of_things: string[]
  list_length: number | undefined
  [key: string]: any
}

function validate(values: Record<string, string>) {
  return Object.entries(values).reduce((acc, [key, value]) => {
    if (/(\w*shit\w*)/.test(value)) {
      acc[key] = 'Inappropriate!'
    }
    return acc
  }, {} as Record<string, string>)
}

const setValue: Mutator<FormValues> = (
  [name, value]: [string, string],
  state: MutableState<FormValues>,
  { changeValue }: Tools<FormValues>,
) => changeValue(state, name, () => value)

const submit = (values: any) => alert(JSON.stringify(values, null, 2))

interface AppProps {}

function App({}: AppProps) {
  /*const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1))
    return () => clearTimeout(timer)
  }, [count, setCount])*/

  return (
    <div className="App">
      <h1>REACT FINAL FORM</h1>
      {/*<div className="count">{count}</div> */}
      <Form<FormValues>
        onSubmit={submit}
        validate={validate}
        initialValues={{
          list_length: undefined,
          list_of_things: [] as string[],
        }}
        mutators={{ ...arrayMutators, setValue }}
        subscription={{}}
        render={({ handleSubmit, form }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormStateDebugger />
              <InputList />
              <FormSpy
                subscription={{ values: true }}
                render={({ values }) => (
                  <AutoListUpdater values={values} mutators={form.mutators} />
                )}
              />
              <div className="grid">
                {[...Array(100).keys()]
                  .map((k) => 'field_' + k)
                  .map((name) => (
                    <div key={name}>
                      <Field type="text" component="input" name={name} />
                      <Field name={name} subscription={{ error: true }}>
                        {({ meta }) => {
                          return (
                            meta.error && (
                              <div className="error">{meta.error}</div>
                            )
                          )
                        }}
                      </Field>
                    </div>
                  ))}
              </div>
            </form>
          )
        }}
      />
    </div>
  )
}

export default App
