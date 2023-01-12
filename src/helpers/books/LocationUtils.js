export function getDistanceBetweenLocationsInMts(userLocation, bookLocation) {
    const lon1 =  userLocation.coords.longitude * Math.PI / 180;
    const lon2 = bookLocation.longitude * Math.PI / 180;
    const lat1 = userLocation.coords.latitude * Math.PI / 180;
    const lat2 = bookLocation.latitude * Math.PI / 180;

    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2), 2);
    
    distance = Math.ceil(12742000 * Math.asin(Math.sqrt(a)))   
    return (distance + " mtrs");
}