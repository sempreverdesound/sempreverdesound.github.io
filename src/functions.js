const homePlayer = $scope => function (direction) {
    if (direction !== 0) {
        $scope.home.song = ($scope.home.song + $scope.songs.length + direction) % $scope.songs.length
        $scope.home.audio?.pause()
        $scope.home.audio = new Audio("res/audio/" + songs[$scope.home.song].alias + ".mp3")
        $scope.home.audio.addEventListener('loadeddata', () => {
            $scope.$apply()
        })
        $scope.home.audio.addEventListener('timeupdate', () => {
            $scope.$apply()
        })
        $scope.home.play = false
    } else if ($scope.home.play) {
        $scope.home.play = false
        $scope.home.audio.pause()
    } else {
        $scope.home.play = true
        $scope.home.audio.play().then(_ => null)
    }
}

// utility functions

function formatTime(seconds) {
    if (isNaN(seconds)) {
        return ""
    }
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
