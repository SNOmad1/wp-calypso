import { isEnabled } from '@automattic/calypso-config';
import page from 'page';
import { createElement } from 'react';
import { makeLayout } from 'calypso/controller';
import { getSiteFragment } from 'calypso/lib/route';
import { siteSelection, navigation, sites } from 'calypso/my-sites/controller';
import {
	getSelectedSiteWithFallback,
	getSiteOption,
	getSiteWooCommerceUrl,
} from 'calypso/state/sites/selectors';
import main from './main';

import './style.scss';

export default function ( router ) {
	router( '/woocommerce-installation', siteSelection, sites, makeLayout );
	router( '/woocommerce-installation/:site', siteSelection, navigation, setup, makeLayout );
}

function setup( context, next ) {
	// Invalid site fragement, redirect to site selector
	if ( ! getSiteFragment( context.path ) ) {
		return page.redirect( '/woocommerce-installation' );
	}

	const state = context.store.getState();
	const site = getSelectedSiteWithFallback( state );
	const siteId = site ? site.ID : null;

	// Redirect unless the woop feature flag is enabled.
	// todo: remove redirect and rely on plan eligibility checks in the landing page component
	if ( ! isEnabled( 'woop' ) ) {
		return page.redirect( `/home/${ site.slug }` );
	}

	// WooCommerce plugin is already installed, redirect to Woo.
	// todo: replace with a plugin check that replaces the cta with a link to wc-admin
	// instead of passive redirect.
	if ( getSiteOption( state, siteId, 'is_wpcom_store' ) ) {
		const redirectUrl = getSiteWooCommerceUrl( state, siteId );
		window.location.href = redirectUrl;
		return;
	}

	context.primary = createElement( main );
	next();
}
