
import axios from "axios";

export const serverUrl = "http://localhost:3000/api";

// TODO: add try catch

async function search({customer, product, feature}) {
    const params = {
        customer: customer || "all",
        product: product || "all",
        feature: feature || "all"
    };
    const res = await axios.post(`${serverUrl}/search/`, params);
    return res.data.data || [];
}

async function fetchFeatures(product) {
    const res = await axios.get(`${serverUrl}/meta/features/${product}`);
    const data = res.data.data || [];
    // for all scenario
    data.push({ name: "All", id: "all" });
    return data;
}

async function saveFeature(formData) {
    const res = await axios.post(`${serverUrl}/ff`, formData);
    return res;
}

async function auditSearch({customer, product, feature}) {
    const params = {
        customer: customer || "all",
        product: product || "all",
        feature: feature || "all"
    };
    const res = await axios.post(`${serverUrl}/audit/`, params);
    return res.data.data || [];
}

export default { search, fetchFeatures, saveFeature, auditSearch };

