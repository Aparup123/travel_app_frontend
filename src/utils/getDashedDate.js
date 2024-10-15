export default function getDashedDate(isoDate){
    if(!isoDate)return ""
    return isoDate.split('T')[0]
}