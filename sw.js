self.addEventListener('install', event => {
    console.log("Service worker install");
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    console.log("Service worker activate");
});

self.addEventListener('fetch', event => {
    if (event.request.url.includes("test.ok.ru")) {
        console.log("Service worker request " + event.request.url);
        
        
        event.respondWith(
                fetch(event.request).then(function(response){
                    
                    return response.text().then(function(body){
                            console.log('Service worker response\n', body); 
                            console.log('Service worker response status ', response.status); 
                            return new Response("alet(1)", {status: response.status, statusText: response.statusText});  
                            
                    })
                    
                    
                })
            );
      }
});