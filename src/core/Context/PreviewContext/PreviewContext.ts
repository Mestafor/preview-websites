import { createContext } from "react";
import { IPreview } from '../../Models/Preview';

export interface IPreviewState {
    previews: {[key: string]: IPreview};
    loadWebsites: (websiteUrls: string[]) => void;
    urls: string[];
}

export const initialPreviewContextState: IPreviewState = {
    previews: {},
    loadWebsites: () => {},
    urls: [],
}

export const PreviewContext = createContext<IPreviewState>(initialPreviewContextState);
