<script>
  import Logo from './Logo.svelte';
  import ThemeSwitcher from './ThemeSwitcher.svelte';

  let navigationLinks = [
    {
      label: 'Athletes',
      route: '/athlete',
    },
    {
      label: 'Divisions',
      route: '/division',
    },
    {
      label: 'About',
      route: '/about',
    },
  ];

  let isOpen = false;
</script>

<header class="navbar" class:navbar--open={isOpen}>
  <nav class="navbar__container">
    <a href="/">
      <Logo />
    </a>
    <div class="navbar__anchor-container">
      {#each navigationLinks as { label, route }}
        <a class="navbar__anchor" href={route}>
          {label}
        </a>
      {/each}
    </div>
    <div class="navbar__theme">
      <ThemeSwitcher />
    </div>
    <input type="checkbox" class="hamburger" bind:checked={isOpen} />
  </nav>
</header>

<style>
  .navbar {
    padding: 1rem 0;
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    transform: scaleZ(1);
    backdrop-filter: blur(10px);
    width: 100%;
    z-index: 9;
  }

  .navbar__theme {
    margin-left: auto;
  }

  .navbar__container {
    width: var(--section-width);
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
  }

  .navbar__anchor {
    display: none;
    font-size: 1.4rem;
  }

  .navbar--open {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-color-menu-mobile);
    align-items: flex-start;
  }

  .navbar--open .navbar__anchor {
    display: block;
  }

  .navbar__anchor-container {
    display: flex;
    gap: 1.5rem;
  }

  .navbar--open .navbar__anchor-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  .hamburger {
    border: 1px solid white;
  }

  @media only screen and (min-width: 48rem) {
    .navbar__container {
      gap: 2rem;
    }

    .navbar__anchor-container {
      gap: 1rem;
    }

    .navbar__anchor {
      display: initial;
      font-size: 1.4rem;
    }

    .hamburger {
      display: none;
    }
  }
</style>
