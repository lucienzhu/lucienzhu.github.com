(function () {
    'use strict';

    var root = document.querySelector('[data-updates]');
    if (!root) return;

    var entries = Array.from(root.querySelectorAll('.update-entry'));
    var years = Array.from(root.querySelectorAll('.updates-year'));
    var filters = Array.from(root.querySelectorAll('.updates-filters [data-updates-filter]'));
    var count = root.querySelector('[data-updates-count]');
    var empty = root.querySelector('[data-updates-empty]');

    function applyFilter() {
        var blogOnly = new URLSearchParams(window.location.search).get('tag') === 'blog';
        var active = blogOnly ? 'blog' : 'all';
        var shown = 0;

        entries.forEach(function (entry) {
            entry.hidden = blogOnly && entry.dataset.blog !== 'true';
            if (!entry.hidden) shown++;
        });

        years.forEach(function (year) {
            year.hidden = !year.querySelector('.update-entry:not([hidden])');
        });

        filters.forEach(function (filter) {
            if (filter.dataset.updatesFilter === active) {
                filter.setAttribute('aria-current', 'true');
            } else {
                filter.removeAttribute('aria-current');
            }
        });

        var label = blogOnly ? (shown === 1 ? root.dataset.blogOne : root.dataset.blogMany) : (shown === 1 ? root.dataset.entryOne : root.dataset.entryMany);
        count.textContent = label.replace('%count%', shown);
        empty.hidden = shown !== 0;
        window.dispatchEvent(new Event('site:filterchange'));
    }

    root.addEventListener('click', function (event) {
        var link = event.target.closest('a[data-updates-filter]');
        if (!link || !root.contains(link) || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        event.preventDefault();
        var target = new URL(link.href);
        if (target.href !== window.location.href) window.history.pushState(null, '', target.href);
        applyFilter();

        var active = root.querySelector('.updates-filters [aria-current="true"]');
        if (active) {
            active.focus({ preventScroll: true });
            active.scrollIntoView({ block: 'nearest' });
        }
    });

    window.addEventListener('popstate', applyFilter);
    applyFilter();
}());
