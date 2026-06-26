<script lang="ts">
    let {sensor}=$props();
</script>

<div class="sensor-card">
  <div>
    <p class="sensor-name">{sensor.name}</p>
    <span class="sensor-value">{sensor.value.toFixed(2)}</span>
    <span class="sensor-unit">{sensor.unit_abrevation}</span>
  </div>
  <span class="sensor-badge {sensor.alert_level}">{sensor.alert_level}</span>
</div>