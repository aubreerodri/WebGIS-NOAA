function runDirections(start, destination) {
    var dir = L.mapquest.directions();

    dir.setLayerOptions({
        startMarker: {
            icon: 'circle',
            iconOptions: {
                size: 'sm',
                primaryColor: '#1fc715',
                secondaryColor: '#1fc715',
                symbol: 'A'
            },
            draggable: false
        },
        endMarker: {
            icon: 'circle',
            iconOptions: {
                size: 'sm',
                primaryColor: '#e9304f',
                secondaryColor: '#e9304f',
                symbol: 'B'
            },
            draggable: false
        },
        routeRibbon: {
            color: "#2aa6ce",
            opacity: 1.0,
            showTraffic: true
        }
    });

    dir.route({
        start: start,
        end: destination
    }, (err, response) => {
        var CustomRouteLayer = L.mapquest.directionsLayer({
            directionsResponse: response
        });

        window['directionsLayer'] = CustomRouteLayer;

        CustomRouteLayer.addTo(map);
    });
}

//function that runs when form is submitted
function submitForm(event) {
    event.preventDefault();

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