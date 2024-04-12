function runDirections(start, destination) {

    var dir = MQ.routing.directions();

    console.log(typeof start)
    console.log(typeof destination)

    dir.route({
        key: "1Qg2WrWJ7pmr6ojEZ3nbUc2trjVc4s9N",
        from: start,
        to: destination
    });
    //mapquest routing directions API

    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        createStartMarker: (location) => {
            var pin;
            var marker;

            custom_pin = L.icon({
                iconUrl: 'images/orange-pin.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });
            marker = L.marker(location.latlng, {icon: pin}).addTo(map);
            return marker;
        },
        createEndMarker: (location) => {
            var pin;
            var marker;

            custom_pin = L.icon({
                iconUrl: 'images/gold-pin.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });
            marker = L.marker(location.latlng, {icon: pin}).addTo(map);
            return marker;
        }
    });

    window['directionsLayer'] = new CustomRouteLayer({
        directions: dir,
        fitBounds: true
    });

    map.addLayer(window['directionsLayer']);
}

//function that runs when form is submitted
function submitForm(event) {
    event.preventDefault();
    console.log('Form Submitted');

    if (window['directionsLayer'] !== null) {
        map.removeLayer(window['directionsLayer']);
    }

    //uncomment after testing
    start = document.getElementById("start").value;
    destination = document.getElementById("destination").value;
    runDirections(start, destination);
    document.getElementById("form").reset();
}

const form = document.getElementById('form');

//call the submitForm function when submitting the form
form.addEventListener('submit', submitForm);