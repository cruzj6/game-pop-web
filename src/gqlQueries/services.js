import gql from 'graphql-tag';

export default {
	SERVICE_QUERY: gql`
			query ServiceQuery($gameName: String!, $serviceName: ServiceType!) {
				Service (
					gameName: $gameName,
					date: "1522296000000",
					maxResults: 100,
					serviceName: $serviceName
				) {
					game {
						name
					},
					hits,
					date
				}}
			`,
	POPULAR_QUERY: gql`
			query PopularQuery($startDate: String!, $endDate: String!, $serviceName: String!) {
				Popular (
					startDate: $startDate,
					endDate: $endDate,
					serviceName: $serviceName
				)
			}
	`,
};
