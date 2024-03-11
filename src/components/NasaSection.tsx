import * as React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const resultsListStyle = css`
    padding: 0;
    font-size: 1.1em;
    column-count: 1;

    @media (max-width: 1200px) {
        column-count: 2 !important;
    }
    @media (max-width: 1530px) {
        column-count: 3 !important;
    }
    @media (max-width: 1700px) {
        column-count: 4;
    }
    @media (min-width: 1701px) {
        column-count: 5;
    }
`;

const resultItemStyle = css`
    width: 100%;
    break-inside: avoid;
    margin-bottom: 20px;
    max-width: 100px;

    @media (max-width: 1200px) {
        max-width: 200px;
    }
    @media (max-width: 1530px) {
        max-width: 300px;
    }
    @media (max-width: 1700px) {
        max-width: 300px;
    }
    @media (min-width: 1701px) {
        max-width: 300px;
    }
`;


function NasaSection({results, resultObjects}) {
    const [videoUrls, setVideoUrls] = React.useState({});
    const [sortedResults, setSortedResults] = React.useState(results)
    
    React.useEffect(() => {
        const fetchVideoUrls = async () => {
            const urls = {};
            for (const item of results) {
                if (item.data[0].media_type === 'video') {
                    const data = await fetch(item.href);
                    const videoUrl = await data.json();
                    if (videoUrl) {
                        urls[item.data[0].nasa_id] = videoUrl.find(videoUrl => videoUrl.includes('~orig.mp4'));
                    }
                }
                if (item.data[0].media_type === 'audio') {
                    const data = await fetch(item.href);
                    const audioUrl = await data.json();
                    if (audioUrl) {
                        urls[item.data[0].nasa_id] = audioUrl.find(audioUrl => audioUrl.includes('~orig.mp3'));
                    }
                }
            }
            setVideoUrls(urls);
        };

        fetchVideoUrls();
    }, [results]);

    React.useEffect(() => {
        const askedObjects = []
        if (resultObjects.images) {askedObjects.push('image')}
        if (resultObjects.videos) {askedObjects.push('video')}
        if (resultObjects.audios) {askedObjects.push('audio')}
        const sorted = results.filter((item) => askedObjects.includes(item.data[0].media_type));
        setSortedResults(sorted);
    }, [resultObjects, results]);

    return(
        <ul css={resultsListStyle}>
            {sortedResults.map(item => {
                const metadata: string = item.data[0].media_type;
                const title: string = item.data[0].title;
                const preview: string = item.links?.find(link => link.rel === 'preview')?.href;
                const captions: string = item.links?.find(link => link.rel === 'captions')?.href;

                const fetchedUrl: string = videoUrls[item.data[0].nasa_id];

                return(
                    <div css={resultItemStyle} key={item.data[0].nasa_id}>
                        {title}
                        {metadata !== 'audio' ? (
                            <>
                            {metadata === 'image' && (<img css={{width: '100%'}} src={preview} alt={title}/>)}
                            {metadata === 'video' && (
                                <video controls css={{width: '100%'}} poster={preview} src={fetchedUrl} type="video/mp4">
                                    {captions && <track src={captions} kind="captions"/>}
                                </video>
                            )}
                            </>
                        ) : 
                            <audio controls css={{width: '100%'}} src={fetchedUrl} type="audio/mpeg" />
                        }
                    </div>
                );
            })}
        </ul>
    )
}

export default NasaSection
