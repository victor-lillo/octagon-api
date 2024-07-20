<script lang="ts">
  import dbData from '@db/fighters.json';
  import AthletesTable from './AthletesTable.svelte';

  // id,  category,  draws,  imgUrl,  losses,  name,  nickname,  wins,  status,  placeOfBirth,  trainsAt,  fightingStyle,  age,  height,  weight,  octagonDebut,  reach,  legReach
  const rawFightersData = Object.entries(dbData).map(([key, value]) => {
    return { id: key, ...value };
  });

  let filteredData: Array<{ [key: string]: string }> = [];
  let filterName = '';

  $: {
    // Filter by filterName
    filteredData = rawFightersData.filter(({ name }) => {
      const lowerFilterName = filterName.toLocaleLowerCase();
      const lowerName = name.toLocaleLowerCase();
      return lowerName.includes(lowerFilterName);
    });
  }
</script>

<section>
  <label>
    Filter
    <input bind:value={filterName} type="text" />
  </label>

  <button
    on:click={() => {
      const event = new CustomEvent('reset');
      document.dispatchEvent(event);
    }}
  >
    Reset columns
  </button>
</section>

<AthletesTable fightersData={filteredData} />

<style>
  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
  }

  @media (width < 48rem) {
    section {
      position: sticky;
      top: calc(var(--navbar-height) - 2px);
      backdrop-filter: blur(10px);
      z-index: 1;
      padding: 1rem;
    }
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  input {
    margin-block: 3px;
    width: 100%;
  }

  button {
    padding: 0.6rem 1.2rem;
    border-radius: var(--border-radius);
    border: none;
    background-color: var(--color-table-head);
    transition: background-color 0.3s ease;
    white-space: nowrap;
  }

  @media (hover: hover) {
    button:hover {
      background-color: var(--color-accent-2);
    }
  }
</style>
