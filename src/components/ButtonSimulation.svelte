<script lang="ts">
    let {onClickSimulation, simulation} = $props();
</script>


<button
  class="btn-simulation {simulation.isOn ? 'active' : ''}"
  onclick={onClickSimulation}
>
  {simulation.isOn ? "Pause" : "Start"} simulation
</button>