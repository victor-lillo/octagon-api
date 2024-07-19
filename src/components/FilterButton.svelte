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
