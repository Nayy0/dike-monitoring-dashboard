export default class Measure{
    
    public time: number;
    public water_level : number;
    public water_flow: number;
    public water_pressure : number;
    public alert_level:string;

    constructor(water_level:number,water_flow:number, water_pressure:number,alert_level:string){
        this.time=Date.now();
        this.water_level=water_level;
        this.water_flow=water_flow;
        this.water_pressure=water_pressure;
        this.alert_level=alert_level;
    }
}