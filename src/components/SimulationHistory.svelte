<script lang="ts">
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
    {#each simulation.history as measure (measure.time)}
      <tr>
        <td>{measure.time.toLocaleTimeString()}</td>
        <td>{measure.water_level.toFixed(2)}</td>
        <td>{measure.water_flow.toFixed(1)}</td>
        <td>{measure.water_pressure.toFixed(3)}</td>
        <td>{measure.alert_level}</td>
      </tr>
    {/each}
  </tbody>
</table>