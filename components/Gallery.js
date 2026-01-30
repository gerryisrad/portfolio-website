'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Gallery.module.css';

export default function Gallery({ images = [] }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const closeModal = () => setSelectedIndex(null);

    const showNext = useCallback((e) => {
        if (e) e.stopPropagation();
        setSelectedIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const showPrev = useCallback((e) => {
        if (e) e.stopPropagation();
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, showNext, showPrev]);

    if (!images || images.length === 0) return null;

    return (
        <div className={styles.gallery}>
            <div className={styles.grid}>
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={styles.thumbnailWrapper}
                        onClick={() => setSelectedIndex(index)}
                    >
                        <img src={src} alt={`Gallery ${index}`} className={styles.thumbnail} />
                    </div>
                ))}
            </div>

            {selectedIndex !== null && (
                <div className={styles.lightbox} onClick={closeModal}>
                    <button className={styles.closeBtn} onClick={closeModal}>×</button>

                    <button className={styles.navBtn} onClick={showPrev} data-dir="prev">
                        ‹
                    </button>

                    <img
                        src={images[selectedIndex]}
                        alt="Full size"
                        className={styles.lightboxImage}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                    />

                    <button className={styles.navBtn} onClick={showNext} data-dir="next">
                        ›
                    </button>

                    <div className={styles.counter}>
                        {selectedIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </div>
    );
}
