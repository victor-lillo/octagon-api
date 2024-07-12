<script>
  import data from '@db/fighters.json';
  export let filterName = '';
  export let filteredData = [];

  const fighterData = Object.entries(data)
    .map(([key, value]) => {
      return { id: key, ...value };
    })
    .sort(({ name: nameA }, { name: nameB }) => {
      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      return 0;
    });

  $: filteredData = fighterData.filter(({ name }) => {
    const lowerFilterName = filterName.toLocaleLowerCase();
    const lowerName = name.toLocaleLowerCase();
    return lowerName.includes(lowerFilterName);
  });
</script>

<input bind:value={filterName} type="text" />

<ul class="container">
  {#each filteredData as { age, category, draws, height, id, losses, name, reach, weight, wins }, index}
    <li key={`${name}-${index}`} class="row">
      <a aria-label={`Go to ${name} page`} href={`athlete/${id}`}>
        {name}
      </a>
    </li>
  {/each}
</ul>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
  }
  .row {
    font-size: 1.4rem;
  }
</style>
