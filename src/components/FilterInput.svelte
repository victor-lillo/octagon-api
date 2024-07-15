<script lang="ts">
  export let isChecked = false;
  export let label: string;
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
    align-items: center;
    justify-content: center;
  }

  .hide {
    display: none;
  }
</style>
