<script lang="ts">
  export let handleChange;
  export let triState: boolean | null = null;
  export let label: string;
  export let name: string;

  function handleTristate() {
    if (triState === null) {
      triState = true;
    } else if (triState === true) {
      triState = false;
    } else {
      triState = null;
    }
  }
</script>

<label class:asc={triState === true} class:desc={triState === false}>
  {label}
  {#if triState}
    <slot name="ascIcon" />
  {:else}
    <slot name="descIcon" />
  {/if}
  <input
    name={name}
    class="hide"
    data-tristate={`${triState}`}
    on:input={(e) => {
      handleTristate();
      handleChange(e);
    }}
    type="checkbox"
  />
</label>

<style>
  label {
    gap: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hide {
    display: none;
  }

  .asc {
    color: green;
  }

  .desc {
    color: red;
  }
</style>
