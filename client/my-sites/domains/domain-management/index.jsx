import AllDomains from 'calypso/my-sites/domains/domain-management/list/all-domains';
import SiteDomains from 'calypso/my-sites/domains/domain-management/list/site-domains';
import ChangeSiteAddress from './change-site-address';
import ContactsPrivacy from './contacts-privacy';
import Dns from './dns';
import AddDnsRecord from './dns/add-dns-record';
import DnsRecords from './dns/dns-records';
import DnsRecordsList from './dns/dns-records-list';
import DomainConnectMapping from './domain-connect-mapping';
import Edit from './edit';
import EditContactInfo from './edit-contact-info';
import EditContactInfoPage from './edit-contact-info-page';
import SiteRedirect from './edit/site-redirect';
import TransferIn from './edit/transfer-in';
import List from './list';
import ListAll from './list/list-all';
import ManageConsent from './manage-consent';
import NameServers from './name-servers';
import Security from './security';
import Settings from './settings';
import SiteRedirectSettings from './site-redirect';
import Transfer from './transfer';
import TransferOut from './transfer/transfer-out';
import TransferPage from './transfer/transfer-page';
import TransferToOtherSite from './transfer/transfer-to-other-site';
import TransferDomainToOtherSite from './transfer/transfer-to-other-site/transfer-domain-to-other-site';
import TransferToOtherUser from './transfer/transfer-to-other-user';
import TransferDomainToOtherUser from './transfer/transfer-to-other-user/transfer-domain-to-other-user';

export default {
	AddDnsRecord,
	ChangeSiteAddress,
	ContactsPrivacy,
	Dns,
	DnsRecords,
	DnsRecordsList,
	DomainConnectMapping,
	Edit,
	EditContactInfo,
	EditContactInfoPage,
	ManageConsent,
	List,
	ListAll,
	AllDomains,
	SiteDomains,
	NameServers,
	Security,
	Settings,
	SiteRedirect,
	SiteRedirectSettings,
	TransferIn,
	TransferOut,
	TransferPage,
	TransferToOtherSite,
	TransferDomainToOtherSite,
	TransferToOtherUser,
	TransferDomainToOtherUser,
	Transfer,
};
