<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements';
  import dbData from '@db/fighters.json';

  import AscOrderLetters from './icons/AscOrderLetters.svelte';
  import AscOrderNumbers from './icons/AscOrderNumbers.svelte';
  import DescOrderLetters from './icons/DescOrderLetters.svelte';
  import DescOrderNumbers from './icons/DescOrderNumbers.svelte';
  import FilterInput from './FilterInput.svelte';

  type Filter = {
    filteredKey: string;
    order: 'asc' | 'desc';
  };

  let filteredData: Array<{ [key: string]: string }> = [];
  let filterName = '';
  let orderFilters: Array<Filter> = [];

  function ascCompare(prop: string) {
    return function (a: { [x: string]: string }, b: { [x: string]: string }) {
      return a[prop].localeCompare(b[prop]);
    };
  }

  function descCompare(prop: string) {
    return function (a: { [x: string]: string }, b: { [x: string]: string }) {
      return b[prop].localeCompare(a[prop]);
    };
  }

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
      key: 'height',
      label: 'Height',
      iconType: 'number',
    },
    {
      key: 'weight',
      label: 'Weight',
      iconType: 'number',
    },
  ];

  // Filter by name
  $: filteredData = fighterData.filter(({ name }) => {
    const lowerFilterName = filterName.toLocaleLowerCase();
    const lowerName = name.toLocaleLowerCase();
    return lowerName.includes(lowerFilterName);
  });

  // Filter columns data by order
  $: {
    const fighterDataCopy = [...fighterData];
    for (const { filteredKey, order } of orderFilters) {
      const filterFunction = FILTER_DICT[order].function;
      fighterDataCopy.sort(filterFunction(filteredKey));
    }
    filteredData = fighterDataCopy;
  }

  function removeArrayElementByKey({
    array,
    keyToRemove,
    keyValue,
  }: {
    array: Array<{ [key: string]: string }>;
    keyToRemove: string;
    keyValue: string;
  }) {
    const index = array.findIndex((x) => x[keyToRemove] === keyValue);
    const copy = array;
    if (index !== -1) {
      copy.splice(index, 1);
    }
    return copy;
  }

  const onChange: FormEventHandler<HTMLInputElement> = (e) => {
    const { name, checked } = e.currentTarget;

    orderFilters = removeArrayElementByKey({
      array: orderFilters,
      keyToRemove: 'filteredKey',
      keyValue: name,
    }) as Array<Filter>;

    if (checked) {
      orderFilters = [...orderFilters, { filteredKey: name, order: FILTER_DICT.asc.key }];
    } else {
      orderFilters = [...orderFilters, { filteredKey: name, order: FILTER_DICT.desc.key }];
    }
  };
</script>

<label>
  Filter athletes
  <input bind:value={filterName} type="text" />
</label>

<button
  on:click={() => {
    orderFilters = [];
  }}
>
  Reset filters
</button>

<p>{JSON.stringify(orderFilters)}</p>
<table>
  <thead>
    <tr>
      {#each tableHeadCells as { iconType, key, label }}
        <th>
          {#if iconType === 'number'}
            <FilterInput name={key} label={label} handleChange={onChange}>
              <AscOrderNumbers slot="ascIcon" />
              <DescOrderNumbers slot="descIcon" />
            </FilterInput>
          {:else if iconType === 'letter'}
            <FilterInput name={key} label={label} handleChange={onChange}>
              <AscOrderLetters slot="ascIcon" />
              <DescOrderLetters slot="descIcon" />
            </FilterInput>
          {/if}
        </th>
      {/each}
      <!-- <th>
        <FilterInput label="Name" bind:isChecked={nameAscOrder}>
          <AscOrderLetters slot="ascIcon" />
          <DescOrderLetters slot="descIcon" />
        </FilterInput>
      </th>
      <th>
        <FilterInput label="Age" bind:isChecked={ageAscOrder}>
          <AscOrderNumbers slot="ascIcon" />
          <DescOrderNumbers slot="descIcon" />
        </FilterInput>
      </th>
      <th>
        <FilterInput label="Height" bind:isChecked={heightAscOrder}>
          <AscOrderNumbers slot="ascIcon" />
          <DescOrderNumbers slot="descIcon" />
        </FilterInput></th
      >
      <th>
        <FilterInput label="Weight" bind:isChecked={weightAscOrder}>
          <AscOrderNumbers slot="ascIcon" />
          <DescOrderNumbers slot="descIcon" />
        </FilterInput></th
      > -->
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

  th,
  td {
    border: 1px solid black;
    padding: 8px;
    text-align: center;
  }

  td:nth-child(1) {
    text-align: left;
  }
</style>
