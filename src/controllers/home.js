module.controller("home-controller", function ($scope) {
    $scope.photos = photos

    const frame = document.createElement("iframe")
    frame.setAttribute("width", "100%")
    frame.setAttribute("height", "310px")
    frame.setAttribute("allowtransparency", "true")
    frame.setAttribute("frameborder", "no")
    frame.setAttribute("scrolling", "no")
    frame.setAttribute("src",
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2034293238" +
        "&color=%23579D6C&show_teaser=false&show_playcount=false"
    )
    $("#homePlayer")[0].appendChild(frame)
})