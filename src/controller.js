angular.module("module", ["ngRoute", "ngSanitize"])

    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false)
        $locationProvider.hashPrefix("")
        $routeProvider
            .when("/home", {templateUrl: "src/templates/home.html"})
            .when("/contacts", {templateUrl: "src/templates/contacts.html"})
            .when("/thanks", {templateUrl: "src/templates/thanks.html"})
            .when("/presskit", {templateUrl: "src/templates/presskit.html"})
            .when("/photos", {templateUrl: "src/templates/photos.html"})
            .when("/rider", {templateUrl: "src/templates/rider.html"})
            .otherwise({redirectTo: "/home"})
        tracks.forEach(track => {
            $routeProvider.when("/" + track.alias, {templateUrl: "src/templates/track.html"})
        })
    })

    .controller("controller", function ($scope, $route, $sanitize, $sce) {
        $scope.tracks = tracks
        $scope.photos = photos
        $scope.links = links
        $scope.page = undefined
        $scope.track = undefined

        // change page value and song index every time there is a new routing
        // if a song page is selected, use generic tag "song" for any of the songs
        $scope.$on('$routeChangeSuccess', function (event, route) {
            $scope.page = route.$$route.originalPath.substring(1)
            $scope.track = tracks.find(track => track.alias === $scope.page)
            if ($scope.track !== undefined) {
                $scope.page = ($scope.track.rework === undefined) ? "song" : "rework"
            }
        })

        // modify urls to include the full path to soundcloud while also setting them as trusted sources
        $scope.tracks.forEach(track => {
            track.url = $sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + track.url + "&color=%23579D6C&show_user=false")
        })
    })
