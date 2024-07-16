<script lang="ts">
  export let handleChange;
  export let isChecked: boolean | null = null;
  export let label: string;
  export let name: string;
</script>

<label class:asc={isChecked === true} class:desc={isChecked === false}>
  {label}
  {#if isChecked}
    <slot name="ascIcon" />
  {:else}
    <slot name="descIcon" />
  {/if}
  <input
    name={name}
    class="hide"
    bind:checked={isChecked}
    on:input={handleChange}
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
