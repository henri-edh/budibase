<script lang="ts">
  import "@spectrum-css/checkbox/dist/index-vars.css"
  import "@spectrum-css/fieldgroup/dist/index-vars.css"
  import { createEventDispatcher } from "svelte"
  import type { ChangeEventHandler } from "svelte/elements"

  export let value = false
  export let id: string | undefined = undefined
  export let text: string | undefined = undefined
  export let disabled = false
  export let readonly = false
  export let size: "S" | "M" | "L" | "XL" = "M"
  export let indeterminate = false

  const dispatch = createEventDispatcher()
  const onChange: ChangeEventHandler<HTMLInputElement> = event => {
    dispatch("change", event.currentTarget.checked)
  }

  $: sizeClass = `spectrum-Checkbox--size${size}`
</script>

<label
  class="spectrum-Checkbox spectrum-Checkbox--emphasized {sizeClass}"
  class:checked={value}
  class:is-indeterminate={indeterminate}
  class:readonly
>
  <input
    checked={value}
    {disabled}
    on:change={onChange}
    type="checkbox"
    class="spectrum-Checkbox-input"
    {id}
  />
  <span class="spectrum-Checkbox-box">
    <svg
      class="spectrum-Icon spectrum-UIIcon-Checkmark100 spectrum-Checkbox-checkmark"
      focusable="false"
      aria-hidden="true"
    >
      <use xlink:href="#spectrum-css-icon-Checkmark100" />
    </svg>
    <svg
      class="spectrum-Icon spectrum-UIIcon-Dash100 spectrum-Checkbox-partialCheckmark"
      focusable="false"
      aria-hidden="true"
    >
      <use xlink:href="#spectrum-css-icon-Dash100" />
    </svg>
  </span>
  {#if text}
    <span class="spectrum-Checkbox-label">{text}</span>
  {/if}
</label>

<style>
  .spectrum-Checkbox--sizeL .spectrum-Checkbox-checkmark {
    transform: scale(1.1);
    left: 55%;
    top: 55%;
  }
  .spectrum-Checkbox--sizeXL .spectrum-Checkbox-checkmark {
    transform: scale(1.2);
    left: 60%;
    top: 60%;
  }
  .spectrum-Checkbox-input {
    opacity: 0;
  }
  .readonly {
    pointer-events: none;
  }
</style>
