<script lang="ts">
  export let handleChange;
  export let label: string;
  export let name: string;

  let triState: boolean | null = null;

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
  class:asc={triState === true}
  class:desc={triState === false}
  data-tristate={`${triState}`}
  name={name}
  on:click={(e) => {
    handleTristate();
    handleChange(e);
  }}
>
  {label}
  {#if triState === null || triState === true}
    <slot name="ascIcon" />
  {:else}
    <slot name="descIcon" />
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
  }

  .asc {
    color: green;
  }

  .desc {
    color: red;
  }
</style>
