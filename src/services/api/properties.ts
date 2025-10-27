import { gql } from "graphql-request";
import kontentClient from "../kontent";

const getProperties = async () => {
  const q = gql`
    query GetProperties {
      property_All(where: { AND: [{ price: { gte: 90000 } }] }) {
        items {
          _system_ {
            id
          }
          name
          description
          location
          bedrooms
          bathrooms
          area
          price
          gallery {
            items {
              description
              url
            }
          }
        }
      }
    }
  `;

  const query = gql`
    query GetProperties {
      property_All(limit: 200) {
        items {
          _system_ {
            id
          }
          name
          description
          location
          bedrooms
          bathrooms
          area
          price
          googleMapsLink
          amenities {
            items {
              _system_ {
                name
              }
            }
          }
          gallery {
            items {
              description
              url
            }
          }
        }
      }
    }
  `;
  const data = await kontentClient.request(query);
  return data.property_All.items;
};

export const getPropertyById = async (id) => {
  const query = gql`
    query GetProperty($id: Guid!) {
      property(id: $id) {
        _system_ {
          id
        }
        name
        description
        location
        bedrooms
        bathrooms
        area
        price
        googleMapsLink
        amenities {
          items {
            _system_ {
              name
            }
          }
        }
        gallery {
          items {
            description
            url
          }
        }
      }
    }
  `;

  const data = await kontentClient.request(query, { id });
  return data.property;
};

export default getProperties;
