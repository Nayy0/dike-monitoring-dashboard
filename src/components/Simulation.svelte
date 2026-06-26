<script lang="ts">
    import Button from "./ButtonSimulation.svelte";
    import SimulationHistory from "./SimulationHistory.svelte";

    let {onClickSimulation, simulation, sensors} = $props();
</script>

<div class="controls-wrapper">
  <Button onClickSimulation={onClickSimulation} simulation={simulation} />
</div>