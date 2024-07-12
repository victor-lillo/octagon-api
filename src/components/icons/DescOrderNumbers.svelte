<script>
  export let size = '24';
  export let strokeWidth = '1.5';
</script>

<svg
  height={size}
  width={size}
  viewBox="0 0 24 24"
  stroke-width={strokeWidth}
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 15l3 3l3 -3" />
  <path d="M7 6v12" />
  <path d="M17 14a2 2 0 0 1 2 2v3a2 2 0 1 1 -4 0v-3a2 2 0 0 1 2 -2z" />
  <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  <path d="M19 5v3a2 2 0 0 1 -2 2h-1.5" />
</svg>
