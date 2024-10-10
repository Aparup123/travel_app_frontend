export default function getCurrentDate(){
    const date=new Date();
    const currentDate=date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString()
    return currentDate
}