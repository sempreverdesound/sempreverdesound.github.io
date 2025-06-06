// noinspection JSValidateTypes

const songs = [
    {title: "Intro (Empathy Is The Glue)", page: "intro", alternatives: []},
    {title: "Erbatoccare", page: "erbatoccare", alternatives: ["Extended Mix"]},
    {title: "Le Mani/La Festa", page: "lmlf", alternatives: ["Extended Mix"]}
]

const module = angular.module("module", ["ngRoute"])

// Routing Configuration
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
        $routeProvider.when("/" + s.page, {templateUrl: "src/pages/" + s.page + ".html"})
    })
})

// Controller Configuration
module.controller("controller", function ($scope) {
    // when resizing, reset the view if changing threshold
    $(window).resize(function () {
        let icons = window.innerWidth < 992
        if ($scope.icons !== icons) {
            $scope.icons = icons
            $scope.$apply()
        }
    })
    // set properties and show body once everything is loaded
    $scope.songs = songs
    $scope.icons = window.innerWidth < 992
    $('body').show()
})

// function versions(song) {
//     return [song.title] + song.alternatives.map(alt => song.title + " [" + alt + "]")
// }
