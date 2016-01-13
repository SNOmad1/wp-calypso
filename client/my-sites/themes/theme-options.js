/**
 * External dependencies
 */
import titleCase from 'to-title-case';
import assign from 'lodash/object/assign';
import mapValues from 'lodash/object/mapValues';
import pick from 'lodash/object/pick';

/**
 * Internal dependencies
 */
import i18n from 'lib/mixins/i18n';
import Helper from 'lib/themes/helpers';

export default function getButtonOptions( site, theme, isLoggedOut, actions, setSelectedTheme, togglePreview ) {
	return mapValues(
		mapValues(
			pick(
				rawOptions( site, theme, isLoggedOut ),
				option => ! option.isHidden
			), appendUrl
		), appendAction
	);

	function appendUrl( option, name ) {
		const { hasUrl } = option;

		if ( ! hasUrl ) {
			return option;
		}

		const methodName = `get${ titleCase( name ) }Url`;
		const getUrl = Helper[ methodName ];

		return assign( {}, option, {
			url: getUrl( theme, site )
		} );
	}

	function appendAction( option, name ) {
		const { hasAction } = option;

		if ( ! hasAction ) {
			return option;
		}

		let action;
		if ( name === 'preview' ) {
			action = togglePreview.bind( null, theme );
		} else if ( site ) {
			if ( name === 'customize' ) {
				action = actions.customize.bind( actions, theme, site, 'showcase' );
			} else {
				action = actions[ name ].bind( actions, theme, site, 'showcase' );
			}
		} else {
			action = setSelectedTheme.bind( null, name, theme );
		}

		return assign( {}, option, {
			action: trackedAction( action, name )
		} );
	}

	function trackedAction( action, name ) {
		return () => {
			action();
			Helper.trackClick( 'more button', name );
		};
	}
};

function rawOptions( site, theme, isLoggedOut ) {
	return {
		signup: {
			label: i18n.translate( 'Choose this design', {
				comment: 'when signing up for a WordPress.com account with a selected theme'
			} ),
			hasUrl: true,
			isHidden: ! isLoggedOut
		},
		preview: {
			label: i18n.translate( 'Preview', {
				context: 'verb'
			} ),
			header: i18n.translate( 'Preview on:', {
				context: 'verb',
				comment: 'label for selecting a site on which to preview a theme'
			} ),
			hasAction: true,
			hasUrl: false,
			isHidden: theme.active
		},
		purchase: {
			label: i18n.translate( 'Purchase', {
				context: 'verb'
			} ),
			header: i18n.translate( 'Purchase on:', {
				context: 'verb',
				comment: 'label for selecting a site for which to purchase a theme'
			} ),
			hasAction: true,
			isHidden: isLoggedOut || theme.active || theme.purchased || ! theme.price
		},
		activate: {
			label: i18n.translate( 'Activate' ),
			header: i18n.translate( 'Activate on:', { comment: 'label for selecting a site on which to activate a theme' } ),
			hasAction: true,
			isHidden: isLoggedOut || theme.active || ( theme.price && ! theme.purchased )
		},
		customize: {
			label: i18n.translate( 'Customize' ),
			header: i18n.translate( 'Customize on:', { comment: 'label for selecting a site for which to customize a theme' } ),
			hasAction: true,
			isHidden: ! theme.active || ( site && ! site.isCustomizable() )
		},
		separator: {
			separator: true
		},
		details: {
			label: i18n.translate( 'Details' ),
			hasUrl: true
		},
		support: {
			label: i18n.translate( 'Support' ),
			hasUrl: true,
			isHidden: site && site.jetpack // We don't know where support docs for a given theme on a self-hosted WP install are.
		},
	};
}
