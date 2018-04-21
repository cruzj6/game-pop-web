import gql from 'graphql-tag';

const serviceQueries = {
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
