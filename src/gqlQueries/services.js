import gql from 'graphql-tag';

export default {
	TWITCH_QUERY: gql`
			query TwitchQuery($gameName: String!) {
				Service (
					gameName: $gameName,
					date: "1522296000000",
					maxResults: 100,
					serviceName: TWITCH) {
				game {
					name
				},
				hits,
				date
			}}
		`,
};
