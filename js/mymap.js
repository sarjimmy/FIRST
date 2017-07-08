var default_zoom = 13;      
var map;
var infowindow;
var service;
$(function(){
function initMap() {
        var loc = {lat: 47.6487731, lng: -122.3378029};
        map = new google.maps.Map($('#map')[0], {
          zoom: default_zoom,
          center: loc
        });

        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: loc,
          radius: 2000,
          type:['restaurant']},callback);
}

function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }


function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: placeLoc
        });

        google.maps.event.addListener(marker, 'click', function() {
          //infowindow.setContent(place.name);
          //infowindow.open(map, this);
          showDetailedInfo(place);
        });
      }

function showDetailedInfo(place){
        var req={placeId:place['place_id']};
        service.getDetails(req,function(place){
        $('#hero-header-wrapper img').attr('src',place.photos[0].getUrl({'maxWidth':408,'maxheight':407}));
        $('.place-name').text(place['name']);
        $('.place-review-score').text(place['rating']);
        $('.place-type').text(place['types'][0]);
        $('#place-info-wrapper').show(); 
});        
        }

initMap();
})
