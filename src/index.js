module.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false)
    $locationProvider.hashPrefix("")
    $routeProvider
        .when("/home", {templateUrl: "src/templates/home.html", controller: "home-controller"})
        .when("/contacts", {templateUrl: "src/templates/contacts.html"})
        .when("/presskit", {templateUrl: "src/templates/presskit.html"})
        .when("/photos", {templateUrl: "src/templates/photos.html"})
        .when("/rider", {templateUrl: "src/templates/rider.html"})
        .otherwise({redirectTo: "/home"})
    songs.forEach(song => {
        $routeProvider.when("/" + song.alias, {templateUrl: "src/templates/song.html", controller: "song-controller"})
    })
})

module.controller("index-controller", function ($scope, $location) {
    $scope.songs = songs
    $scope.links = links
    $scope.page = "home"

    // change page value every time there is a new routing (use generic tag "song" for any of the songs)
    $scope.$on("$locationChangeSuccess", () => {
        const page = $location.path().substring(1)
        $scope.page = songs.map(song => song.alias).includes(page) ? "song" : page
    })

    // set min-height of main section to have footer at the end every time an element or the entire window is resized
    const main = $("main")[0]
    const footer = $("footer")[0]
    const observer = new ResizeObserver(_ => resize(main, footer))
    observer.observe(main)
    observer.observe(footer)
    $(window).resize(() => resize(main, footer))
})

function resize(main, footer) {
    main.style.minHeight = (window.innerHeight - footer.offsetHeight - 70) + "px"
}