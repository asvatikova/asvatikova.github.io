self.addEventListener('install', event => {
    console.log("Service worker install");
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    console.log("Service worker activate");
});

self.addEventListener('fetch', event => {
    if (event.request.url.includes("getSavedUsers")) {
        console.log("Service worker request " + event.request.url);
        
        
        event.respondWith(
                fetch(event.request).then(function(response){
                    
                    response.json().then(function(data){
                            console.log('Service worker response\n', data.stringify()); 
                   })
                    
                    
                    return response;  
                })
            );
      }
});