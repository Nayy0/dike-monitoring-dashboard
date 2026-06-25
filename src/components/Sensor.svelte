<script lang="ts">
    let {name,value, unit, alert_level}=$props();
</script>
<div class="capteur">
  <h3>{name}</h3>
  <p>{value.toFixed(2)} {unit}</p>
  <p class="alert_level">Alert level : {alert_level}</p>
</div>