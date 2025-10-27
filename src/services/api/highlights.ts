import { gql } from "graphql-request";
import kontentClient from "../kontent";

const getHighlights = async () => {
  const query = gql`
    query GetProperties {
      highlight_All {
        items {
          title
          body
          type
          image {
            description
            url
          }
        }
      }
    }
  `;
  const data = await kontentClient.request(query);

  return data.highlight_All.items;
};

export default getHighlights;
