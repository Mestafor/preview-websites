import { FC, useCallback, useReducer } from 'react';

import { PreviewContext, IPreviewState, initialPreviewContextState } from './PreviewContext';
import { IPreview, Preview } from '../../Models/Preview';
import { HttpService } from '../../Services/HttpService';
import { normilizeUrl } from '../../Helpers/normilizeUrl';

type TPreviewActions = { type: 'ADD'; payload: IPreview } | { type: 'UPDATE'; payload: IPreview } | { type: 'SET_URLS'; payload: string[] };

const previewReducer = (state: IPreviewState, action: TPreviewActions) => {
    switch (action.type) {
        case 'ADD':
        case 'UPDATE': {
            state.previews = {
                ...state.previews,
                [action.payload.WebSiteUrl]: action.payload
            };
            return {...state};
        }

        case 'SET_URLS': {
            state.urls = action.payload;
            return {...state};
        }
    }

    return state;
};

export const PreviewProvider: FC = (props) => {
    const [state, dispatch] = useReducer(previewReducer, initialPreviewContextState);

    const loadWebsites = useCallback(
        (websiteUrls: string[]) => {

            // Normilize Urls
            const normilizedUrls: string[] = websiteUrls.map(normilizeUrl);

            if(websiteUrls.join(',') === state.urls.join(',')) {
                return;
            }

            // Prepare state for all websites
            normilizedUrls.forEach(url => {

                if(!state.previews[url]) {

                    const preview = new Preview(url);
                    dispatch({
                        type: 'ADD',
                        payload: preview
                    });

                    // Load website html
                    HttpService.postPreviewAsync<string>(url)
                    .then(res => {
                        preview.parseHtml(res);
                    })
                    .catch(err => {
                        console.log(err);
                        preview.onError(err);
                    })
                    .finally(() => {
                        dispatch({
                            type: 'UPDATE',
                            payload: preview
                        });
                    });
                };
            });

            // Write array of the current websites
            dispatch({
                type: 'SET_URLS',
                payload: normilizedUrls,
            });
        },
        [state],
    );

    return (
        <PreviewContext.Provider
            value={{
                ...state,
                loadWebsites
            }}
        >
            {props.children}
        </PreviewContext.Provider>
    );
};
