import React from "react";
import axios from "axios";

export const serverUrl = "http://localhost:3000/api";

export function Spacer({ width = 10 }) {
  return <div style={{ width: width, display: "inline-block" }}></div>;
}

export const formatDate = dateString => new Date(dateString).toLocaleString();

export async function getCustomerFeatures(id) {
  const res = await axios.get(`${serverUrl}/customer/${id}/all`);
  return res;
}
