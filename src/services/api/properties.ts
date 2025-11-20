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
          index
          name
          description
          location
          bedrooms
          bathrooms
          area
          price
          googleMapsLink
          type {
            items {
              _system_ {
                name
              }
            }
          }
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
  const properties = data.property_All.items;

  const fProperties = properties
    .map((prp) => {
      const id = prp._system_.id;
      const type = prp.type.items[0]?._system_.name || "";
      prp.id = id;
      prp.type = type;
      return prp;
    })
    .filter((prp) => prp.type.toLowerCase() != "facilities")
    .sort((a, b) => a.index - b.index);

  return fProperties;
};


export const getFacilities = async () => {
  const query = gql`
    query GetProperties {
      property_All(limit: 200) {
        items {
          _system_ {
            id
          }
          index
          name
          location
          bedrooms
          bathrooms
          area
          price
          type {
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
  const properties = data.property_All.items;

  const fProperties = properties
    .map((prp) => {
      const id = prp._system_.id;
      const type = prp.type.items[0]?._system_.name || "";
      prp.id = id;
      prp.type = type;
      return prp;
    })
    .filter((prp) => prp.type.toLowerCase() === "facilities")
    .sort((a, b) => a.index - b.index);

  return fProperties;
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
