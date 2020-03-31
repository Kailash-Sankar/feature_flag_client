const customers = {
  101: { id: 101, name: "Alpha", products: ["ax", "cx"] },
  102: { id: 102, name: "Beta", products: ["cx"] },
  103: { id: 103, name: "Gamma", products: ["ax"] }
};

const products = {
  ax: { id: "ax", name: "Ad Insights" },
  bx: { id: "bx", name: "Experience Insights" },
  cx: { id: "cx", name: "Content Insights" },
  dx: { id: "dx", name: "Social Insights" }
};

const features = [
  {
    id: "ff_one",
    name: "Feature One",
    product: "ax",
    status: 2,
    description: "Enable feature to do something",
    attributes: []
  },
  {
    id: "ff_two",
    name: "Feature Two",
    product: "ax",
    status: 1,
    attributes: [],
    description: "Enable feature to do something"
  },
  {
    id: "ff_three",
    name: "Feature Three",
    product: "cx",
    status: 0,
    attributes: [],
    description: "Enable feature to do something"
  }
];

const packages = {
  "0": { id: 0, name: "Custom" },
  "1": { id: 1, name: "Silver" },
  "2": { id: 2, name: "Gold" },
  "3": { id: 3, name: "Diamond" }
};

const customer = "101";
const product = "ax";
const feature = "ff_one";
const pack = "0";

const noop = () => undefined;

export default {
  customers,
  products,
  features,
  packages,
  customer,
  product,
  feature,
  pack,
  noop
};
