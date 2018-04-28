/* 
 *************************************
 * <!-- Back to Top -->
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
		// Add button to body for back to top
		if ( $( '#toTop' ).length == 0 ) {
			$( 'body' ).prepend( '<a href="#" id="toTop"><span id="toTopHover"></span></a>' );
		}
		
		
		// Sticky button of back to top 
		var waypoints = $( '#toTop' ).waypoint({
			handler: function( direction ) {
				
				$( this.element ).toggleClass( 'active', direction === 'down' );

			},
			offset: -120
		});
		
		
		$( '#toTop' ).on( 'click', function( e ) {
			e.preventDefault();
			
			TweenMax.to( window, 0.5, {
				scrollTo: {
					y: 0
				},
				ease: Power2.easeOut
			});	

		});
		
	   
		
		
    };

    theme.backtoTop = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


