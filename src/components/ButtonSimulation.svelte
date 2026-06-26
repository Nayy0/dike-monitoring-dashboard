<script lang="ts">
    let {onClickSimulation, simulation} = $props();
</script>


<button class='simulation_button' onclick={onClickSimulation}>
        {simulation.isOn ? "Pause ": "Start "}the simulation
</button>