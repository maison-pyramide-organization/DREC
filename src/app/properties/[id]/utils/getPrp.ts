import prps from "@/data/prps";

const getPrp = (id: any) => {
  if (typeof id == "number") id = id.toString();
  const prp = prps.filter((prp) => id == prp.id);
  return prp[0];
};

export default getPrp;
