# Final Form comparison with React and Svelte

[Final form](https://github.com/final-form/final-form) is a javascript, subscription-based solution for controlling the state of forms.

Final form is a popular library in React. It is wrapped in a set of components and there are several helper/related libraries in the React ecosystem. But Final-form is framework agnostic. The demo shows a comparison in using it with React and Svelte. The Svelte demo relies on a home-baked wrapper, using Svelte stores and context to make a slightly more Svelte-ish api.

## Comparison requirements

1. A form with many inputs - up to a thousand - should still perform well, even with other items rapidly updating in the same component, in this case a counter. These inputs should also have a validation error.
2. The form should contain a dynamic array of components to which you can add or remove items with buttons. However, there must be another field (also in the form state) that overrides the buttons and sets the array of inputs to a certain length. This should work with the counter and large amount of other inputs.
3. We should have an easy way to see any part of the form state while developing, without effecting the performance of the app for debugging.
