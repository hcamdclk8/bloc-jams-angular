 (function() {
     function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection(numberOfAlbums);
     }
 
     angular
         .module('blocJams')
         .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
 })();