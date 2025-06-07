const module = angular.module("module", ["ngRoute"])

module.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false)
    $locationProvider.hashPrefix("")
    $routeProvider
        .when("/", {templateUrl: "src/pages/home.html"})
        .when("/contacts", {templateUrl: "src/pages/contacts.html"})
        .when("/presskit", {templateUrl: "src/pages/presskit.html"})
        .when("/photos", {templateUrl: "src/pages/photos.html"})
        .when("/rider", {templateUrl: "src/pages/rider.html"})
        .otherwise({redirectTo: "/"})
    songs.forEach(s => {
        $routeProvider.when("/" + s.alias, {templateUrl: "src/pages/" + s.alias + ".html"})
    })
})

module.controller("controller", function ($scope) {
    // assign constants
    $scope.songs = songs
    $scope.links = links
    $scope.photos = photos

    // home data and functions
    $scope.home = {song: 0, play: false, audio: null}
    $scope.homePlayer = homePlayer($scope)
    $scope.formatTime = formatTime
    $scope.home.audio = new Audio("res/audio/" + songs[$scope.home.song].alias + ".mp3")
    $scope.home.audio.addEventListener('loadeddata', () => {
        $scope.$apply()
    })
    $scope.home.audio.addEventListener('timeupdate', () => {
        $scope.$apply()
    })

    // show the body once everything is loaded
    $('body').show()
})