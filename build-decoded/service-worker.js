'use strict';

const precacheConfig = [
  [
    '/index.html',
    'cef06143bd734e39a03a769077b815dc',
  ],
  [
    '/static/css/main.c17080f1.css',
    '302476b8b379a677f648aa1e48918ebd',
  ],
  [
    '/static/js/main.ee7b2412.js',
    '6324b1d1d8cdf43f23be87809e68868e',
  ],
  [
    '/static/media/logo.5d5d9eef.svg',
    '5d5d9eefa31e5e13a6610d9fa7a283bb',
  ],
];

const cacheName = `sw-precache-v3-sw-precache-webpack-plugin-${self.registration
  ? self.registration.scope
  : ''}`;

const ignoreUrlParametersMatching = [ /^utm_/ ];


const addDirectoryIndex = function(urlString, t) {
  const url = new URL(urlString);
  return '/' === url.pathname.slice(-1) && (url.pathname += t), url.toString();
};

// const addDirectoryIndex = function(e, t) {
//   var n = new URL(e);
//   return '/' === n.pathname.slice(-1) && (n.pathname += t), n.toString();
// };

const cleanResponse = function(response) {
  
  if (response.redirected) {
    
    const resolution = 'body' in response
      ? Promise.resolve(response.body)
      : response.blob();
    
    return resolution.then(body =>
      new Response(
        body,
        {
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        },
      ));
    
  } else
    return Promise.resolve(response);
  
  // return response.redirected
  //   ? ('body' in response
  //       ? Promise.resolve(response.body)
  //       : response.blob()
  //   )
  //     .then(body =>
  //       new Response(
  //         body,
  //         {
  //           headers: response.headers,
  //           status: response.status,
  //           statusText: response.statusText,
  //         },
  //       ))
  //   : Promise.resolve(response);
};

const createCacheKey = function(existingUrl, key, value, r) {
  const url = new URL(existingUrl);
  if(!(r && url.pathname.match(r)))
  else {
    if(!url.search) url.search = '&';
    
    url.search += `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  }
  
  // (r && url.pathname.match(r) || (url.search +=
  //   (url.search
  //     ? '&'
  //     : '') + encodeURIComponent(key) + '=' + encodeURIComponent(value));
  return url.toString();
};

const isPathWhitelisted = function(whiteList, urlWithPath) {
  if (!whiteList.length) return true;
  
  const pathName = new URL(urlWithPath).pathname;
  
  return whiteList.some(whiteListedUrl =>
    pathName.match(whiteListedUrl),
  );
};

const stripIgnoredUrlParameters = function(urlString, keysToIgnore) {
  const url = new URL(urlString);
  url.hash = '';
  url.search =
    url.search.slice(1) // drop leading '/'
      .split('&')
      .map(searchParamStrings => searchParamStrings.split('='))
      .filter(([ key, value ]) => keysToIgnore.every(keyToIgnore => !keyToIgnore.test(key)))
      .map(searchParamPairs => searchParamPairs.join('='))
      .join('&');
  return url.toString();
};

const hashParamName = '_sw-precache';

const urlsToCacheKeys = new Map(
  precacheConfig.map(([ urlString, n ]) => {
    const url = new URL(urlString, self.location);
    const cacheKey = createCacheKey(url, hashParamName, n, /\.\w{8}\./);
    return [ url.toString(), cacheKey ];
  }));

function setOfCachedUrls(e) {
  return e.keys()
    .then(e => e.map(e => e.url))
    .then(e => new Set(e));
}

self.addEventListener(
  'install',
  function(e) {
    e.waitUntil(caches.open(cacheName)
      .then(function(e) {
        return setOfCachedUrls(e)
          .then(function(t) {
            return Promise.all(Array.from(urlsToCacheKeys.values())
              .map(function(n) {
                if (!t.has(n)) {
                  var r = new Request(
                    n,
                    { credentials: 'same-origin' },
                  );
                  return fetch(r)
                    .then(function(t) {
                      if (!t.ok) throw new Error('Request for ' + n +
                        ' returned a response with status ' + t.status);
                      return cleanResponse(t).then(function(t) {return e.put(n, t);});
                    });
                }
              }));
          });
      })
      .then(function() {return self.skipWaiting();}));
  },
);

self.addEventListener('activate', function(e) {
  var t = new Set(urlsToCacheKeys.values());
  e.waitUntil(caches.open(cacheName)
    .then(function(e) {
      return e.keys()
        .then(function(n) {
          return Promise.all(n.map(function(n) {
            if (!t.has(n.url)) return e.delete(n);
          }));
        });
    })
    .then(function() {return self.clients.claim();}));
});

self.addEventListener(
  'fetch',
  function(e) {
    if ('GET' === e.request.method) {
      let cacgeHasStrippedUrl;
      let strippedUrl = stripIgnoredUrlParameters(
        e.request.url,
        ignoreUrlParametersMatching,
      ); // MMMM
      const r = 'index.html';
      if (!(cacgeHasStrippedUrl = urlsToCacheKeys.has(strippedUrl))) {
        
        e.respondWith(
          caches
            .open(cacheName)
            .then(function(e) {
              return e
                .match(urlsToCacheKeys.get(strippedUrl))
                .then(function(e) {
                  if (e) return e;
                  throw Error('The cached response that was expected is missing.');
                });
            })
            .catch(function(t) {
              return console.warn(
                'Couldn\'t serve response for "%s" from cache: %O',
                e.request.url,
                t,
              );
            }));
        fetch(e.request);
      } else {
        strippedUrl = addDirectoryIndex(strippedUrl, r);
        cacgeHasStrippedUrl = urlsToCacheKeys.has(strippedUrl);
        
        const a = '/index.html';
        if ('navigate' === e.request.mode && isPathWhitelisted([ '^(?!\\/__).*' ], e.request.url)) {
          
          strippedUrl = new URL(a, self.location).toString();
          cacgeHasStrippedUrl = urlsToCacheKeys.has(strippedUrl);
        }
      }
      // (t = urlsToCacheKeys.has(n)) || (n = addDirectoryIndex(n, r), t = urlsToCacheKeys.has(n));
      
      
      // const a = '/index.html';
      // !t && 'navigate' === e.request.mode && isPathWhitelisted([ '^(?!\\/__).*' ],
      // e.request.url) && (n = new URL(a, self.location).toString(), t = urlsToCacheKeys.has(n)),
      // t && e.respondWith(caches.open(cacheName) .then(function(e) { return
      // e.match(urlsToCacheKeys.get(n)).then(function(e) { if (e) return e; throw Error('The
      // cached response that was expected is missing.'); }); }) .catch(function(t) { return
      // console.warn( 'Couldn\'t serve response for "%s" from cache: %O', e.request.url, t, ),
      // fetch(e.request); }));
    }
  },
);