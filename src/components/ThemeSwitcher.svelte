<script lang="ts">
  const STORAGE_THEME_KEY = 'theme';
  const DARK_THEME_CLASS = 'theme-dark';

  let isDark = false;

  function handleClick() {
    isDark = !isDark;
    const root = document.documentElement;
    root.classList.toggle(DARK_THEME_CLASS, isDark);
    localStorage.setItem(STORAGE_THEME_KEY, isDark ? 'dark' : 'light');
  }

  $: {
    if (!import.meta.env.SSR) {
      isDark = document.documentElement.classList.contains('theme-dark');
    }
  }
</script>

<button type="button" aria-label="Switch web theme" on:click={handleClick}>
  {isDark ? '🌞' : '🌑'}
</button>

<style>
  button {
    background: none;
    border: 1px solid transparent;
    font-size: 1.7rem;
    padding: 0.6rem;
  }

  @media (hover: hover) {
    button:hover {
      border-color: var(--color-primary-light-3);
    }
  }
</style>
