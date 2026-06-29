<script lang="ts">
  let {simulation,sensors} =$props();
</script>

<div class="history-wrapper">
  <p class="history-title">Historique des mesures</p>
  <table>
    <thead>
      <tr>
        <th>Time</th>
        {#each sensors as sensor}
          <th>{sensor.name} ({sensor.unit_abrevation})</th>
        {/each}
        <th>Alert Level</th>
      </tr>
    </thead>
    <tbody>
      {#each simulation.history as measure}
        <tr>
          <td>{measure.time.toLocaleTimeString()}</td>
          {#each measure.values as value}
            <td>{value.toFixed(2)}</td>
          {/each}
          <td class="{measure.alert_level}">{measure.alert_level}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>