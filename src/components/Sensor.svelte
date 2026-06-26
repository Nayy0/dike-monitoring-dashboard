<script lang="ts">
    let {sensor}=$props();
</script>
<div class="capteur">
  <h3>{sensor.name}</h3>
  <p>{sensor.value.toFixed(2)} {sensor.unit}</p>
  <p class="alert_level">Alert level : {sensor.alert_level}</p>
</div>