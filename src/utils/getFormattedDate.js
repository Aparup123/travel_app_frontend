export default function getFormattedDate(isoDate){
    let date=new Date(isoDate)
    let res=date.getDate()+" "+date.toLocaleString('default', { month: 'long' })+", "+date.getFullYear()
    return res
}