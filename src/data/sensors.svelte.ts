const sensors=$state([
    {
        id : 1,
        name : "Water level",
        value : 3.0, // The value of the level is in meters
        vigilance_level : 8.5,
        danger_level : 10,
        unit : "meters",
        alert_level : "ok"
    },
    {
        id: 2,
        name : "Water pressure",
        value : (3.0*0.0981), // The value of the water pressure is in bar. This is the inital value, it is recalculated thanks to the effect in App.svelte
        vigilance_level : 0.85,
        danger_level : 1.0,
        unit : "bar",
        alert_level : "ok"
    },
    {
        id : 3,
        name : "Water flow",
        value:(90), //the value of the water flow is in cubic meters
        vigilance_level : 150,
        danger_level : 300,
        unit : "cube meters",
        alert_level : "ok"
    }
]);
export default sensors;