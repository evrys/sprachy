<script lang="ts">
  import _ from "lodash"
  import Message from "$lib/Message.svelte"
  import type { FillblankExercise } from "$lib/Exercise"
  import Sprachdown from "$lib/Sprachdown.svelte"
  import sprachy from "$lib/sprachy"
  import SoundIndicator from "$lib/SoundIndicator.svelte"
  import { browser } from "$app/environment"
  import type { Base64Audio } from "./SpeechSystem"
  import { onMount } from "svelte"

  const { speech, user } = sprachy.spa || {}

  export let line: FillblankExercise
  let playingSound: boolean = false
  let audioPromise: Promise<Base64Audio> | undefined

  $: parts = ((line: FillblankExercise) => {
    const [before, after] = line.message.split(/\[.+?\]/)
    return {
      before: before || "",
      after: after || "",
    }
  })(line)

  $: translation = ((line: FillblankExercise) => {
    return line.translation.replace(/\[.+?\]/, (substring) => {
      const highlight = substring.slice(1, -1)
      return `**${highlight}**`
    })
  })(line)

  if (browser) {
    onMount(() => {
      audioPromise = speech?.get(line)
    })
  }

  async function playSound() {
    if (!speech || !audioPromise) return

    playingSound = true
    try {
      await speech.playAudioContent(await audioPromise)
    } finally {
      playingSound = false
    }
  }
</script>

<Message from={line.from}>
  {#if $user?.enableSpeechSynthesis}
    <SoundIndicator playing={playingSound} on:click={playSound} />
  {/if}
  <Sprachdown inline source={parts.before} />
  <span class="fillblank">{line.canonicalAnswer}</span>
  <Sprachdown inline source={parts.after} />
  <div slot="after">
    <div class="translation">
      <Sprachdown inline source={translation} />
    </div>
  </div>
</Message>

<style>
  .translation :global(strong) {
    color: #86abff;
  }

  .translation {
    padding-top: 0.4rem;
    font-size: 90%;
    color: #444;
  }

  span.fillblank {
    color: #64b5f6;
  }
</style>
