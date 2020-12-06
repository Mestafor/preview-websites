import { useCallback, ChangeEvent, useContext } from 'react';

import { getValidUrlsFromString } from '../../Helpers/getValidUrlsFromSting';
import { PreviewContext } from '../../Context/PreviewContext/PreviewContext';

import './_index.scss';

let timeout: any;

export const SearchPreview = () => {
    const { loadWebsites } = useContext(PreviewContext);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(timeout) clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            loadWebsites(getValidUrlsFromString(value));
        }, 500);
    }, [loadWebsites]);

    return <div className="search-preview">
        <input className="search-preview__input" type="text" onChange={onChange} autoFocus placeholder="Check out www.airbnb.com. It's awesome!" />
    </div>;
}
