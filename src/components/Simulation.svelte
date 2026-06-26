<script lang="ts">
    import Button from "./ButtonSimulation.svelte";
    import SimulationHistory from "./SimulationHistory.svelte";

    let {onClickSimulation, simulation} = $props();
</script>

<Button onClickSimulation={onClickSimulation} simulation={simulation}/>
<SimulationHistory simulation={simulation} />