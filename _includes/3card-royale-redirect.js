// Keep old playtest links working without reusing the renamed GitHub repository.
(function (location) {
  var match = location.pathname.match(/^\/gk-royale(?:-playtest)?(?:\/(.*))?$/);
  if (!match) return;
  var path = (match[1] || '').replace(/^navy(?:\/|$)/, '');
  var target = new URL('https://lucienzhu.github.io/3card-royale/');
  target.pathname += path;
  target.search = location.search;
  target.hash = location.hash;
  location.replace(target.href);
})(window.location);
