import { FC } from 'react';
import { IPreview } from '../../Models/Preview';

import './_index.scss';

export const Preview: FC<{ preview?: IPreview }> = ({ preview }) => {

    return <a className="preview" href={preview?.WebSiteUrl || '#'} target="_blank" rel="noreferrer">
        {preview?.Loaded ? '' : <div>
            <h2 className="preview__title">{preview?.WebSiteUrl}</h2>
            Loading... {/* // TODO: add preloader component */}
            </div>}

        {preview?.ImageUrl ? <img className="preview__img" src={preview.ImageUrl} alt={preview?.Title} /> : ''}
        <div className="preview__content">    
            {preview?.Title ? <h2 className="preview__title">{preview?.Title}</h2> : ''}
            {preview?.Description ? <p className="preview__desc">{preview?.Description}</p> : ''}

            {preview?.Error ? <div>
                <h2 className="preview__title">{preview?.WebSiteUrl}</h2>
                <div className="preview__error">{preview?.Error}</div>
            </div> : ''}
        </div>    
    </a>
}
