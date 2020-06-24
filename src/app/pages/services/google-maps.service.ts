import { Injectable } from '@angular/core';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor() { }
  getDistanceBetween(lat1,long1,lat2,long2, radius){
    var from = new google.maps.LatLng(lat1,long1);
    var to = new google.maps.LatLng(lat2,long2);

    if(typeof google.maps.geometry !== "undefined"){
        if(google.maps.geometry.spherical.computeDistanceBetween(from,to) <= radius){
        console.log('Radius', radius);
        console.log('Distance Between',google.maps.geometry.spherical.computeDistanceBetween(
          from,to
        ));
        return true;
      }else{
        return false;
      }
    } else {
         setTimeout(this.getDistanceBetween, 250);
    }
  }
}
