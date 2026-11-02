"use client";

import React, { createContext, useContext } from "react";
import { DatasetType, StylePresetType, MOCK_DATASETS, STYLE_PRESETS, DatasetDef } from "@/lib/mock-datasets";

export interface PlaygroundContextValue {
  stylePreset?: StylePresetType;
  dataset?: DatasetType;
  accentColor?: string;
  datasetData?: DatasetDef;
  [key: string]: any;
}

export const PlaygroundContext = createContext<PlaygroundContextValue>({
  stylePreset: 'glass',
  dataset: 'saas',
  accentColor: '#6366f1',
  datasetData: MOCK_DATASETS.saas,
});

export const usePlaygroundContext = () => useContext(PlaygroundContext);
