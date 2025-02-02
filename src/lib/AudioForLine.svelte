<script lang="ts">
  import _ from "lodash"
  import sprachy from "$lib/sprachy"
  import SoundIndicator from "$lib/SoundIndicator.svelte"
  import type { SpeechSystem, Base64Audio } from "$lib/SpeechSystem"
  import { onDestroy } from "svelte"

  export let playImmediately: boolean = false
  export let disabled: boolean = false
  export let opts: Partial<Parameters<SpeechSystem["get"]>[0]>

  const { speech, user } = sprachy.expectSPA()
  let playingSound: boolean = false
  let loading = true
  let audio: Base64Audio | undefined

  $: audioOpts =
    opts.from && opts.message
      ? { from: opts.from, message: opts.message }
      : undefined
  $: enabled = $user?.enableSpeechSynthesis && audioOpts

  async function loadAudio() {
    loading = true
    try {
      audio = await speech.get(audioOpts!)
    } finally {
      loading = false
    }

    if (playImmediately) {
      playSound()
    }
  }

  $: if (enabled && !audio) {
    loadAudio()
  }

  export async function playSound() {
    if (!audio) return

    playingSound = true
    try {
      await speech.playAudioContent(audio)
    } finally {
      playingSound = false
    }
  }

  onDestroy(() => {
    // User muted the sound or went to another page, stop playing
    if (playingSound) speech.skip()
  })
</script>

{#if enabled}
  <SoundIndicator
    {loading}
    playing={playingSound}
    on:click={disabled ? () => null : playSound}
  />
{/if}
