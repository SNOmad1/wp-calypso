import { Gridicon } from '@automattic/components';
import styled from '@emotion/styled';
import { useTranslate } from 'i18n-calypso';
import { Key } from 'react';

const StyledUl = styled.ul`
	display: flex;
	align-items: center;
	list-style-type: none;
	margin: 0;
`;

const StyledLi = styled.li`
	display: flex;
	align-items: center;
	font-size: 13px;
	font-weight: 500;
	--color-link: var( --studio-gray-100 );

	:first-of-type {
		font-size: 16px;
		font-weight: 600;
		--color-link: var( --studio-gray-80 );
	}

	:last-child {
		--color-link: var( --studio-gray-50 );
	}
`;

const StyledGridicon = styled( Gridicon )`
	margin: 0 7px;
	fill: var( --studio-gray-50 );
`;

interface Props {
	items: { label: string; href?: string }[];
	compact?: boolean;
}

const Breadcrumb: React.FunctionComponent< Props > = ( { items, compact = false } ) => {
	const translate = useTranslate();
	const back = translate( 'Back' ) as string;
	if ( compact && items.length > 1 ) {
		// Show only the exactly previous page
		items = items.slice( -2, -1 );
		items[ 0 ].label = back;
	}
	return (
		<StyledUl>
			{ items.map( ( item: { href?: string; label: string }, index: Key ) => {
				return (
					<StyledLi key={ index }>
						{ compact && <StyledGridicon icon="chevron-left" size={ 18 } /> }
						{ index !== 0 && <StyledGridicon icon="chevron-right" size={ 18 } /> }
						{ item.href ? <a href={ item.href }>{ item.label }</a> : <span>{ item.label }</span> }
					</StyledLi>
				);
			} ) }
		</StyledUl>
	);
};

Breadcrumb.defaultProps = {
	items: [],
};

export default Breadcrumb;
