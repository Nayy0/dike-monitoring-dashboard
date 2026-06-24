
export let sensors =$state({
    water_level: 3.2, // The value of the level is in meters
    water_pressure : 0.3, // The value of the water pressure is in bar
    water_flow : 80 //the value of the water flow is in cubic meters
});

sensors.water_pressure=$derived(sensors.water_level*0.0981)
export let simulation ={
    isOn:false,
    history : []
};

const dike_height= 11; // the value of the dike's height is in meters



const evaluate_level = (water_level : number)=>{
    if(water_level >= 8.5)
        return "Vigilance.";
    else if(water_level >=10.0)
        return "Warning!";
    else
        return ""
}

const evaluate_pressure = (water_pressure : number)=>{
    if(water_pressure >= 0.85)
        return "Vigilance.";
    else if(water_pressure >=1.0)
        return "Warning!";
    else
        return ""

}

const evaluate_flow = (water_flow : number)=>{
    if(water_flow >= 150)
        return "Vigilance.";
    else if(water_flow >=300)
        return "Warning!";
    else
        return ""

}

export let alert_level = $derived(()=>{
    if (evaluate_flow(sensors.water_flow)=="Warning!" || evaluate_level(sensors.water_level)=="Warning!" || evaluate_pressure(sensors.water_pressure)=="Warning!")
        return "Warning!"
    else if (evaluate_flow(sensors.water_flow)=="Vigilance." || evaluate_level(sensors.water_level)=="Vigilance." || evaluate_pressure(sensors.water_pressure)=="Vigilance.")
        return "Vigilance."
    else
        return "Everything is OK."
})