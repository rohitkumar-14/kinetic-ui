"use client";

import React, { createContext, useContext } from "react";

export const PlaygroundContext = createContext<Record<string, any>>({});

export const usePlaygroundContext = () => useContext(PlaygroundContext);
