<script lang="ts">
  import LevelBar from "$lib/LevelBar.svelte"
  import LearnDevPanel from "$lib/LearnDevPanel.svelte"
  import sprachy from "./sprachy"
  import { dev } from "$app/environment"

  const spa = sprachy.expectSPA()
  const { learning, progressByPatternId } = spa

  $: experience =
    $learning && "pattern" in $learning
      ? $progressByPatternId[$learning.pattern.id]?.experience
      : null
</script>

<div class="sidebar">
  {#if $learning}
    <div class="overview">
      <div>{$learning.why}</div>
      {#if experience != null && "pattern" in $learning}
        {#key $learning.pattern.id}
          <LevelBar {experience} />
        {/key}
      {/if}
      {#if $learning.type === "dialogue"}
        <small class="text-secondary"
          >&lt;&lt; Press Enter to continue dialogue &gt;&gt;</small
        >
      {/if}
    </div>
  {/if}

  {#if dev}
    <LearnDevPanel />
  {/if}
</div>

<style>
  .sidebar {
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    padding: 1rem;
    padding-top: 5rem;
    border-right: 1px solid #ccc;
    z-index: 1;
    background-color: white;
    width: 300px;

    display: flex;
    flex-direction: column;
  }
</style>
