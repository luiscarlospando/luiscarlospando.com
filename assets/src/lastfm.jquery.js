/*

simple last.fm jQuery plugin
shows recently played tracks

Author: Ringo Rohe
       - with much help from Douglas Neiner

Custom tweaks by: Luis Carlos Pando (@mijo)


-- lastplayed --

Options:

apikey:         (string) Last.fm API key - get it from here: http://www.lastfm.com/api/account
username:       (string) username
limit:          (int) Number of tracks to load - optional, default is 20
cover:          (bool) show covers - optional, default is true
datetime:       (bool) show date and time - optional, default is true
refresh:        (int) number of seconds to check for new tracks - optional, default is 0 (no refresh)
grow:           (bool) if true new tracks extend the box, if false older tracks will be removed - optional, default is false
shownowplaying: (bool) shows currently playing tracks - optional, default is true


Usage:

$(document).ready(function() {
	$('#lastBox').lastplayed({
		apikey:     'b25b9595...',
		username:   'Username',
		limit:      5,
		cover:      true,
		datetime:   true,
		refresh:    30,
		grow:       true
	});
});



-- nowplaying --

Options

apikey:         (string) Last.fm API key - get it from here: http://www.lastfm.com/api/account
username:       (string) username
refresh:        (int) number of seconds to check for new tracks - optional, default is 0 (no refresh)
icon:			(string) url of a Icon showed beside the text - optional, default is false
hide:			(bool) hides the element when nothing is playing - optional, default is false
notplayingtext:	(string) text that is shown when nothing is played - optional, default is 'nothing playing'

Usage:

$('#nowPlayingBox').nowplaying({
	apikey:			'b25b9595...',
	username:		'Username',
	refresh:		30,
	icon:			'http://cdn.last.fm/flatness/global/icon_eq.gif',
	hide:			false,
	notplayingtext:	'some text'
});




############## BUGS ####################
- tell me if you find some



*/

