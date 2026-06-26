import Measure from "./Measure";

const dike_height= 11; // the value of the dike's height is in meters

export let simulation =$state({
    isOn:false,
    history : [] as Measure[] // an array to stock the last 10 measures
});

export const evaluate_alert_level = (sensor)=>{
    if(sensor.value >=sensor.danger_level){
        sensor.alert_level="danger";
    }
    else if(sensor.value >= sensor.vigilance_level){
        sensor.alert_level="vigilance";
    }
    else{
        sensor.alert_level="ok";
    }
}