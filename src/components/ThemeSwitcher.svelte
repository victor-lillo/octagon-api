<script>
  const DARK_THEME_CLASS = 'theme-dark'

  let isDark = false

  function handleClick() {
    isDark = !isDark

    const root = document.documentElement
    root.classList.toggle(DARK_THEME_CLASS, isDark)
  }
</script>

<button on:click={handleClick}>
  {isDark ? '🌞' : '🌑'}
</button>

<style>
  button {
    background: none;
    border: 1px solid transparent;
    font-size: 1.2rem;
    padding: 0.6rem;
  }

  button:hover {
    border-color: var(--color-primary-light-3);
  }
</style>
