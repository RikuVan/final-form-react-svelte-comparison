import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import React from 'react'

export function InputList() {
  return (
    <FieldArray name="list_of_things">
      {({ fields }) => {
        return (
          <>
            <div className="array-row">
              <Field name="list_length">
                {({ input: { value } }) => {
                  if (value) return null
                  return (
                    <div className="buttons">
                      <button type="button" onClick={() => fields.pop()}>
                        -
                      </button>
                      <button type="button" onClick={() => fields.push({})}>
                        +
                      </button>
                    </div>
                  )
                }}
              </Field>
              <div className="list-length-input">
                <Field
                  style={{ width: '100px' }}
                  name="list_length"
                  type="number"
                  component="input"
                />
              </div>
            </div>
            {fields.map((name) => {
              return (
                <div className="row" key={name}>
                  <Field name={`${name}.thing`} type="text" component="input" />
                  <Field
                    name={`${name}.thing2`}
                    type="text"
                    component="input"
                  />
                </div>
              )
            })}
          </>
        )
      }}
    </FieldArray>
  )
}
