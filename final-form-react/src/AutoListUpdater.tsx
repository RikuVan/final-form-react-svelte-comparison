import * as React from 'react'

import type { FormValues } from './App'

export const AutoListUpdater = ({
  values,
  mutators,
}: {
  values: any
  mutators: { [key: string]: Function }
}) => {
  React.useEffect(() => {
    const { list_length, list_of_things } = values
    if (list_length == undefined) {
      return
    }
    if (list_of_things.length < list_length) {
      mutators.push('list_of_things', {})
    }
    if (list_of_things.length > list_length) {
      mutators.pop('list_of_things')
    }
  }, [values, mutators])
  return null
}
