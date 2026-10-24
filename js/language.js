(function () {
    'use strict';

    function updateLanguageLinks() {
        document.querySelectorAll('[data-language-link]').forEach(function (link) {
            var target = new URL(link.href);
            target.search = window.location.search;
            target.hash = window.location.hash;
            link.href = target.href;
        });
    }

    window.addEventListener('popstate', updateLanguageLinks);
    window.addEventListener('hashchange', updateLanguageLinks);
    window.addEventListener('site:filterchange', updateLanguageLinks);
    updateLanguageLinks();
}());
