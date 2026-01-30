import styles from './VideoPlayer.module.css';

export default function VideoPlayer({ videoId }) {
    if (!videoId) return null;

    return (
        <div className={styles.wrapper}>
            <iframe
                className={styles.iframe}
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
