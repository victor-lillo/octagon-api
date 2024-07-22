<script>
  import Logo from './Logo.svelte';
  import ThemeSwitcher from './ThemeSwitcher.svelte';

  let navigationLinks = [
    {
      label: 'Divisions',
      href: '/division',
    },
    {
      label: 'Athletes',
      href: '/athlete',
    },
    {
      label: 'API',
      href: '/api-documentation',
    },
    {
      label: 'About',
      href: '/about',
    },
  ];

  let isOpen = false;

  const handleChange = () => {
    isOpen = !isOpen;
    document.body.classList.toggle('no-scroll', isOpen);
  };
</script>

<header class="navbar" class:navbar--open={isOpen}>
  <nav class="navbar__container">
    <a href="/" aria-label="Navigate to home">
      <Logo />
    </a>
    <div class="navbar__anchor-container">
      {#each navigationLinks as { label, href }}
        <a class="navbar__anchor" aria-label={`Go to ${label} page`} href={href}>
          {label}
        </a>
      {/each}
    </div>
    <div class="navbar__theme">
      <ThemeSwitcher />
    </div>
    <button type="button" class="hamburger" on:click={handleChange} aria-label="Menu">
      <div />
      <div />
      <div />
      <p></p>
    </button>
  </nav>
</header>

<style>
  .navbar {
    height: var(--navbar-height);
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
    overflow: hidden;
  }

  .navbar--open .navbar__container {
    height: var(--navbar-height);
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
    background: none;
    border: none;
  }
  .hamburger div {
    display: block;
    background-color: var(--color-title);
    height: 3px;
    width: 25px;
    margin-top: 5px;
    margin-bottom: 5px;
    position: relative;
    left: 0;
    opacity: 1;
    transition: all 0.35s ease-out;
    transform-origin: center left;
    border-radius: 2px;
  }

  .hamburger div:nth-child(1) {
    margin-top: 0.3em;
  }

  .hamburger div:nth-child(1) {
    transform: translate(0%, 0%) rotate(0deg);
  }

  .hamburger div:nth-child(2) {
    opacity: 1;
  }

  .hamburger div:nth-child(3) {
    transform: translate(0%, 0%) rotate(0deg);
  }

  .navbar--open .hamburger div:nth-child(1) {
    transform: translate(15%, -33%) rotate(45deg);
  }

  .navbar--open .hamburger div:nth-child(2) {
    opacity: 0;
  }

  .navbar--open .hamburger div:nth-child(3) {
    transform: translate(15%, 33%) rotate(-45deg);
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
      position: relative;
      font-size: 1.4rem;
    }

    .navbar__anchor::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -2px;
      margin-left: auto;
      margin-right: auto;
      z-index: -1;
      height: 1px;
      border-radius: 2px;
      background-color: currentColor;
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform 0.35s ease-out;
    }

    .navbar__anchor:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }

    .hamburger {
      display: none;
    }
  }
</style>
