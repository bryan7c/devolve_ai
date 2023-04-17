import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    if(!this.leafletElement){
      this.leafletElement = L.Routing.control({
        waypoints: this.props.waypoints,
        lineOptions: {
          styles: [this.props.lineStyles]
        }
      }).addTo(map.leafletElement);
    }
    return this.leafletElement.getPlan();
  }

  updateLeafletElement(props) {
    if(this.leafletElement){
      if(this.props.show){
        this.leafletElement.setWaypoints(this.props.waypoints);
      }else{
        this.leafletElement.setWaypoints([]);
      }
    }
  }
 
}

export default withLeaflet(Routing);