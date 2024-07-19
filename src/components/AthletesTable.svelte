<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements';
  import { ascCompare, descCompare } from '@utils/compare';
  import { removeArrayElementByKey } from '@utils/arrayModifiers';
  import AscOrderLetters from './icons/AscOrderLetters.svelte';
  import AscOrderNumbers from './icons/AscOrderNumbers.svelte';
  import DescOrderLetters from './icons/DescOrderLetters.svelte';
  import DescOrderNumbers from './icons/DescOrderNumbers.svelte';
  import FilterButton from './FilterButton.svelte';

  type Filter = {
    filteredKey: string;
    order: 'asc' | 'desc';
  };

  type TableHeadCell = {
    key: string;
    label: string;
    iconType: 'letter' | 'number';
  };

  export let fightersData: Array<{ [key: string]: string }> = [];
  let orderedData: Array<{ [key: string]: string }> = [];
  let orderFilters: Array<Filter> = [];

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

  const tableHeadCells: TableHeadCell[] = [
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
      iconType: 'letter',
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

  $: {
    // Filter by order
    if (orderFilters.length > 0) {
      const fighterDataCopy = [...fightersData];
      for (const { filteredKey, order } of orderFilters) {
        const filterFunction = FILTER_DICT[order].function;
        fighterDataCopy.sort(filterFunction(filteredKey));
      }
      orderedData = fighterDataCopy;
    } else {
      orderedData = fightersData;
    }
  }

  document.addEventListener('reset', () => {
    orderFilters = [];
  });
</script>

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
    {#each orderedData as { age, category, draws, height, id, losses, name, reach, weight, wins }, index}
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
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th {
    background-color: var(--color-table-head);
    font-weight: var(--font-weight-bold);
  }

  th,
  td {
    border: 1px solid var(--color-table-border);
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
