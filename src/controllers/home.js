module.controller("home-controller", function ($scope) {
    // photos data
    $scope.photos = photos

    // song data
    $scope.time = "00:00"
    $scope.duration = "03:11"
    $scope.index = 0
    $scope.songs = songs.map(song => {
        const audio = new Audio("res/" + song.alias + ".mp3")
        audio.addEventListener("timeupdate", () => {
            // update time label at passing of time
            $scope.time = format(audio.currentTime)
            $scope.$apply()
        })
        audio.addEventListener("ended", () => {
            // go to the next song when a song finishes
            $scope.player(1)
            $scope.$apply()
        })
        return {title: song.title, audio: audio}
    })

    $scope.song = () => {
        return $scope.songs[$scope.index]
    }

    $scope.progress = () => {
        const audio = $scope.song().audio
        return 100 * audio.currentTime / audio.duration
    }

    // player buttons function
    $scope.player = direction => {
        const oldAudio = $scope.song().audio
        // if backward button is pressed and song has been played for more than 2 seconds, reset the time and return
        if (direction === -1 && oldAudio.currentTime > 2) {
            oldAudio.currentTime = 0
            return
        }
        // if forward/backward is pressed, get the next/prev song and play it if the previous was playing or was ended
        // otherwise the play/pause toggler is pressed
        if (direction !== 0) {
            $scope.index = ($scope.index + $scope.songs.length + direction) % $scope.songs.length
            const newAudio = $scope.song().audio
            newAudio.currentTime = 0
            $scope.duration = format(newAudio.duration)
            if (!oldAudio.paused || oldAudio.ended) {
                oldAudio.pause()
                newAudio.play()
            }
        } else if (oldAudio.paused) {
            oldAudio.play()
        } else {
            oldAudio.pause()
        }
    }

    // progress bar function
    $scope.bar = event => {
        const audio = $scope.song().audio
        const value = (event.pageX - event.currentTarget.offsetLeft) / event.currentTarget.offsetWidth
        audio.currentTime = value * audio.duration
    }

    // pause song when changing page
    $scope.$on("$locationChangeSuccess", () => $scope.song().audio.pause())
})
