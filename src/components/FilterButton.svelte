<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  interface Props {
    label: string;
    ascIcon: Snippet;
    descIcon: Snippet;
    name: string;
    handleChange: FormEventHandler<HTMLButtonElement>;
  }

  let { ascIcon, descIcon, handleChange, label, name }: Props = $props();

  let triState: boolean | null = $state(null);

  function handleTristate() {
    if (triState === null) {
      triState = true;
    } else if (triState === true) {
      triState = false;
    } else {
      triState = null;
    }
  }

  document.addEventListener('reset', () => {
    triState = null;
  });
</script>

<button
  type="button"
  class:asc={triState === true}
  class:desc={triState === false}
  data-tristate={`${triState}`}
  name={name}
  onclick={(e) => {
    handleTristate();
    handleChange(e);
  }}
>
  {label}

  <p class="visually-hidden">
    {#if triState === null}
      Set column to ascending order
    {:else if triState === true}
      Set column to descending order
    {:else}
      Disable filter
    {/if}
  </p>

  {#if triState === null || triState === true}
    {@render ascIcon?.()}
  {:else}
    {@render descIcon?.()}
  {/if}
</button>

<style>
  button {
    gap: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    width: 100%;
    font: inherit;
  }

  @media (hover: hover) {
    button:hover {
      color: seagreen;
      transition: color 0.3s ease;
    }

    button.asc:hover {
      color: crimson;
    }

    button.desc:hover {
      color: inherit;
    }
  }

  .asc {
    color: seagreen;
  }

  .desc {
    color: crimson;
  }
</style>
