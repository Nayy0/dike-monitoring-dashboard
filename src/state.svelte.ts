import Measure from "./Measure";

const dike_height= 11; // the value of the dike's height is in meters

type Sensor ={
    value : number,
    vigilance_level : number,
    danger_level : number,
    alert_level : "" | "Vigilance." | "Danger !"
}

export let water_level : Sensor = {
    value : $state(3.0), // The value of the level is in meters
    vigilance_level : 8.5,
    danger_level : 10,
    alert_level : $state("")
}
export let water_pressure : Sensor = {
    value : $derived(water_level.value*0.0981), // The value of the water pressure is in bar
    vigilance_level : 0.85,
    danger_level : 1.0,
    alert_level : $state("")
}
export let water_flow : Sensor= {
    value:$state(90), //the value of the water flow is in cubic meters
    vigilance_level : 150,
    danger_level : 300,
    alert_level : $state("")
}

export let simulation =$state({
    isOn:false,
    history : [] as Measure[] // an array to stock the last 10 measures
});

const evaluate_alert_level = (sensor : Sensor)=>{
    if(sensor.value >= sensor.vigilance_level){
        sensor.alert_level="Vigilance.";
    }
    else if(sensor.value >=sensor.danger_level){
        sensor.alert_level="Danger !";
    }
    else{
        water_flow
        sensor.alert_level="";
    }

}

export let global_alert_level = $derived(()=>{
    if ((water_flow.alert_level)=="Danger !" || (water_level.alert_level)=="Danger !" || (water_pressure.alert_level)=="Danger !")
        return 'Danger !';
    else if ((water_flow.alert_level)=="Vigilance." || (water_level.alert_level)=="Vigilance." || (water_pressure.alert_level)=="Vigilance.")
        return 'Vigilance.';
    else
        return 'Stable.';
})