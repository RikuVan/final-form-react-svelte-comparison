# Final Form comparison with React and Svelte

[Final form](https://github.com/final-form/final-form) is a javascript, subscription-based solution for controlling the state of forms.

It is popular in React, packaged as components as [react-final-form](https://github.com/final-form/react-final-form). There are several helper libraries that have been developed for React. But Final-form is framework agnostic. The demo shows a comparison in using it with React and Svelte. The Svelte demo relies on a home-baked wrapper, using Svelte stores and context to make it is to subscribe to and share form state.

## Comparison requirements

1. A form with many inputs - up to a thousand should still perform well, even with other items rapidly updating in the same component, in this case a timer. These inputs should also have a validation error.
2. The form should contain a dynamic array of components that with buttons to add or remove items. However, there is another field (also in the form state), which when used,
   overrides the buttons and sets the array of inputs to a certain length. This should work with the timer and many inputs.
3. We should have an easy way to see any part of the form state while developing, without effecting the performance of the app for debugging.
