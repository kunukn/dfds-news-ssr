import Router from "next/router";
import RouterEvents from "~/lib/router-events";

RouterEvents.on("routeChangeStart", url => {});
RouterEvents.on("routeChangeComplete", url => {});
RouterEvents.on("routeChangeError", url => {});
RouterEvents.on("hashChangeStart", url => {});
RouterEvents.on("hashChangeComplete", url => {});
