function formatDate(date){
    const month = date.getUTCMonth() + 1; //months from 1-12
    const day = date.getDate();
    const year = date.getUTCFullYear();

    const newdate = year + "-" + month + "-" + day;
    return newdate;
}

export {formatDate}