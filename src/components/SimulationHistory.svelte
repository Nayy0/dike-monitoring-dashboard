<script lang="ts">
    import { each } from "chart.js/helpers";
  import Measure from "../Measure.js";

  let {simulation,sensors} =$props();
</script>

<table class='history'>
  <thead class='table_header'>
    <tr>
      <th>Time</th>
      {#each sensors as sensor}
        <th>{sensor.name} ({sensor.unit_abrevation})</th>
      {/each}
      <th>Alert Level</th>
    </tr>
  </thead>
  <tbody>
    {#each simulation.history as measure }
      <tr>
        <td>{measure.time.toLocaleTimeString()}</td>
        {#each measure.values as value}
        <td>{value.toFixed(2)}</td>
        {/each}
        <td>{measure.alert_level}</td>
      </tr>
    {/each}
  </tbody>
</table>