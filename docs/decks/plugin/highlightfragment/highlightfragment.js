
// Custom reveal.js integration
(function(){
    if( typeof window.addEventListener === 'function' ) {
        var hljs_nodes = document.querySelectorAll( 'pre code' );

        for( var i = 0, len = hljs_nodes.length; i < len; i++ ) {
            var element = hljs_nodes[i];

            // Now escape html unless prevented by author
            if( element.hasAttribute( 'data-fragment' )) {
                var regexp = /&lt;mark class="fragment/g;

                while ((match = regexp.exec(element.innerHTML)) != null) {
                    var replace = '<span' + element.innerHTML.substring(match.index+8, match.index + element.innerHTML.substring(match.index).indexOf('&gt;')) + '>';
                    replace = replace + element.innerHTML.substring(match.index + element.innerHTML.substring(match.index).indexOf('&gt;')+4, match.index + element.innerHTML.substring(match.index).indexOf('&lt;/mark&gt;')) + '</span>';
                    var search = element.innerHTML.substring(match.index, match.index + element.innerHTML.substring(match.index).indexOf('&lt;/mark&gt;')+13);

                    element.innerHTML = element.innerHTML.replace(search, replace);
                }
            }

            // Now escape html unless prevented by author
            if( element.hasAttribute( 'data-inline' )) {
                var regexp = /&lt;mark class="inline/g;

                while ((match = regexp.exec(element.innerHTML)) != null) {
                    var replace = '<span' + element.innerHTML.substring(match.index+8, match.index + element.innerHTML.substring(match.index).indexOf('&gt;')) + '>';
                    replace = replace + element.innerHTML.substring(match.index + element.innerHTML.substring(match.index).indexOf('&gt;')+4, match.index + element.innerHTML.substring(match.index).indexOf('&lt;/mark&gt;')) + '</span>';
                    var search = element.innerHTML.substring(match.index, match.index + element.innerHTML.substring(match.index).indexOf('&lt;/mark&gt;')+13);

                    element.innerHTML = element.innerHTML.replace(search, replace);
                }
            }
        }
    }
})();
