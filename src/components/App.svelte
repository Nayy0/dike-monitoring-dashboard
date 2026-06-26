<script lang=ts>
    import {onMount} from 'svelte';
    import {simulation, evaluate_alert_level,} from "../state.svelte";
    import Measure from '../Measure';
    import Sensor from './Sensor.svelte';
    import GlobalState from './GlobalState.svelte';
    import Simulation from './Simulation.svelte';
    import SensorChart from './SensorChart.svelte';
    import sensors  from '../data/sensors.svelte';

    //recalculates the water_pressure value
    $effect(()=>{sensors[1].value=sensors[0].value*0.0981});

    //updates the sensors alert level
    for(let i=0;i<sensors.length;i++){
        $effect(()=>evaluate_alert_level(sensors[i]));
    }

    //a function to calculate the global alert level
    const global_alert_level = $derived(()=>{
    for (let i=0;i<sensors.length;i++){
        if(sensors[i].alert_level=="danger")
            return "danger"
    }
    for (let i=0;i<sensors.length;i++){
        if(sensors[i].alert_level=="vigilance")
            return "vigilance";
    }
    return 'stable';
})

    // simulates changing of the water level and flow when the simulation is active
    // to add a new sensor to the simulation just add for each scenario, the variation of the value of the sensor
    const values_simulation=()=>{
        if(!simulation.isOn)
            return

        else{
            //pushing the current measure in the history, keeping only the ten last variations
            if(simulation.history.length==10)
                simulation.history.pop();
            let currentMeasure = new Measure(sensors,global_alert_level());
            simulation.history=[currentMeasure,...simulation.history];


            let randomNumber=Math.random();
            //10% chance to have a big down of the water level
            if(randomNumber<0.1){
                sensors[0].value >0.3 ? sensors[0].value-=0.3 : sensors[0].value+=0.1;
                sensors[2].value>9 ? sensors[2].value-=9 : sensors[2].value+=3;
            }//30% chance to have a small down of the water level
            else if (randomNumber<0.4){
                sensors[0].value >0.1 ? sensors[0].value-=0.1 : sensors[0].value+=0.1;
                sensors[2].value>3 ? sensors[2].value-=3 : sensors[2].value+=3;
            }//40% chance to have a small up of the water level
            else if (randomNumber<0.8){
                sensors[0].value >0.1 ? sensors[0].value+=0.1 : sensors[0].value-=0.1;
                sensors[2].value>3 ? sensors[2].value+=3 : sensors[2].value-=3;
            }//20% chance to have a big up of the water level
            else{
                sensors[0].value >0.3 ? sensors[0].value+=0.3 : sensors[0].value-=0.1;
                sensors[2].value>3 ? sensors[2].value+=3 : sensors[2].value-=3;
            }
        }

    };

    // start the simulation interval when the component is mounted
    onMount(()=>{
        const simulation_interval= setInterval(values_simulation,1500);

        return ()=>clearInterval(simulation_interval); //clear the interval when the component is destroyed
    });


    //function that start or top the simulation
    const onClickSimulation=()=>{
        if(simulation.isOn)
            simulation.isOn=false;
        else
            simulation.isOn=true;
    }


</script>

<div class="sensors">
    {#each sensors as sensor}
        <Sensor sensor={sensor} />

    {/each}
</div>
<div class="global_state">
    <GlobalState global_alert_level={global_alert_level()} />
</div>
<div>
    <Simulation onClickSimulation={onClickSimulation} simulation={simulation}/>
</div>
<div>
    {#each sensors as sensor}
        <SensorChart sensor={sensor} simulation={simulation}/>
    {/each}
</div>