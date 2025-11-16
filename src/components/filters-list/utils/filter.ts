export const filterPrps = (filters, prps) => {
  let result = [...prps];

  // AREA
  if (filters.area) {
    result = result.filter(
      (prp) => prp.location.toLowerCase() === filters.area.toLowerCase()
    );
  }

  // PROPERTY TYPE
  if (filters.type) {
    result = result.filter(
      (prp) => prp.type.toLowerCase() === filters.type.toLowerCase()
    );
  }

  // BEDROOMS
  if (filters.bedrooms != null) {
    result = result.filter((prp) => prp.bedrooms === filters.bedrooms);
  }

  // PRICE RANGE
  const min = filters.min_price ?? 0;
  let max = filters.max_price ?? Infinity;

  result = result.filter((prp) => {
    if (!prp.price) return true;
    return prp.price >= min && prp.price <= max;
  });

  return result;
};

export const updateFilters = (oldFilters, filterName, filterValue) => {
  let newFilters = { ...oldFilters } as any;

  switch (filterName) {
    case "area":
      newFilters.area = filterValue;
      break;

    case "type":
      newFilters.type = filterValue;
      break;

    case "bedrooms":
      newFilters.bedrooms = Number(filterValue!);
      break;

    case "min-price":
      newFilters.min_price = Number(filterValue || 0);
      break;

    case "max-price":
      newFilters.max_price = Number(filterValue || Infinity);
      break;

    default:
      break;
  }

  return newFilters;
};
