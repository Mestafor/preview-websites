import { useContext, useMemo } from 'react';

import { Preview } from '../Preview';
import { PreviewContext } from '../../Context/PreviewContext/PreviewContext';

import './_index.scss';

export const PreviewList = () => {
    const { urls, previews } = useContext(PreviewContext);

    const list = useMemo<JSX.Element[]>(() => {
        return urls.map(url => <div key={url} className="previewList__item"><Preview preview={previews[url]} /></div>)
    }, [urls, previews]);

    return (
        <div className="previewList">
            {list}
        </div>);
};

