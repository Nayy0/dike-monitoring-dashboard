export default class Measure{
    
    public time: Date;
    public values : [number] ;
    public alert_level:string;

    constructor(sensors: any[],alert_level:string){
        this.time=new Date;
        this.alert_level=alert_level;
        this.values=[sensors[0].value];
        for (let i =1;i<sensors.length;i++){
            this.values.push(sensors[i].value);
        }
    }
}