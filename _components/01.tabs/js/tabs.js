
/* 
 *************************************
 * <!-- Tabs -->
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
		$( '.custom-tabs' ).each( function( id ) {
			var $this             = $( this ),
			    $li               = $this.find( 'ul > li' ),
				liNum             = $li.length,
				$contentbox       = $this.find( '.content' ),
				ulWidth           = $this.data( 'width' ),
				fullwidth         = $this.data( 'fullwidth' ),
				rotation          = $this.data( 'rotation' ),
				rotationRadius    = $this.data( 'rotation-radius' ),
				rotationWapperDeg = $this.data( 'rotation-wrapper-angle' ),
				
				tabBoxID          = id,
				isNumeric         = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
			
			if( typeof fullwidth != typeof undefined && fullwidth == 1 ) {
				$li.css( 'width', ( 100 / liNum ) + '%' );
			}
			
					
			
			if( typeof rotation === typeof undefined ) {
				rotation = false;
			}	
			
			
			if( typeof rotationWapperDeg === typeof undefined ) {
				rotationWapperDeg = 0;
			}		
			
			
			$li.each( function( index ) {
				index = index + 1;
				$( this ).attr( 'href', 'javascript:' );
				$( this ).attr( 'data-tab', tabBoxID + '-tabs-show' + index );
			});
			$( $contentbox ).each( function( index ) {
				index = index + 1;
				$( this ).attr( 'id', tabBoxID + '-tabs-show' + index );
			});
			
			
			// Tab Rotation Effect
			if ( rotation ) {
				
				var increase   = Math.PI * 2 / liNum,
					radius     = rotationRadius,
					angle      = 0;
				
				//Initialize button position
				$this.find( 'ul' ).css({
							'transform'         : 'rotate('+ parseFloat( rotationWapperDeg ) +'deg)'
						})
						.find( '> li' )
						.css({
								'transform'         : 'rotate('+ -parseFloat( rotationWapperDeg )+'deg)'
							});
				
				
				$li.each( function( index ) {
					$( this ).css( {
						'left'              : Math.cos( - Math.PI / 2 + index * increase) * radius + 'px',
						'top'               : Math.sin( - Math.PI / 2 + index * increase) * radius + 'px'
					} );
					

					
					$( this ).on( 'click', function( e ) {
						
						var n        = $(this).index(),
							endAngle = n % liNum * increase; 


						( function turn() {
							if (Math.abs(endAngle - angle) > 1 / 8) {
								var sign = endAngle > angle ? 1 : -1;
								angle = angle + sign / 8;
								setTimeout(turn, 20);
							} else {
								angle = endAngle;
							}


							$li.each( function( index ) {
								$( this ).css( {
									'left'        : Math.cos( - Math.PI / 2 + index * increase - angle) * radius + 'px',
									'top'         : Math.sin( - Math.PI / 2 + index * increase - angle) * radius + 'px'
								} );

							});	


						})();	
						
					});
					
				});	
				

				
			}
			
			
			// Tab Sliding Effext
			if ( $this.find( 'ul li:first .marker' ).length == 0 ) {
				$this.find( 'ul li:first' ).prepend( '<div class="marker"></div>' );
			}
			
			
			// Tab Fade Effect
			$this.on( 'click', 'li', function( e ) {
				
				var tabID = $( this ).attr( 'data-tab' ),
					index = parseFloat( $( this ).index() - 1 );
				
				
				$this.find( 'li' ).removeClass( 'active' );
				$this.find( '.content' ).removeClass( 'active' );
		
				$( this ).addClass( 'active' );
				$( '#' + tabID ).addClass( 'active' );
				

				//sliding marker
				var translateX = $( this ).index() * 100,
					liHeight   = $this.find( 'ul li:first' ).outerHeight(),
					translateY = $( this ).index() * liHeight;
				
				if ( $( window ).width() <= 768 ) {
					$this.find( '.marker' ).css({
						'transform'          : 'translateY( '+translateY+'px )'	
					});	
				} else {
					$this.find( '.marker' ).css({
						'transform'          : 'translateX( '+translateX+'% )'	
					});	
				}

		
				
				return false;
				
				
			});
			
			// Init
			$this.find( 'ul > li.active' ).trigger( 'click' );
			
			//Active current tab
			var url    = window.location.href,
				locArr,
			    loc, 
				curTab;
			
			if ( url.indexOf( '#' ) >= 0 ) {
				
				locArr = url.split( '#' );
			    loc    = locArr[1];
				curTab = $( '.custom-tabs' ).find( 'ul > li:eq('+loc+')' );
				curTab.trigger( 'click' );	
			}
				
			
				
			
		});
		

		
	};
		
      
    theme.customTabs = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

