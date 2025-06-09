module.controller("song-controller", function ($scope, $location) {
    const alias = $location.path().substring(1)
    $scope.song = songs.filter(song => song.alias === alias)[0]

    // load song credits from js because the [innerHTML] property is not working
    $("#songCredits")[0].innerHTML = $scope.song.credits
})
