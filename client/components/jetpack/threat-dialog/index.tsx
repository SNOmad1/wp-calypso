import { Button, Gridicon } from '@automattic/components';
import classnames from 'classnames';
import { translate } from 'i18n-calypso';
import * as React from 'react';
import ServerCredentialsWizardDialog from 'calypso/components/jetpack/server-credentials-wizard-dialog';
import ThreatItemHeader from 'calypso/components/jetpack/threat-item-header';
import { Threat } from 'calypso/components/jetpack/threat-item/types';
import { getThreatFix } from 'calypso/components/jetpack/threat-item/utils';

import './style.scss';

interface Props {
	threat: Threat;
	action: 'fix' | 'ignore';
	siteName: string;
	showDialog: boolean;
	onCloseDialog: ( action?: string | React.MouseEvent ) => void;
	onConfirmation: React.MouseEventHandler;
}

const ThreatDialog: React.FC< Props > = ( {
	action,
	onCloseDialog,
	onConfirmation,
	siteName,
	showDialog,
	threat,
} ) => {
	const buttons = React.useMemo(
		() => [
			<Button className="threat-dialog__btn" onClick={ onCloseDialog }>
				{ translate( 'Go back' ) }
			</Button>,
			<Button
				primary
				scary={ action !== 'fix' }
				className="threat-dialog__btn"
				onClick={ onConfirmation }
			>
				{ action === 'fix' ? translate( 'Fix threat' ) : translate( 'Ignore threat' ) }
			</Button>,
		],
		[ action, onCloseDialog, onConfirmation ]
	);

	const titleProps = React.useMemo(
		() => ( {
			title:
				action === 'fix'
					? translate( 'Fix threat' )
					: translate( 'Do you really want to ignore this threat?' ),
			titleClassName: `threat-dialog__header--${ action }-threat`,
		} ),
		[ action ]
	);

	return (
		<ServerCredentialsWizardDialog
			showDialog={ showDialog }
			onCloseDialog={ onCloseDialog }
			skipServerCredentials={ action === 'ignore' }
			buttons={ buttons }
			{ ...titleProps }
			baseDialogClassName={ 'threat-dialog' }
		>
			<>
				<h3 className="threat-dialog__threat-title">{ <ThreatItemHeader threat={ threat } /> }</h3>
				<div className="threat-dialog__threat-description">{ threat.description }</div>
				<div className="threat-dialog__warning">
					<Gridicon
						className={ classnames(
							'threat-dialog__warning-icon',
							`threat-dialog__warning-icon--${ action }-threat`
						) }
						icon="info"
						size={ 36 }
					/>
					<p className="threat-dialog__warning-message">
						{ action === 'fix'
							? getThreatFix( threat.fixable )
							: translate(
									'You shouldn’t ignore a security issue unless you are absolutely sure it’s harmless. If you choose to ignore this threat, it will remain on your site "{{strong}}%s{{/strong}}".',
									{
										args: [ siteName ],
										components: {
											strong: <strong />,
										},
									}
							  ) }
					</p>
				</div>
			</>
		</ServerCredentialsWizardDialog>
	);
};

export default ThreatDialog;
