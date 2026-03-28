(function () {
  function getLang() {
    var path = window.location.pathname;
    var lang = path.split('/')[1];
    return (lang === 'ar' || lang === 'en') ? lang : 'en';
  }

  var lang = getLang();

  window._mhao = {
    r: document.body?.dataset?.page || 'default',
    base_url: window.location.origin + '/' + lang + '/',
    lang: lang
  };
})();