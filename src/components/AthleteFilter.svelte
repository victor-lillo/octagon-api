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
    Filter athletes
    <input bind:value={filterName} type="text" />
  </label>

  <button
    on:click={() => {
      const event = new CustomEvent('reset');
      document.dispatchEvent(event);
    }}
  >
    Reset columns filters
  </button>
</section>

<AthletesTable fightersData={filteredData} />

<style>
  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  @media (width < 48rem) {
    section {
      position: sticky;
      top: var(--navbar-height);
      backdrop-filter: blur(10px);
      z-index: 1;
    }
  }
  @media (width > 48rem) {
    section {
      flex-direction: row;
    }
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  input {
    margin-block: 3px;
  }

  button {
    padding: 0.6rem 1.2rem;
    border-radius: var(--border-radius);
    border: none;
    background-color: var(--color-table-head);
    transition: background-color 0.3s ease;
  }

  @media (hover: hover) {
    button:hover {
      background-color: var(--color-accent-2);
    }
  }
</style>
