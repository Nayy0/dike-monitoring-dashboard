<script lang="ts">
    let {global_alert_level}=$props();
</script>

<div class="statut {global_alert_level}">
  Statut : {global_alert_level.toUpperCase()}
</div>

