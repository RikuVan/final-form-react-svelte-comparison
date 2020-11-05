import './FormStateDebugger.scss'

import * as React from 'react'

import { FormSpy } from 'react-final-form'

export const FormStateDebugger = () => {
  const [show, setShow] = React.useState(false)

  return (
    <FormSpy
      subscription={{ errors: true, values: true, invalid: true }}
      render={(props: any) => {
        return (
          <>
            <div className="debugger-btn-wrapper">
              <button type="button" onClick={() => setShow(!show)}>
                Form state
              </button>
            </div>
            {show && (
              <div className="debugger">
                {Object.entries(props)
                  .filter(([_, values]) => values)
                  .map(([prop, values]) => {
                    return (
                      <div key={prop} className="form-meta-data-item">
                        <h1>{prop}</h1>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                      </div>
                    )
                  })}
              </div>
            )}
          </>
        )
      }}
    />
  )
}
