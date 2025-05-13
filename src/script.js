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
        let side = window.innerWidth < 768
        if ($scope.navbar.side !== side) {
            $scope.navbar.side = side
            $scope.reset()
            $scope.$apply()
        }
    })

    // when dropdowns are changed, set to 0 if in page reset mode, otherwise open sidebar if needed
    $scope.$watch("navbar.drop", function (drop) {
        if ($scope.navbar.reset) {
            $scope.navbar.drop = 0
        } else {
            $scope.navbar.open = drop !== 0
        }
    })

    // when open is changed, set to false if in page reset mode or navbar in side mode, otherwise set width and drop
    $scope.$watch("navbar.open", function (open) {
        if ($scope.navbar.reset || !$scope.navbar.side) {
            $scope.navbar.open = false
        } else if (open) {
            $scope.navbar.width = "240px"
        } else {
            $scope.navbar.width = "40px"
            $scope.navbar.drop = 0
        }
    })

    // reset function to be called after each route change
    $scope.reset = function() {
        $scope.navbar.reset = true
        $scope.navbar.open = false
        $scope.navbar.drop = 0
        if ($scope.navbar.side) {
            $scope.navbar.class = "sidebar"
            $scope.navbar.width = "40px"
        } else {
            $scope.navbar.class = "navbar-expand"
            $scope.navbar.width = "100%"
        }
        $scope.navbar.offset = "40px"
    }

    // set properties and show body once everything is loaded
    $scope.songs = songs
    $scope.navbar = {side: window.innerWidth < 768}
    $scope.reset()
    $('body').show()
})

// function versions(song) {
//     return [song.title] + song.alternatives.map(alt => song.title + " [" + alt + "]")
// }
