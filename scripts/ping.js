import { check } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";

let pingApiResponseTrend = new Trend("Ping_ResponseTime");

export default function() {
  let res = http.get("https://apiService/health");
  check(res, {
    "is status 200": (r) => r.status === 200
  });
  pingApiResponseTrend.add(res.timings.duration);
}
