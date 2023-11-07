if('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        this.navigator.serviceWorker.register('sw.js').then(function(registration) {
            // registrasi Berhasil
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err){
            // registrasi gagajl
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}