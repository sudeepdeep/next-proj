/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Store } from "pullstate";

const UIStore = new Store<any>({
  theme: "dark",
  hideContent: false,
});

export default UIStore;
