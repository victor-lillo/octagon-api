<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements';
  import dbData from '@db/fighters.json';

  import AscOrderLetters from './icons/AscOrderLetters.svelte';
  import AscOrderNumbers from './icons/AscOrderNumbers.svelte';
  import DescOrderLetters from './icons/DescOrderLetters.svelte';
  import DescOrderNumbers from './icons/DescOrderNumbers.svelte';
  import FilterButton from './FilterButton.svelte';

  import { removeArrayElementByKey } from '@utils/arrayModifiers';
  import { ascCompare, descCompare } from '@utils/compare';

  type Filter = {
    filteredKey: string;
    order: 'asc' | 'desc';
  };

  let filteredData: Array<{ [key: string]: string }> = [];
  let filterName = '';
  let orderFilters: Array<Filter> = [];

  // id,  category,  draws,  imgUrl,  losses,  name,  nickname,  wins,  status,  placeOfBirth,  trainsAt,  fightingStyle,  age,  height,  weight,  octagonDebut,  reach,  legReach
  const fighterData = Object.entries(dbData).map(([key, value]) => {
    return { id: key, ...value };
  });

  const FILTER_DICT = {
    asc: {
      key: 'asc' as const,
      function: ascCompare,
    },
    desc: {
      key: 'desc' as const,
      function: descCompare,
    },
  };

  const tableHeadCells = [
    {
      key: 'name', // same key as fighterData[x]
      label: 'Name',
      iconType: 'letter',
    },
    {
      key: 'age',
      label: 'Age',
      iconType: 'number',
    },
    {
      key: 'weight',
      label: 'Weight',
      iconType: 'number',
    },
    {
      key: 'wins',
      label: 'Wins',
      iconType: 'number',
    },
    {
      key: 'losses',
      label: 'Losses',
      iconType: 'number',
    },
    {
      key: 'height',
      label: 'Height',
      iconType: 'number',
    },
  ];

  $: {
    // Filter by filterName
    filteredData = fighterData.filter(({ name }) => {
      const lowerFilterName = filterName.toLocaleLowerCase();
      const lowerName = name.toLocaleLowerCase();
      return lowerName.includes(lowerFilterName);
    });

    // Filter by order
    if (orderFilters.length > 0) {
      const fighterDataCopy = [...filteredData];
      for (const { filteredKey, order } of orderFilters) {
        const filterFunction = FILTER_DICT[order].function;
        fighterDataCopy.sort(filterFunction(filteredKey));
      }
      filteredData = fighterDataCopy;
    }
  }

  const onChange: FormEventHandler<HTMLInputElement> = (e) => {
    const { name, dataset } = e.currentTarget;

    const triState = dataset.tristate;

    orderFilters = removeArrayElementByKey({
      array: orderFilters,
      keyToRemove: 'filteredKey',
      keyValue: name,
    }) as Array<Filter>;

    // Tristate: init in 'null', on click 'true', then 'false'
    if (triState === 'null') {
      orderFilters = [...orderFilters, { filteredKey: name, order: FILTER_DICT.asc.key }];
    } else if (triState === 'true') {
      orderFilters = [...orderFilters, { filteredKey: name, order: FILTER_DICT.desc.key }];
    }
  };
</script>

<section>
  <label>
    Filter athletes
    <input bind:value={filterName} type="text" />
  </label>

  <button
    on:click={() => {
      orderFilters = [];
      const event = new CustomEvent('reset');
      document.dispatchEvent(event);
    }}
  >
    Reset columns filters
  </button>
</section>

<table>
  <thead>
    <tr>
      {#each tableHeadCells as { iconType, key, label }}
        <th>
          {#if iconType === 'number'}
            <FilterButton name={key} label={label} handleChange={onChange}>
              <AscOrderNumbers slot="ascIcon" />
              <DescOrderNumbers slot="descIcon" />
            </FilterButton>
          {:else if iconType === 'letter'}
            <FilterButton name={key} label={label} handleChange={onChange}>
              <AscOrderLetters slot="ascIcon" />
              <DescOrderLetters slot="descIcon" />
            </FilterButton>
          {/if}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each filteredData as { age, category, draws, height, id, losses, name, reach, weight, wins }, index}
      <tr>
        <td>
          <a aria-label={`Go to ${name} page`} href={`athlete/${id}`}>
            {name}
          </a>
        </td>
        <td>{age}</td>
        <td>{weight}</td>
        <td>{wins}</td>
        <td>{losses}</td>
        <td>{height}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  button {
    padding: 0.4rem 1rem;
    border-radius: var(--border-radius);
    border: none;
    background-color: var(--color-table-head);
    transition: background-color 0.3s ease;
  }

  @media (hover: hover) {
    button:hover {
      background-color: var(--color-primary-dark-3);
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th {
    background-color: var(--color-table-head);
  }

  th,
  td {
    border: 1px solid black;
    padding: 0.4rem 0.8rem;
    text-align: center;
  }

  td:nth-child(1) {
    text-align: left;
  }

  @media (hover: hover) {
    a:hover {
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
</style>
