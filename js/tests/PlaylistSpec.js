define(['Playlist'], function(Playlist) {
  var playlist;

  describe('Playlist', function() {
    beforeEach(function() {
      var store = {};
      spyOn(sessionStorage, 'getItem').and.callFake(function(key) {
        return store[key] || '[]';
      });
      spyOn(sessionStorage, 'setItem').and.callFake(function(key, value) {
        store[key] = value + '';
      });
      spyOn(sessionStorage, 'clear').and.callFake(function() { store = {} });
      sessionStorage.clear(); // FF fix

      playlist = new Playlist();
    });

    describe('initialize', function() {
      describe('when session store is empty', function() {
        it('the playlist should start empty', function() {
          var pl = new Playlist();
          expect(pl.playlist).toEqual([]);
        });
      });

      describe('when session store has values already', function() {
        it('should set the playlist to what is in the session store', function() {
          var expectedPlaylist = [{title: 'Test'}];
          sessionStorage.setItem('playlist', JSON.stringify(expectedPlaylist));
          var pl = new Playlist();
          expect(pl.playlist.length).toBe(1);
          expect(pl.playlist).toEqual(expectedPlaylist);
        });
      });
    });

    describe('addSong', function() {
      it('should add a song to the playlist', function() {
        expect(playlist.count()).toBe(0);

        playlist.addSong('Test');

        var expected = [{title: 'Test'}];
        var results = JSON.parse(sessionStorage.getItem('playlist'));

        expect(playlist.count()).toBe(1);
        expect(results).toEqual(expected);
      });

      it('should call updatePlaylist', function() {
        spyOn(playlist, 'updatePlaylist');
        playlist.addSong('Test');
        expect(playlist.updatePlaylist).toHaveBeenCalled();
      });
    });

    describe('removeSong', function() {
      it('should remove the song from the playlist', function() {
        playlist.addSong('Test1');
        playlist.addSong('Test2');
        playlist.addSong('Test3');

        expect(playlist.count()).toBe(3);

        playlist.removeSong(1);

        var expected = [{title: 'Test1'}, {title: 'Test3'}];
        var results = JSON.parse(sessionStorage.getItem('playlist'));

        expect(playlist.count()).toBe(2);
        expect(results).toEqual(expected);
      });

      it('should call updatePlaylist', function() {
        playlist.addSong('Test1');
        playlist.addSong('Test2');
        playlist.addSong('Test2');

        spyOn(playlist, 'updatePlaylist');
        playlist.removeSong(2);
        expect(playlist.updatePlaylist).toHaveBeenCalled();
      });     
    });
  });
});
