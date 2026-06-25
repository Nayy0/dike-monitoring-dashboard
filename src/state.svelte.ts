import Measure from "./Measure";

const dike_height= 11; // the value of the dike's height is in meters

type Sensor ={
    value : number,
    vigilance_level : number,
    danger_level : number,
    alert_level : "ok" | "vigilance" | "danger"
}

export let water_level : Sensor = $state({
    value : 3.0, // The value of the level is in meters
    vigilance_level : 8.5,
    danger_level : 10,
    alert_level : "ok"
})
export let water_pressure : Sensor = $state({
    value : (water_level.value*0.0981), // The value of the water pressure is in bar. This is the inital value, it is recalculated thanks to the effect in App.svelte
    vigilance_level : 0.85,
    danger_level : 1.0,
    alert_level : "ok"
})
export let water_flow : Sensor= $state({
    value:(90), //the value of the water flow is in cubic meters
    vigilance_level : 150,
    danger_level : 300,
    alert_level : "ok"
})

export let simulation =$state({
    isOn:false,
    history : [] as Measure[] // an array to stock the last 10 measures
});

export const evaluate_alert_level = (sensor : Sensor)=>{
    if(sensor.value >= sensor.vigilance_level){
        sensor.alert_level="vigilance";
    }
    else if(sensor.value >=sensor.danger_level){
        sensor.alert_level="danger";
    }
    else{
        sensor.alert_level="ok";
    }

}