import { Client } from '@elastic/elasticsearch'

const client = new Client({ node: 'http://localhost:9200' });

// const search = async (query) => {
//     try {
//       const { body } = await client.search({
//         index: 'anime',
//         body: {
//           query: {
//             multi_match: {
//               query: query,
//               fields: ['title^2', 'synopsis^1']
//             }
//           }
//         }
//       });
//       return body.hits.hits;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };