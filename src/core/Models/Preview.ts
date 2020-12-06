export interface IPreview {
    Title?: string;
    ImageUrl?: string;
    Description?: string;
    WebSiteUrl: string;
    Loaded: boolean;
    Error?: string;
    parseHtml(html: string): void;
    onError(error: string): void;
}

/**
 * Preview model
 */
export class Preview implements IPreview {
    public Title?: string;
    public ImageUrl?: string;
    public Description?: string;
    public WebSiteUrl: string;
    public Loaded = false;
    public Error?: string;

    constructor(websiteUrl: string) {
        this.WebSiteUrl = websiteUrl;
    }

    public parseHtml(html: string) {
        // TODO: we can move this logic to the backend
        const element = document.createElement('div');
        element.innerHTML = html;

        this.Title = this._getTitle(element);
        this.ImageUrl = this._getImageUrl(element);
        this.Description = this._getDescription(element);
        this.Error = undefined;
        this.Loaded = true;

        element.innerHTML = '';
    }

    public onError(error: string) {
        this.Error = error;
        this.Loaded = true;
    }

    private _getTitle(html: HTMLElement) {
        const ogTitle = html.querySelector<HTMLMetaElement>('meta[property="og:title"]');
        if (ogTitle != null && ogTitle.content.length > 0) {
            return ogTitle.content;
        }
        const twitterTitle = html.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
        if (twitterTitle != null && twitterTitle.content.length > 0) {
            return twitterTitle.content;
        }
        const docTitle = html.title;
        if (docTitle != null && docTitle.length > 0) {
            return docTitle;
        }
        const h1 = html.querySelector<HTMLElement>("h1")?.innerHTML;
        if (h1 != null && h1.length > 0) {
            return h1;
        }
        const h2 = html.querySelector<HTMLElement>("h1")?.innerHTML;
        if (h2 != null && h2.length > 0) {
            return h2;
        }
        return undefined;
    }

    private _getImageUrl(html: HTMLElement) {
        const ogImg = html.querySelector<HTMLMetaElement>('meta[property="og:image"]');
        if (
            ogImg != null &&
            ogImg.content.length > 0
        ) {
            return ogImg.content;
        }

        const imgRelLink = html.querySelector<HTMLLinkElement>('link[rel="image_src"]');
        if (
            imgRelLink != null &&
            imgRelLink.href.length > 0
        ) {
            return imgRelLink.href;
        }

        const twitterImg = html.querySelector<HTMLMetaElement>('meta[name="twitter:image"]');
        if (
            twitterImg != null &&
            twitterImg.content.length > 0
        ) {
            return twitterImg.content;
        }

        let imgs = Array.from(html.getElementsByTagName("img"));
        if (imgs.length > 0) {
            let src = imgs[0].getAttribute('src') || undefined;
            src = src?.indexOf("//") === -1
                    ? (src = `${this.WebSiteUrl}/${src}`)
                    : src;
            return src;
        }
        return undefined;
    }

    private _getDescription(html: HTMLElement) {
        const ogDescription = html.querySelector<HTMLMetaElement>(
            'meta[property="og:description"]'
        );
        if (ogDescription != null && ogDescription.content.length > 0) {
            return ogDescription.content;
        }
        const twitterDescription = html.querySelector<HTMLMetaElement>(
            'meta[name="twitter:description"]'
        );
        if (twitterDescription != null && twitterDescription.content.length > 0) {
            return twitterDescription.content;
        }
        const metaDescription = html.querySelector<HTMLMetaElement>('meta[name="description"]');
        if (metaDescription != null && metaDescription.content.length > 0) {
            return metaDescription.content;
        }
        const paragraphs = html.querySelectorAll<HTMLElement>("p");
        let fstVisibleParagraph = undefined;
        for (let i = 0; i < paragraphs.length; i++) {
            if (
                // if object is visible in dom
                paragraphs[i].offsetParent !== null
            ) {
                fstVisibleParagraph = paragraphs[i].textContent || undefined;
                break;
            }
        }
        return fstVisibleParagraph;
    }
}