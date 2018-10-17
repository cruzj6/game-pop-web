import gql from 'graphql-tag';

const serviceQueries = {
	SERVICE_QUERY: gql`
			query ServiceQuery($gameName: String!, $serviceName: ServiceType!, $fromDate: String!, $maxResults: Int = 100) {
				Service (
					gameName: $gameName,
					date: $fromDate,
					maxResults: $maxResults,
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
			query PopularQuery($serviceName: ServiceType!) {
				Popular (
					serviceName: $serviceName,
				) {
					game {
						name
					},
					hits,

				}
			}
	`,
};

export default serviceQueries;
