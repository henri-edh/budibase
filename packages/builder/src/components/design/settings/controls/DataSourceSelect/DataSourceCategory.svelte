<script>
  import { datasources } from "@/stores/builder"
  import { Divider, Heading } from "@budibase/bbui"

  export let dividerState
  export let heading
  export let dataSet
  export let value
  export let onSelect
  export let identifiers = ["resourceId"]

  $: displayDatasourceName = $datasources.list.length > 1

  function isSelected(entry) {
    if (!identifiers.length) {
      return false
    }
    for (const identifier of identifiers) {
      if (entry[identifier] !== value?.[identifier]) {
        return false
      }
    }
    return true
  }
</script>

{#if dividerState}
  <Divider />
{/if}
{#if heading}
  <div class="title">
    <Heading size="XS">{heading}</Heading>
  </div>
{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<ul class="spectrum-Menu" role="listbox">
  {#each dataSet as data}
    <li
      class="spectrum-Menu-item"
      class:is-selected={isSelected(data) && value?.type === data.type}
      role="option"
      aria-selected="true"
      tabindex="0"
      on:click={() => onSelect(data)}
    >
      <span class="spectrum-Menu-itemLabel">
        {data.datasourceName && displayDatasourceName
          ? `${data.datasourceName} - `
          : ""}{data.label}
      </span>
      <svg
        class="spectrum-Icon spectrum-UIIcon-Checkmark100 spectrum-Menu-checkmark spectrum-Menu-itemIcon"
        focusable="false"
        aria-hidden="true"
      >
        <use xlink:href="#spectrum-css-icon-Checkmark100" />
      </svg>
    </li>
  {/each}
</ul>

<style>
  .title {
    padding: 0 var(--spacing-m) var(--spacing-s) var(--spacing-m);
  }

  ul {
    list-style: none;
    padding-left: 0px;
    margin: 0px;
    width: 100%;
  }
</style>
