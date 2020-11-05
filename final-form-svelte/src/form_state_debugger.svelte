<script lang="ts">
  import { getContext } from 'svelte'
  import type { FormStore } from './form'

  let show = false

  const { state }: FormStore = getContext('form')
</script>

<style lang="scss">
  .debugger-btn-wrapper {
    position: absolute;
    left: 10px;
    top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
  }

  .debugger {
    position: fixed;
    overflow-y: scroll;
    height: 100%;
    bottom: 0;
    min-height: 320px;
    right: 0;
    color: white;
    background: hsla(0, 0%, 0%, 0.6);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
    font-size: 10px;
    z-index: 200;

    &:hover {
      right: 0;
      bottom: 0;
    }

    .form-meta-data-item {
      padding: 0.5rem;
      overflow: scroll;

      pre {
        font-size: 20px;
      }
    }

    h1 {
      font-weight: bold;
    }
  }
</style>

<div class="debugger-btn-wrapper">
  <button type="button" on:click={() => (show = !show)}> Form state </button>
</div>

{#if show}
  <div class="debugger">
    {#each Object.entries($state) as [key, values]}
      <div class="form-meta-data-item">
        <h1>{key}</h1>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    {/each}
  </div>
{/if}
