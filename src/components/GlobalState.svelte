<script lang="ts">
    let {global_alert_level}=$props();
</script>

<div class="statut {global_alert_level}">
  Statut : {global_alert_level.toUpperCase()}
</div>

<style>
  .stable    { background: green; color: white; }
  .vigilance { background: orange; color: white; }
  .danger    { background: red; color: white; }
</style>