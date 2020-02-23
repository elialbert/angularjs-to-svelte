/*
  Angularjs wrapper for svelte components. This is an angularjs directive; put it in your directives folder.

  use in angularjs template looks like:
    <angular-to-svelte
      dynamic-attrs='[
        "attr1",
        "attr2"
        ]'
      svelte-component='FancySvelteComponent'>
    </angular-to-svelte>

  1. import and save your svelte component to the angularjs parent scope
    `$scope.FancySvelteComponent = FancySvelteComponent;`
  2. pass in any angularjs scope attr names that you wish to be dynamically bound (see attr1 and attr2 above)
    as the property "dynamicAttrs"
  3. Those dynamic attrs will be available in svelte as exports
  4. All other properties on your wrapping angularjs scope will be available to use in your svelte component as exports

  (ie
    export let attr1;
    export let attr2;
    export let someConst;
  )

*/

var ctrl = function($scope, $timeout) {
  var setWatchers = function() {
    $scope.dynamicAttrs.forEach(function(attr) {
      $scope.$watch(attr, function(val) {
        if (attr && val !== undefined && typeof(val) !== 'function') {
          let d = {}; d[attr] = val
          $scope.obj.$set(d);
        }
      })
    });
  };

  $timeout(function() {
    if (!$scope.svelteComponent) { return; }
    $scope.obj = new $scope[$scope.svelteComponent]({
      target: document.getElementById('svelte-wrapper-' + $scope.$id),
      props: _.omit($scope, 'svelteComponent')
    });
    if ($scope.dynamicAttrs) { setWatchers(); }
  });
};

ctrl.$inject = ['$scope', '$timeout'];

tiz.controller('angularToSvelteCtrl', ctrl);
tiz.directive('angularToSvelte', function() {
  return {
    restrict: 'E',
    controller: 'angularToSvelteCtrl',
    scope: true,
    link: function(scope, elem, attrs) {
      scope.svelteComponent = attrs.svelteComponent
      if (attrs.dynamicAttrs) {
        scope.dynamicAttrs = JSON.parse(attrs.dynamicAttrs)
      }
    },
    template: '<span id="svelte-wrapper-{{$id}}"></span>'
  };
});
