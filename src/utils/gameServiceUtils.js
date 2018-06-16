import constants from '../constants';

const ServiceUtils = {};

ServiceUtils.getGameLinkForService = (gameName, serviceName) => {
	switch (serviceName) {
	case constants.SERVICE_NAMES.TWITCH:
		return `${constants.TWITCH_WATCH_URL}${gameName}`;
	default:
		return '';
	}
};

export default ServiceUtils;
