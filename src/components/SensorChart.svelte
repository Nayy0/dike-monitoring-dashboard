<script lang="ts">
  import { onMount } from "svelte";
  import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Filler,
  } from "chart.js";
  import Annotation from "chartjs-plugin-annotation";

  Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Annotation);

  const { sensor, simulation } = $props<{ sensor: any; simulation: any }>();

  let canvas: HTMLCanvasElement;
  let chart: Chart;

  const yMax = () => sensor.vigilance_level / 0.75;

  const getValues = () =>
    [...simulation.history].reverse().map((m: any) => m.values[sensor.id - 1]);

  const getLabels = () => {
    const h = [...simulation.history].reverse();
    return h.map((m: any, i: number) => {
      if (i === 0 || i === 4 || i === h.length - 1)
        return new Date(m.time).toLocaleTimeString();
      return "";
    });
  };

  onMount(() => {
    chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: getLabels(),
        datasets: [
          {
            label: `${sensor.name} (${sensor.unit_abrevation})`,
            data: getValues(),
            borderColor: "#60a5fa",
            backgroundColor: "rgba(96, 165, 250, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: "#60a5fa",
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        scales: {
          x: {
            ticks: { color: "#94a3b8" },
            grid: { color: "#1e293b" },
          },
          y: {
            min: 0,
            max: yMax(),
            ticks: { color: "#94a3b8" },
            grid: { color: "#1e293b" },
          },
        },
        plugins: {
          legend: { labels: { color: "#e2e8f0" } },
          annotation: {
            annotations: {
              vigilance: {
                type: "line",
                yMin: sensor.vigilance_level,
                yMax: sensor.vigilance_level,
                borderColor: "#f59e0b",
                borderWidth: 2,
                borderDash: [6, 3],
                label: {
                  display: true,
                  content: `Vigilance : ${sensor.vigilance_level} ${sensor.unit_abrevation}`,
                  color: "#f59e0b",
                  backgroundColor: "transparent",
                  position: "start",
                  font: { size: 11 },
                },
              },
              danger: {
                type: "line",
                yMin: sensor.danger_level,
                yMax: sensor.danger_level,
                borderColor: "#ef4444",
                borderWidth: 2,
                borderDash: [6, 3],
                label: {
                  display: true,
                  content: `Danger : ${sensor.danger_level} ${sensor.unit_abrevation}`,
                  color: "#ef4444",
                  backgroundColor: "transparent",
                  position: "start",
                  font: { size: 11 },
                },
              },
            },
          },
        },
      },
    });
  });

  $effect(() => {
    const _ = simulation.history.length;
    if (!chart) return;
    chart.data.labels = getLabels();
    chart.data.datasets[0].data = getValues();
    chart.update();
  });
</script>

<div class="chart-wrapper">
  <p class="chart-title">{sensor.name}</p>
  <canvas bind:this={canvas}></canvas>
</div>

