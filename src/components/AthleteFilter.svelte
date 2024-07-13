<script>
  import data from '@db/fighters.json';
  import AscOrderLetters from './icons/AscOrderLetters.svelte';
  import DescOrderLetters from './icons/DescOrderLetters.svelte';
  import AscOrderNumbers from './icons/AscOrderNumbers.svelte';
  import DescOrderNumbers from './icons/DescOrderNumbers.svelte';

  let nameAscOrder = true;
  let ageAscOrder = null;
  let heightAscOrder = null;
  let weightAscOrder = null;
  let filterName = '';
  let filteredData = [];

  function ascCompare(prop) {
    return function (a, b) {
      return a[prop].localeCompare(b[prop]);
    };
  }

  function descCompare(prop) {
    return function (a, b) {
      return b[prop].localeCompare(a[prop]);
    };
  }

  const fighterData = Object.entries(data).map(([key, value]) => {
    return { id: key, ...value };
  });

  $: filteredData = fighterData.filter(({ name }) => {
    const lowerFilterName = filterName.toLocaleLowerCase();
    const lowerName = name.toLocaleLowerCase();
    return lowerName.includes(lowerFilterName);
  });

  $: {
    if (nameAscOrder === null) {
      break $;
    } else if (nameAscOrder) {
      filteredData = filteredData.sort(ascCompare('name'));
    } else {
      filteredData = filteredData.sort(descCompare('name'));
    }
  }

  $: {
    if (ageAscOrder === null) {
      break $;
    } else if (ageAscOrder) {
      filteredData = filteredData.sort(ascCompare('age'));
    } else {
      filteredData = filteredData.sort(descCompare('age'));
    }
  }
</script>

<label>
  Filter athletes
  <input bind:value={filterName} type="text" />
</label>

<table>
  <thead>
    <tr>
      <th>
        <div>
          Name <label>
            {#if nameAscOrder}
              <AscOrderLetters />
            {:else}
              <DescOrderLetters />
            {/if}
            <input class="hide" bind:checked={nameAscOrder} type="checkbox" />
          </label>
        </div>
      </th>
      <th>
        <div>
          Age <label>
            {#if ageAscOrder}
              <AscOrderNumbers />
            {:else}
              <DescOrderNumbers />
            {/if}
            <input class="hide" bind:checked={ageAscOrder} type="checkbox" />
          </label>
        </div>
      </th>
      <th>Height</th>
      <th>Weight</th>
    </tr>
  </thead>
  <tbody>
    {#each filteredData as { age, category, draws, height, id, losses, name, reach, weight, wins }, index}
      <tr>
        <td>
          <a aria-label={`Go to ${name} page`} href={`athlete/${id}`}>
            {name}
          </a></td
        >
        <td>{age}</td>
        <td>{height}</td>
        <td>{weight}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    border-collapse: collapse;
  }

  th {
    background-color: var(--color-table-head);
  }

  th div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  th,
  td {
    border: 1px solid black;
    padding: 8px;
    text-align: center;
  }

  td:nth-child(1) {
    text-align: left;
  }

  label {
    gap: 0.5rem;
  }

  .hide {
    display: none;
  }
</style>
