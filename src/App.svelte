<script lang=ts>
    import {onMount} from 'svelte';
    import {sensors, simulation, alert_level} from "./state.svelte";


    // simulates changing of the water level and flow when the simulation is active
    const values_simulation=()=>{
        
        if(!simulation.isOn)
            return

        else{
            let randomNumber=Math.random();
            //10% chance to have a big down of the water level
            if(randomNumber<0.1){
                sensors.water_level >0.3 ? sensors.water_level-=0.3 : sensors.water_level+=0.1;
                sensors.water_flow>9 ? sensors.water_flow-=9 : sensors.water_flow+=3;
            }//30% chance to have a small down of the water level
            else if (randomNumber<0.4){
                sensors.water_level >0.1 ? sensors.water_level-=0.1 : sensors.water_level+=0.1;
                sensors.water_flow>3 ? sensors.water_flow-=3 : sensors.water_flow+=3;
            }//40% chance to have a small up of the water level
            else if (randomNumber<0.8){
                sensors.water_level >0.1 ? sensors.water_level+=0.1 : sensors.water_level-=0.1;
                sensors.water_flow>3 ? sensors.water_flow+=3 : sensors.water_flow-=3;
            }//20% chance to have a big up of the water level
            else{
                sensors.water_level >0.3 ? sensors.water_level+=0.3 : sensors.water_level-=0.1;
                sensors.water_flow>3 ? sensors.water_flow+=3 : sensors.water_flow-=3;
            }
        }

    };

    // start the simulation interval when the component is mounted
    onMount(()=>{
        const simulation_interval= setInterval(values_simulation,2000);

        return ()=>clearInterval(simulation_interval); //clear the interval when the component is destroyed
    })


</script>