(function ($) {

	/* ######################### Recent Tracks Class definition ################################# */

	var recentTracksClass = function (elem, options) {

		var $myDiv	 = elem,
			lasttime = 0,
			refresh	 = parseInt(options['refresh'], 10),
			$list,
			timer,
			lastCurrentPlaying = false;

		if (refresh > 0) {
			timer = window.setInterval(function(){
				doLastPlayedStuff();
			}, refresh * 1000);
		}

		doLastPlayedStuff();

		function doLastPlayedStuff() {

			// remove error div if exists
			$myDiv.children('.error').remove();

			//create URL
			var url = 'https://ws.audioscrobbler.com/2.0/?callback=?',
				params = {
					method:  "user.getrecenttracks",
					format:  "json",
					limit:   options.limit,
					user:    options.username,
					api_key: options.apikey
				};

			//sending request
			$.getJSON(url, params, function(data) {

				var foundCurrentPlayingTrack = false;

				//check for errors
				if (!data || !data.recenttracks) {
					return error('Username "' + options.username + '" does not exist!');
				} else if (!data.recenttracks.track) {
					return error('"' + options.username + '" has no tracks to show!');
				}

				//create ul if not exists
				$list = $myDiv.children('ul');
				if (!$list.length) {
					$list = $("<ul>").appendTo( $myDiv.html('') );
				}

				//walk through each Track - reversed to fill up list from latest to newest
				$(data.recenttracks.track.reverse()).each(function(i, track) {
					var tracktime, tracknowplaying, ts, listitem, dateCont;

					//getting timestamp from latestentry
					if(track.date && track.date.uts > lasttime) {
						tracktime = parseInt(track.date.uts, 10);
					}

					//check if entry is currently playing
					if( track['@attr'] && track['@attr'].nowplaying == 'true' ) {
						foundCurrentPlayingTrack = true;
						if( lastCurrentPlaying.name != track.name ) {
							lastCurrentPlaying = track;
							tracknowplaying = true;
							//remove old nowplaying entry
							$list.children('li.nowplaying').remove();
						}
					}

					if(tracktime > lasttime || (tracknowplaying && options.shownowplaying)) {

						// ------------ create list item -----------
						listitem = $( "<li>", {
							// add nowplaying class
							class: tracknowplaying ? "nowplaying" : "notplaying"
						});

						// ----------------- IMAGE -----------------
						if (options.cover) {
							if (track.image[2]['#text']) {
								var $cover = $("<img>", {
									alt: track.artist['#text'],
									src: track.image[2]['#text'],
									width: parseInt(options.coversize, 10)
								}).appendTo(listitem);

								if (options.coverlinks) {
									var coverpath = [
										track.artist['#text'], '/',
										track.album['#text']
									].join('').replace(/[\s]/gi, '+');

									$cover.wrap($("<a>", {
										href: lastfmLinkPrefix + coverpath,
										target: options.linktarget
									}));
								}
							}
						}

						// ---------------- DATE -------------------
						if (options.datetime) {

							if (tracknowplaying) {
								dateCont = 'now';
							} else {
								ts = new Date(tracktime * 1000);
								dateCont = makeTwo(ts.getDate()) + '.' + makeTwo(ts.getMonth() + 1) + ' - ' + makeTwo(ts.getHours()) + ':' + makeTwo(ts.getMinutes());
							}

							$("<div>", {
								className: "date",
								html: dateCont
							}).appendTo(listitem);
						}

						if (tracknowplaying) {
							// ----------- THIS MOMENT -----------------
							$("<div>", {
								class: 'this-moment',
								html: '<h5 class="latest-post text-center zero-margin"><i class="fa-solid fa-headphones"></i> En este momento estoy escuchando:</h5>'
							}).appendTo(listitem);
							

							// ----------------- TRACK -----------------
							$("<div>", {
								class: 'track',
								html: track.name
							}).appendTo(listitem);


							// ---------------- BY -----------------
							$("<div>", {
								class: 'by',
								html: '<span> por </span>'
							}).appendTo(listitem);


							// ---------------- ARTIST -----------------
							$("<div>", {
								class: 'artist',
								html: track.artist['#text']
							}).appendTo(listitem);


							// ---------------- FROM -----------------
							$("<div>", {
								class: 'from',
								html: '<span> del álbum </span>'
							}).appendTo(listitem);


							// ---------------- ALBUM ------------------
							$("<div>", {
								class: 'album',
								html: track.album['#text']
							}).appendTo(listitem);
						}

						//add listitem to list
						$list.prepend(listitem);

						if(!tracknowplaying) {
							lasttime = tracktime;
						}
					}

				});

				if( !foundCurrentPlayingTrack ) {
					lastCurrentPlaying = false;
					//remove old nowplaying entry
					$list.children('li.nowplaying').remove();
				}

				//throw old entries away
				if (options.grow === false) {
					while($list.children().length > options.limit) {
						$list.children('li').last().remove();
					}
				}

			});

		}

		function makeTwo(i) {
			return i < 10 ? '0' + i : i;
		}

		function error( message ) {
			 $("<p>", {
					className: "error",
					html: message
				}).appendTo($myDiv);
				window.clearInterval(timer);
		}

	};

	/* ######################## Recent Tracks Class ends here ################################# */





	/* ######################### Now Playing Class definition ################################# */

	var nowPlayingClass = function (elem, options) {

		var $myDiv	 = elem,
			refresh	 = parseInt(options['refresh'], 10),
			timer,
			lastCurrentPlaying = false;

		if (refresh > 0) {
			timer = window.setInterval(function(){
				nowPlayingInterval();
			}, refresh * 1000);
		}

		nowPlayingInterval();

		function nowPlayingInterval() {

			// remove error div if exists
			$myDiv.children('.error').remove();

			//create URL
			var url = 'https://ws.audioscrobbler.com/2.0/?callback=?',
				params = {
					method:  "user.getrecenttracks",
					format:  "json",
					limit:   1,
					user:    options.username,
					api_key: options.apikey
				};

			//sending request
			$.getJSON(url, params, function(data) {

				//check for errors
				if (!data || !data.recenttracks) {
					return error('Username "' + options.username + '" does not exist!');
				} else if (!data.recenttracks.track) {
					return error('"' + options.username + '" has no tracks to show!');
				}

				var track = data.recenttracks.track[0];

				if( track && track['@attr'] && track['@attr'].nowplaying == 'true' ) {
					var html = '';

					if (options.icon) {
						html = html + '<img src="' + options.icon + '" class="icon" alt="now playing icon" />';
					}

					html = html + '<span class="track">' + track.artist['#text'] + '</span>';
					html = html + ' - ';
					html = html + '<span class="track">' + track.name + '</span>';
					if(track.album['#text']) {
						html = html + ' (';
						html = html + '<span class="track">' + track.album['#text'] + '</span>';
						html = html + ')';
					}

					$myDiv.show();
					update(html);
				} else {
					if(options.hide) {
						$myDiv.hide();
					} else {
						update(options.notplayingtext)
					}
				}

			});

		}

		function error( message ) {
			 $("<p>", {
					className: "error",
					html: message
				}).appendTo($myDiv);
				window.clearInterval(timer);
		}

		function update( html ) {
			$myDiv.html( html );
		}

	};

	/* ######################## Now Playing Class ends here ################################# */








	/* ##################################### Recent Tracks Function ########################### */

	$.fn.lastplayed = function (options) {
		var opts = $.extend({}, $.fn.lastplayed.defaults, options);

		if (typeof(options.username) === "undefined") {
			return this;
		}

		if (typeof(options.apikey) === "undefined") {
			return this;
		}

		return this.each(function(){
			recentTracksClass($(this), opts);
		});

	};

	$.fn.lastplayed.defaults = {
		limit:			1,
		refresh:		0,
		cover:			false,
		datetime:		false,
		grow:			false,
		shownowplaying:	true
	};



	/* ################################# Now Playing Function ################################ */

	$.fn.nowplaying = function (options) {
		var opts = $.extend({}, $.fn.nowplaying.defaults, options);

		if (typeof(options.username) === "undefined") {
			return this;
		}

		if (typeof(options.apikey) === "undefined") {
			return this;
		}

		return this.each(function(){
			nowPlayingClass($(this), opts);
		});

	};

	$.fn.nowplaying.defaults = {
		refresh:		0,
		icon:			false,
		hide:			false,
		notplayingtext: 'nothing playing'
	};

}(jQuery));
