import '../style/app.css'
import '../style/layout.css'
import '../style/sensor.css'
import '../style/global-state.css'
import '../style/history.css'
import '../style/controls.css'
import '../style/chart.css'
import { mount } from 'svelte'
import App from '../components/App.svelte'

mount(App, { target: document.getElementById('app')! })