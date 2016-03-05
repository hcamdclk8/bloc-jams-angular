 (function() {
     function SongPlayer($rootScope, Fixtures) {
         
 /**
 * @desc 
 * @type {Object}
 */
         var SongPlayer = {};
         
 /**
 * @desc inject fixtures to store album info
 * @type function
 */     
         var currentAlbum = Fixtures.getAlbum();
         
 /**
 * @desc get index of songs from album
 * @type function
 */ 
         
          var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
          };

/**
 * @desc current song playing
 * @type {Object}
 */
         
         SongPlayer.currentSong = null;
         
 /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
         SongPlayer.currentTime = null;
         
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
         var currentBuzzObject = null;
         
 /**
 * @function playSong
 * @desc Plays song and sets playing property to true
 * @param {Object} song
 */
         var playSong = function (song) {
             currentBuzzObject.play();
             song.playing = true;
         }
         
 /**
 * @function stopSong
 * @desc Stops song and sets playing property to null
 * @param {Object} song
 */
         var stopSong = function (song) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
         }
         
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
        var setSong = function(song) {
            if (currentBuzzObject) {
               /* currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;*/
                stopSong(song);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                 $rootScope.$apply(function() {
                     SongPlayer.currentTime = currentBuzzObject.getTime();
                 });
             });
            
            SongPlayer.currentSong = song;
         };
         
 /**
 * @function play
 * @desc Play current or new song
 * @param {Object} song
 */
         
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                 setSong(song);             
                 playSong(song);        
             } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
            }
        };
         
 /**
 * @function pause
 * @desc Pause current song
 * @param {Object} song
 */
         
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
         
         
 /**
 * @function previous 
 * @desc plays song from previous button
 * 
 */
         
          SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
              
                   if (currentSongIndex < 0) {
                       /* currentBuzzObject.stop();
                         SongPlayer.currentSong.playing = null; */
                          stopSong(song); 
                     } else {
                             var song = currentAlbum.songs[currentSongIndex];
                             setSong(song);
                             playSong(song);
                         }
              
              
           };
         
          /**
 * @function next 
 * @desc plays song from next button
 * 
 */
         
          SongPlayer.next = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;
              
                   if (currentSongIndex < 0) {
                      /*   currentBuzzObject.stop();
                         SongPlayer.currentSong.playing = null; */
                           stopSong(song); 
                     } else {
                             var song = currentAlbum.songs[currentSongIndex];
                             setSong(song);
                             playSong(song);
                         }
              
              
           };
           
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('$rootScope','SongPlayer', SongPlayer);
 })();


 /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
 SongPlayer.setCurrentTime = function(time) {
     if (currentBuzzObject) {
         currentBuzzObject.setTime(time);
     }
 };