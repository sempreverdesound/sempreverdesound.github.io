module.controller("song-controller", function ($scope, $location) {
    const alias = $location.path().substring(1)
    $scope.song = songs.filter(song => song.alias === alias)[0]

    $scope.time = "00:00"
    $scope.duration = ""

    $scope.audio = new Audio("res/" + $scope.song.alias + ".mp3")
    $scope.audio.addEventListener("loadedmetadata", () => {
        $scope.duration = format($scope.audio.duration)
        $scope.$apply()
    })
    $scope.audio.addEventListener("timeupdate", () => {
        $scope.time = format($scope.audio.currentTime)
        $scope.$apply()
    })

    $scope.progress = () => 100 * $scope.audio.currentTime / $scope.audio.duration

    // toggle function for playing/pausing the audio
    $scope.toggle = () => {
        if ($scope.audio.paused) {
            $scope.audio.play()
        } else {
            $scope.audio.pause()
        }
    }

    // progress bar function
    $scope.bar = event => {
        const value = (event.pageX - event.currentTarget.offsetLeft) / event.currentTarget.offsetWidth
        $scope.audio.currentTime = value * $scope.audio.duration
    }

    // load song credits from js because the [innerHTML] property is not working
    $("#songCredits")[0].innerHTML = $scope.song.credits
})
