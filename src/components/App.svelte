<script lang=ts>
    import {onMount} from 'svelte';
    import {water_flow,water_level,water_pressure, simulation, evaluate_alert_level,} from "../state.svelte";
    import Measure from '../Measure';
    import Sensor from './Sensor.svelte';
    import GlobalState from './GlobalState.svelte';
    import Simulation from './Simulation.svelte';

    //recalculates the water_pressure value
    $effect(()=>{water_pressure.value=water_level.value*0.0981});

    //updates the sensors alert level
    $effect(()=>evaluate_alert_level(water_level));
    $effect(()=>evaluate_alert_level(water_flow));
    $effect(()=>evaluate_alert_level(water_pressure));

    //a function to calculate the gllbal alert level
    const global_alert_level = $derived(()=>{
    if ((water_flow.alert_level)=="danger" || (water_level.alert_level)=="danger" || (water_pressure.alert_level)=="danger")
        return 'danger';
    else if ((water_flow.alert_level)=="vigilance" || (water_level.alert_level)=="vigilance" || (water_pressure.alert_level)=="vigilance")
        return 'vigilance';
    else
        return 'stable';
})

    // simulates changing of the water level and flow when the simulation is active
    const values_simulation=()=>{
        
        if(!simulation.isOn)
            return

        else{
            //pushing the current measure in the history, keeping only the ten last variations
            if(simulation.history.length==10)
                simulation.history.pop();
            simulation.history=[new Measure(water_level.value,water_flow.value,water_pressure.value,global_alert_level()),...simulation.history]


            let randomNumber=Math.random();
            //10% chance to have a big down of the water level
            if(randomNumber<0.1){
                water_level.value >0.3 ? water_level.value-=0.3 : water_level.value+=0.1;
                water_flow.value>9 ? water_flow.value-=9 : water_flow.value+=3;
            }//30% chance to have a small down of the water level
            else if (randomNumber<0.4){
                water_level.value >0.1 ? water_level.value-=0.1 : water_level.value+=0.1;
                water_flow.value>3 ? water_flow.value-=3 : water_flow.value+=3;
            }//40% chance to have a small up of the water level
            else if (randomNumber<0.8){
                water_level.value >0.1 ? water_level.value+=0.1 : water_level.value-=0.1;
                water_flow.value>3 ? water_flow.value+=3 : water_flow.value-=3;
            }//20% chance to have a big up of the water level
            else{
                water_level.value >0.3 ? water_level.value+=0.3 : water_level.value-=0.1;
                water_flow.value>3 ? water_flow.value+=3 : water_flow.value-=3;
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
    <Sensor name="Water level" value={water_level.value} unit="meters" alert_level={water_level.alert_level} />
    <Sensor name="Water pressure" value={water_pressure.value} unit="bar" alert_level={water_pressure.alert_level} />
    <Sensor name="Water flow" value={water_flow.value} unit="cube meters per second" alert_level={water_flow.alert_level} />
</div>
<div class="global_state">
    <GlobalState global_alert_level={global_alert_level()} />
</div>
<div>
    <Simulation onClickSimulation={onClickSimulation} simulation={simulation}/>
</div>