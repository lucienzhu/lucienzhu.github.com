(function () {
    'use strict';

    var root = document.querySelector('[data-projects]');
    if (!root) return;

    var entries = Array.from(root.querySelectorAll('.project-entry'));
    var filters = Array.from(root.querySelectorAll('.projects-filters [data-project-filter]'));
    var count = root.querySelector('[data-projects-count]');
    var empty = root.querySelector('[data-projects-empty]');
    function filterTags(filter) {
        return (filter.dataset.projectFilterTags || filter.dataset.projectFilter).split(' ');
    }

    function applyFilter() {
        var requested = new URLSearchParams(window.location.search).get('tag');
        var selected = filters.find(function (filter) {
            return filter.dataset.projectFilter === requested || filterTags(filter).indexOf(requested) !== -1;
        });
        var active = selected ? selected.dataset.projectFilter : 'all';
        var matchingTags = selected ? filterTags(selected) : [];
        var shown = 0;

        entries.forEach(function (entry) {
            var labels = entry.dataset.projectTags.split(' ');
            entry.hidden = active !== 'all' && !matchingTags.some(function (tag) {
                return labels.indexOf(tag) !== -1;
            });
            if (!entry.hidden) shown++;
        });

        filters.forEach(function (filter) {
            if (filter.dataset.projectFilter === active) {
                filter.setAttribute('aria-current', 'true');
            } else {
                filter.removeAttribute('aria-current');
            }
        });

        var label = shown === 1 ? root.dataset.projectOne : root.dataset.projectMany;
        count.textContent = label.replace('%count%', shown);
        empty.hidden = shown !== 0;
        window.dispatchEvent(new Event('site:filterchange'));
    }

    root.addEventListener('click', function (event) {
        var link = event.target.closest('a[data-project-filter]');
        if (!link || !root.contains(link) || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        event.preventDefault();
        var target = new URL(link.href);
        if (target.href !== window.location.href) window.history.pushState(null, '', target.href);
        applyFilter();

        var active = root.querySelector('.projects-filters [aria-current="true"]');
        if (active) {
            active.focus({ preventScroll: true });
            active.scrollIntoView({ block: 'nearest' });
        }
    });

    window.addEventListener('popstate', applyFilter);
    applyFilter();
}());
