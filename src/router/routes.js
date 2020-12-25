import React from "react";
import { SwitchWith404 } from "./SwitchWith404";
import { LazyRoute } from "./lazyRoute";
import { Redirect } from "react-router";

const getHomePage = () => import('../pages/HomePage');
const getGalleryPage = () => import('../pages/GalleryPage');

export const AppRoutes = () => (
  <SwitchWith404>
    <Redirect path="/" to="/groups" exact={true} />
    <LazyRoute path="/groups" exact={true} getComponent={getHomePage} />
    <LazyRoute path="/gallery/:id" exact={true} getComponent={getGalleryPage} />
    
  </SwitchWith404>
);