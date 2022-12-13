const CACHE_NAME = 'bumble-cache-v1';

const URLS = [
  '/',
  '/src/App.tsx',
  '/src/main.tsx',
]; 

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => {
              console.log("Opened cache");
              return cache.addAll(URLS);
          })
          .catch(err => { 
              console.log(err);
              throw err;
          })
    );
});

self.addEventListener('fetch', event => { 
    event.respondWith( 
        caches.match(event.request) 
            .then(response => { 
                if (response) { 
                    return response; 
                } 

        const fetchRequest = event.request.clone(); 
        return fetch(fetchRequest) 
        .then(response => { 
            if(!response || response.status !== 200 || response.type !== 'basic') { 
                return response; 
            } 

            const responseToCache = response.clone(); 
            caches.open(CACHE_NAME) 
                .then(cache => { 
                    cache.put(event.request, responseToCache); 
                }); 
                return response; 
        }); 
    }) 
); 
}); 

self.addEventListener('activate', function(event) { 
    event.waitUntil( 
        caches.keys().then(cacheNames => { 
            return Promise.all( 
                cacheNames.map(name => caches.delete(name))  
            )
        })
    ); 
});
