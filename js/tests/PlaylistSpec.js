define(['Playlist'], function(Playlist) {
  var playlist;

  describe('Playlist', function() {
    beforeEach(function() {
      var store = {};
      spyOn(sessionStorage, 'getItem').and.callFake(function(key) {
        return store[key] || '[]';
      });
      spyOn(sessionStorage, 'setItem').and.callFake(function(key, value) {
        store[key] = value;
      });
      spyOn(sessionStorage, 'clear').and.callFake(function() { store = {} });
      sessionStorage.clear(); // FF fix

      playlist = new Playlist();
    });

    describe('addSong', function() {
      it('should add a song to the playlist', function(){
        playlist.addSong('Test');
        expect(sessionStorage.getItem('playlist')).toBe('[{"title":"Test"}]');
      });
    });

    describe('removeSong', function() {

    });
  });
});
