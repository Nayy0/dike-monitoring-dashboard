# Dike Monitoring Dashboard

A real-time monitoring dashboard for dike surveillance, built with **Svelte 5** and **TypeScript**. The application simulates sensor data (water level, water pressure, water flow) and displays live charts, sensor cards, a global alert status, and a measurement history table — all updating automatically as the simulation runs.

---

## Getting Started

### Prerequisites

Make sure you have **Node.js** (v18 or later) and **npm** installed. Check this node.js official website if tou don't : ```https://nodejs.org/en/download```

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Nayy0/dike-monitoring-dashboard.git
cd dike-monitoring-dashboard
npm install
```

### Running the application

**Windows**
```bash
npm run dev
```
Then open your browser at `http://localhost:5173`.

**macOS / Linux**
```bash
npm run dev
```
Then open your browser at `http://localhost:5173`.

> The command is the same on all platforms. The only prerequisite is having Node.js installed. On macOS, Node.js can be installed via [Homebrew](https://brew.sh/) with `brew install node`. On Linux, use your distribution's package manager (e.g. `sudo apt install nodejs npm` on Ubuntu/Debian).

---

## Project Structure

```
index.html
src/
├── components/
│   ├── App.svelte              # Root component — orchestrates the layout and simulation loop
│   ├── ButtonSimulation.svelte # Start / Pause button for the simulation
│   ├── GlobalState.svelte      # Displays the overall alert status of the dike
│   ├── Sensor.svelte           # Displays the current value and alert level of a single sensor
│   ├── SensorChart.svelte      # Real-time line chart for a single sensor (Chart.js)
│   ├── Simulation.svelte       # Wrapper that groups the history table and simulation controls
│   └── SimulationHistory.svelte# Table showing the last 10 recorded measurements
├── data/
│   └── sensors.svelte.ts       # Reactive sensor definitions (id, name, thresholds, unit...)
├── scripts/
│   ├── main.ts                 # Application entry point — mounts App into the DOM
│   ├── Measure.ts              # Class representing a single measurement snapshot
│   └── state.svelte.ts         # Global reactive state (simulation status, history, alert logic)
└── style/
    ├── app.css                 # Global reset, CSS variables, typography
    ├── chart.css               # SensorChart styles
    ├── controls.css            # Button styles
    ├── global-state.css        # GlobalState panel styles
    ├── history.css             # SimulationHistory table styles
    ├── layout.css              # Dashboard grid layout
    └── sensor.css              # Sensor card styles
```

### Component roles

| Component | Role |
|---|---|
| `App.svelte` | Mounts all components, runs the simulation interval, computes the global alert level |
| `Sensor.svelte` | Displays name, current value, unit, and alert badge for one sensor |
| `SensorChart.svelte` | Renders a live Chart.js line chart with vigilance and danger threshold lines |
| `GlobalState.svelte` | Full-width status panel that changes color based on the worst active alert |
| `SimulationHistory.svelte` | Table of the last 10 `Measure` snapshots with color-coded alert levels |
| `ButtonSimulation.svelte` | Toggles `simulation.isOn` to start or pause the simulation |
| `Simulation.svelte` | Layout wrapper combining the history table and the simulation button |

---

## State Management and Data Flow

### Reactive state — `src/scripts/state.svelte.ts`

Global state is declared using the **Svelte 5 rune** `$state`, which makes objects deeply reactive without needing a store. Any component that reads a `$state` value will automatically re-render when that value changes.

```typescript
export let simulation = $state({
  isOn: false,
  history: [] as Measure[]
});
```

The `evaluate_alert_level` function is also exported from this file. It updates the `alert_level` property of a sensor in place based on its current value relative to its thresholds.

### Sensor definitions — `src/data/sensors.svelte.ts`

Sensors are defined as a single `$state` array. Each object in the array holds all the metadata for one sensor (id, name, value, thresholds, unit). Adding a new sensor object to this array is sufficient to make it appear across the entire UI — no other file needs to be modified for the layout.

### Reactive effects — `App.svelte`

`App.svelte` uses Svelte 5 `$effect` declarations to:

- Keep `water_pressure.value` synchronized with `water_level.value` (derived physical relationship)
- Re-evaluate each sensor's `alert_level` whenever its `value` changes

```typescript
$effect(() => { sensors[1].value = sensors[0].value * 0.0981 });
```

The global alert level is computed with `$derived`, which re-evaluates automatically when any sensor's alert level changes:

```typescript
const global_alert_level = $derived(() => { ... });
```

### Simulation loop

The simulation is started in `onMount`, which runs once after the component is rendered. It sets up a `setInterval` that fires every 1500ms and, if `simulation.isOn` is true, randomly varies sensor values and appends a new `Measure` to `simulation.history`.

The cleanup function returned by `onMount` clears the interval when the component is destroyed, preventing memory leaks.

---

## Adding a New Sensor

The project is designed to make adding sensors straightforward. Follow these steps:

**1. Add the sensor definition in `src/data/sensors.svelte.ts`**

Append a new object to the `$state` array:

```typescript
{
  id: 4,
  name: "Soil moisture",
  value: 35.0,
  vigilance_level: 70,
  danger_level: 85,
  unit: "percent",
  unit_abrevation: "%",
  alert_level: "ok"
}
```

**2. Add its simulation behaviour in `App.svelte`**

Inside `values_simulation`, add how the new sensor's value should vary for each random scenario:

```typescript
// example: soil moisture rises slightly with water level
sensors[3].value += sensors[0].value > 5 ? 0.5 : -0.2;
```

**3. That's it**

Because the layout iterates over the `sensors` array with `{#each}`, the new sensor will automatically appear in:
- The sensor cards column
- The live charts column (with its own chart and threshold lines)
- The history table (a new column is added automatically)

No CSS or template changes are required.