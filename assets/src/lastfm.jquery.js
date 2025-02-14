(function ($) {
    var recentTracksClass = function (elem, options) {
        var $myDiv = elem,
            lasttime = 0,
            refresh = parseInt(options["refresh"], 10),
            $list,
            timer,
            lastCurrentPlaying = false;

        if (refresh > 0) {
            timer = window.setInterval(function () {
                doLastPlayedStuff();
            }, refresh * 1000);
        }

        doLastPlayedStuff();

        function doLastPlayedStuff() {
            // remove error div if exists
            $myDiv.children(".error").remove();

            // Usar nuestro endpoint
            $.getJSON(
                "https://luiscarlospando.com/api/lastfmStatus",
                function (data) {
                    var foundCurrentPlayingTrack = false;

                    //check for errors
                    if (!data || !data.recenttracks) {
                        return error(
                            'Username "' +
                                options.username +
                                '" does not exist!'
                        );
                    } else if (!data.recenttracks.track) {
                        return error(
                            '"' + options.username + '" has no tracks to show!'
                        );
                    }

                    //create ul if not exists
                    $list = $myDiv.children("ul");
                    if (!$list.length) {
                        $list = $("<ul>").appendTo($myDiv.html(""));
                    }

                    //walk through each Track - reversed to fill up list from latest to newest
                    $(data.recenttracks.track.reverse()).each(
                        function (i, track) {
                            var tracktime,
                                tracknowplaying,
                                ts,
                                listitem,
                                dateCont;

                            //getting timestamp from latestentry
                            if (track.date && track.date.uts > lasttime) {
                                tracktime = parseInt(track.date.uts, 10);
                            }

                            //check if entry is currently playing
                            if (
                                track["@attr"] &&
                                track["@attr"].nowplaying == "true"
                            ) {
                                foundCurrentPlayingTrack = true;
                                if (
                                    !lastCurrentPlaying ||
                                    lastCurrentPlaying.name != track.name
                                ) {
                                    lastCurrentPlaying = track;
                                    tracknowplaying = true;
                                    //remove old nowplaying entry
                                    $list.children("li.nowplaying").remove();
                                }
                            }

                            if (
                                tracktime > lasttime ||
                                (tracknowplaying && options.shownowplaying)
                            ) {
                                // ------------ create list item -----------
                                listitem = $("<li>", {
                                    // add nowplaying class
                                    class: tracknowplaying
                                        ? "nowplaying"
                                        : "notplaying",
                                });

                                // ----------------- IMAGE -----------------
                                if (options.cover) {
                                    if (track.image[2]["#text"]) {
                                        var $cover = $("<img>", {
                                            alt: track.artist["#text"],
                                            src: track.image[2]["#text"],
                                            width: parseInt(
                                                options.coversize,
                                                10
                                            ),
                                        }).appendTo(listitem);

                                        if (options.coverlinks) {
                                            var coverpath = [
                                                track.artist["#text"],
                                                "/",
                                                track.album["#text"],
                                            ]
                                                .join("")
                                                .replace(/[\s]/gi, "+");

                                            $cover.wrap(
                                                $("<a>", {
                                                    href:
                                                        lastfmLinkPrefix +
                                                        coverpath,
                                                    target: options.linktarget,
                                                })
                                            );
                                        }
                                    }
                                }

                                // ---------------- DATE -------------------
                                if (options.datetime) {
                                    if (tracknowplaying) {
                                        dateCont = "now";
                                    } else {
                                        ts = new Date(tracktime * 1000);
                                        dateCont =
                                            makeTwo(ts.getDate()) +
                                            "." +
                                            makeTwo(ts.getMonth() + 1) +
                                            " - " +
                                            makeTwo(ts.getHours()) +
                                            ":" +
                                            makeTwo(ts.getMinutes());
                                    }

                                    $("<div>", {
                                        className: "date",
                                        html: dateCont,
                                    }).appendTo(listitem);
                                }

                                if (tracknowplaying) {
                                    // ----------- THIS MOMENT -----------------
                                    $("<div>", {
                                        class: "this-moment",
                                        html: '<h5 class="latest-post text-center zero-margin"><i class="fa-solid fa-headphones"></i> En este momento estoy escuchando:</h5>',
                                    }).appendTo(listitem);

                                    // ----------------- TRACK -----------------
                                    $("<div>", {
                                        class: "track",
                                        html: track.name,
                                    }).appendTo(listitem);

                                    // ---------------- BY -----------------
                                    $("<div>", {
                                        class: "by",
                                        html: "<span> por </span>",
                                    }).appendTo(listitem);

                                    // ---------------- ARTIST -----------------
                                    $("<div>", {
                                        class: "artist",
                                        html: track.artist["#text"],
                                    }).appendTo(listitem);

                                    // ---------------- FROM -----------------
                                    $("<div>", {
                                        class: "from",
                                        html: "<span> del álbum </span>",
                                    }).appendTo(listitem);

                                    // ---------------- ALBUM ------------------
                                    $("<div>", {
                                        class: "album",
                                        html: track.album["#text"],
                                    }).appendTo(listitem);
                                }

                                //add listitem to list
                                $list.prepend(listitem);

                                if (!tracknowplaying) {
                                    lasttime = tracktime;
                                }
                            }
                        }
                    );

                    if (!foundCurrentPlayingTrack) {
                        lastCurrentPlaying = false;
                        //remove old nowplaying entry
                        $list.children("li.nowplaying").remove();
                    }

                    //throw old entries away
                    if (options.grow === false) {
                        while ($list.children().length > options.limit) {
                            $list.children("li").last().remove();
                        }
                    }
                }
            );
        }

        function makeTwo(i) {
            return i < 10 ? "0" + i : i;
        }

        function error(message) {
            $("<p>", {
                className: "error",
                html: message,
            }).appendTo($myDiv);
            window.clearInterval(timer);
        }
    };

    $.fn.lastplayed = function (options) {
        var opts = $.extend({}, $.fn.lastplayed.defaults, options);

        if (typeof options.username === "undefined") {
            return this;
        }

        return this.each(function () {
            recentTracksClass($(this), opts);
        });
    };

    $.fn.lastplayed.defaults = {
        limit: 1,
        refresh: 0,
        cover: false,
        datetime: false,
        grow: false,
        shownowplaying: true,
    };
})(jQuery);
