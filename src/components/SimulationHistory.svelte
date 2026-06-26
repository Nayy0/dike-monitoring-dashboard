<script lang="ts">
    import { each } from "chart.js/helpers";
  import Measure from "../Measure.js";

  let {simulation} =$props();
</script>

<table class='history'>
  <thead class='table_header'>
    <tr>
      <th>Time</th>
      <th>Water Level (m)</th>
      <th>Water Flow (m³/s)</th>
      <th>Water Pressure (bar)</th>
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