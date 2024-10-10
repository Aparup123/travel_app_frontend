export default function getDuration(start_date, end_date){
    return ((new Date(end_date)-new Date(start_date))/(24*3600*1000))+1
}