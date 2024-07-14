<script>
  export let isChecked;
  export let label;
</script>

<label>
  {label}
  {#if isChecked}
    <slot name="ascIcon" />
  {:else}
    <slot name="descIcon" />
  {/if}
  <input class="hide" bind:checked={isChecked} type="checkbox" />
</label>

<style>
  label {
    gap: 0.5rem;
    display: flex;
  }

  .hide {
    display: none;
  }
</style>
