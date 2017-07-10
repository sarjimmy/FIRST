var default_zoom = 13;      
var default_radius = 2000;
var map,service,params,marker,markers_shown;

$(function(){
function initMap() {
        var loc = {lat: 47.6487731, lng: -122.3378029};
        map = new google.maps.Map($('#map')[0], {
          zoom: default_zoom,
          center: loc
        });

        service = new google.maps.places.PlacesService(map);

        var search_bar = new SearchBar(function(type){
          params = {
                'location':map.center,
                'radius':default_radius,
                'type':type
            };
          service.nearbySearch(params,callback);
          
        });


          search_bar.addTo($('body'));
}

function callback(results, status) {
        
          clearMarker();

        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }


function createMarker(place) {
        var placeLoc = place.geometry.location;
         marker = new google.maps.Marker({
          map: map,
          position: placeLoc
        });

        markers_shown.push(marker);

        google.maps.event.addListener(marker, 'click', function() {
          showDetailedInfo(place);
        });

        $('#close-details').click(function(){
          $('#place-info-wrapper').hide();
          clearMarker();
        });
      }


function clearMarker(){

       if (markers_shown) {
        _.each(markers_shown, function(marker) {
            marker.setMap(null);
        });
    }
    markers_shown = []; 
    
}

function showDetailedInfo(place){
        var req={placeId:place['place_id']};
        service.getDetails(req,function(place){

        if(place.photos){
        $('#place-image').attr('src',place.photos[0].getUrl({'maxWidth':408,'maxHeight':407}));
        }

        else{
        $('#place-image').attr('src','https://ssihplc.com/wp-content/uploads/no-image.png');
}
        $('.place-name').text(place['name']);
        $('.place-review-score').text(place['rating']);
        $('.place-type').text(place['types'][0]);
        $('.place-address').text(place['formatted_address']);
        $('#place-info-wrapper').show(); 
});        
        }

initMap();
})
