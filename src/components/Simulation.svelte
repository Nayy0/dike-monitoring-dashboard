<script lang="ts">
    import Button from "./ButtonSimulation.svelte";
    import SimulationHistory from "./SimulationHistory.svelte";

    let {onClickSimulation, simulation, sensors} = $props();
</script>

<Button onClickSimulation={onClickSimulation} simulation={simulation}/>
<SimulationHistory simulation={simulation} sensors={sensors}/>