var CACHE_NAMA ='fiks-cache-v1';
var urlsToCache = [
'/',
'/assets/img/fiks512.png',
'/assets/vendor/aos/aos.css',
'/assets/vendor/bootstrap/css/bootstrap.min.css',
'/assets/vendor/bootstrap-icons/bootstrap-icons.css',
'/assets/vendor/boxicons/css/boxicons.min.css',
'/assets/vendor/glightbox/css/glightbox.min.css',
'/assets/vendor/swiper/swiper-bundle.min.css',
'/assets/css/style.css',
'/assets/img/hero-bg-fajar.jpg',
'/assets/img/profile-img-fajar.jpg',
'/assets/vendor/purecounter/purecounter_vanilla.js',
'/assets/vendor/aos/aos.js',
'/assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
'/assets/vendor/glightbox/js/glightbox.min.js',
'/assets/vendor/isotope-layout/isotope.pkgd.min.js',
'/assets/vendor/swiper/swiper-bundle.min.js',
'/assets/vendor/waypoints/noframework.waypoints.js',
'/assets/vendor/php-email-form/validate.js',
'/assets/js/main.js',
'/index.html'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAMA)
        .then(function(cache){
            console.log('Opened cache');
            console.log('Caching resources:', urlsToCache);
            return cache.addAll(urlsToCache)
                .catch(function(error) {
                    console.error('Error caching resources:', error);
                });
        })
    );
});



self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
        if (response) {
            return response;
        }

        return fetch(event.request).then(function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAMA).then(function(cache) {
            cache.put(event.request, responseToCache);
            });

            return response;
        });
        })
    );
});

self.addEventListener('activate', function(event){

    var cacheWhitelist = CACHE_NAMA;

    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(cacheNames){
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// push notification
self.addEventListener('push', function(event) {
    if (self.Notification.permission === 'granted') {
      // Izin notifikasi telah diberikan, Anda dapat menampilkan pemberitahuan
      const options = {
        body: 'Apakah Kamu Mau Berlangganan?',
        icon: 'assets/img/ring.png',
        actions: [
          { action: 'yes', title: 'Ya' },
          { action: 'no', title: 'Tidak' }
        ],
        data: {
          senderId: '12345',
          messageId: '67890'
        },
        silent: true,
        timestamp: Date.now()
      };
      
  
      event.waitUntil(
        self.registration.showNotification('Notifikasi', options)
      );
    } else {
      // Izin notifikasi tidak diberikan
    }
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
  
    if (event.action === 'yes') {
      // Tindakan "Ya" diambil
      // Menampilkan notifikasi dengan ucapan "Anda memilih Ya"
      self.registration.showNotification('Terimakasih', {
        body: 'Makasih Yaa Kamu Sudah Berlangganan',
        icon: 'assets/img/happy.png'
      });
    } else if (event.action === 'no') {
      // Tindakan "Tidak" diambil
      // Menampilkan notifikasi dengan ucapan "Anda memilih Tidak"
      self.registration.showNotification('yaah sayang sekali :(', {
        body: 'mungkin lain kali yaa',
        icon: 'assets/img/sad.png'
      });
    } else {
      // Notifikasi di-klik tanpa memilih tindakan apa pun
      // Lakukan sesuatu ketika notifikasi di-klik tanpa memilih "Ya" atau "Tidak"
      console.log('Anda mengklik notifikasi');
    }
  });