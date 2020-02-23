# angularjs-to-svelte

AngularJS wrapper for svelte components. This is an angularjs directive; put it in your directives folder.

To use this in any angularjs template, just invoke like so:
```
    <angular-to-svelte
      dynamic-attrs='[
        "attr1",
        "attr2"
        ]'
      svelte-component='FancySvelteComponent'>
    </angular-to-svelte>
```
**How to use**

  -  Copy the angular_to_svelte.js file to your app's directives folder
  -  import and save your svelte component to the angularjs parent scope
    `$scope.FancySvelteComponent = FancySvelteComponent;`
  -  pass in any angularjs scope attr names that you wish to be dynamically bound (see attr1 and attr2 above)
    as the property "dynamicAttrs"
    - when these attrs change in angularjs, svelte will pick up the changes.
  -  Those dynamic attrs will be available in svelte as exports
  -  All other properties on your wrapping angularjs scope will be available to use in your svelte component as exports
  -  Use in your svelte component by "exporting" both dynamic and static properties:
```
    export let attr1;
    export let attr2;
    export let someOtherAttr;
    export let someFunctionInAngularThatYouCanTotallyJustCallInSvelte
```

Hope this is helpful; certainly this is a very rough early effort and has some limitations.
