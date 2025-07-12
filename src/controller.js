angular.module("module", ["ngRoute", "ngSanitize"])

    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false)
        $locationProvider.hashPrefix("")
        $routeProvider
            .when("/home", {templateUrl: "src/templates/home.html"})
            .when("/contacts", {templateUrl: "src/templates/contacts.html"})
            .when("/presskit", {templateUrl: "src/templates/presskit.html"})
            .when("/photos", {templateUrl: "src/templates/photos.html"})
            .when("/rider", {templateUrl: "src/templates/rider.html"})
            .otherwise({redirectTo: "/home"})
        songs.forEach(song => {
            $routeProvider.when("/" + song.alias, {templateUrl: "src/templates/song.html"})
        })
    })

    .controller("controller", function ($scope, $route, $sanitize, $sce) {
        $scope.photos = photos
        $scope.links = links
        $scope.songs = songs
        $scope.page = "home"
        $scope.song = undefined

        // change page value and song index every time there is a new routing
        // if a song page is selected, use generic tag "song" for any of the songs
        $scope.$on('$routeChangeSuccess', function (event, route) {
            $scope.page = route.$$route.originalPath.substring(1)
            $scope.song = songs.find(song => song.alias === $scope.page)
            if ($scope.song !== undefined) {
                $scope.page = "song"
            }
        })

        // set min-height of main section to have footer at the end every time an element or the entire window is resized
        const main = $("main")[0]
        const footer = $("footer")[0]
        const observer = new ResizeObserver(_ => resize(main, footer))
        observer.observe(main)
        observer.observe(footer)
        $(window).resize(() => resize(main, footer))

        // modify urls to include the full path to soundcloud while also setting them as trusted sources
        $scope.songs.forEach(song => {
            song.url = $sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + song.url + "&color=%23579D6C&show_user=false")
        })
    })

function resize(main, footer) {
    main.style.minHeight = (window.innerHeight - footer.offsetHeight - 70) + "px"
}
