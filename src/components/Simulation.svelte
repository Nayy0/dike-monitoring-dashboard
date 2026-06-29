<script lang="ts">
    import ButtonSimulation from "./ButtonSimulation.svelte";
    import SimulationHistory from "./SimulationHistory.svelte";
    let {onClickSimulation, simulation, sensors} = $props();
</script>

<div class="col-controls">
  <div class="controls-wrapper">
    <ButtonSimulation onClickSimulation={onClickSimulation} simulation={simulation} />
  </div>
</div>
<div class="col-history">
  <SimulationHistory simulation={simulation} sensors={sensors} />
</div>