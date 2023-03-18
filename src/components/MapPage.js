import { useEffect, useRef } from "react";

export default function MapPage() {

    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA-op-TbziDDg3zZtQ-lZOAVybyV3HL7ts&callback=initMap';
    script.async = false;

    let map;
    window.initMap = function(google) {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
          });        
    };
      
    document.head.appendChild(script);

    return (
        <div>{map}</div>
    )
}