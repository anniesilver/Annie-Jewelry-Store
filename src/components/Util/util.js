export function roundPrice(price) {
    return parseFloat(price).toFixed(2);
}

export function formatDate(time){
    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, '0');
    const day = String(time.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
}

export function covertToDate(timestamp){
    const date = new Date(timestamp);
    return formatDate(date);
}
