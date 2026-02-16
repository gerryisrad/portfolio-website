'use client';

import { useState } from 'react';
import { saveProject, uploadImage, uploadCADFile } from '@/app/actions';
import Gallery from './Gallery';
import styles from './Editor.module.css';

export default function Editor({ project, slug }) {
    const [formData, setFormData] = useState({
        title: project.title || '',
        description: project.description || '',
        date: project.date || new Date().toISOString().split('T')[0],
        tags: project.tags?.join(', ') || '',
        skills: project.skills?.join(', ') || '',
        paper: project.paper || '',
        videoId: project.videoId || '',
        content: project.content || '',
        mainImage: project.mainImage || '',
        gallery: project.gallery || [],
        cadFiles: project.cadFiles || []
    });
    const [status, setStatus] = useState('');

    const [isDragging, setIsDragging] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setStatus('Saving...');
        const data = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
            paper: formData.paper,
            mainImage: formData.mainImage,
            gallery: formData.gallery,
            cadFiles: formData.cadFiles
        };

        const result = await saveProject(slug, data);
        if (result.success) {
            setStatus('Saved successfully!');
            setTimeout(() => setStatus(''), 2000);
        } else {
            setStatus('Error saving.');
        }
    };

    const processFiles = async (files) => {
        if (!files || files.length === 0) return;

        setStatus('Uploading...');
        const uploadedPaths = [];
        let errors = 0;

        for (const file of Array.from(files)) {
            const data = new FormData();
            data.append('file', file);
            data.append('slug', slug);

            const result = await uploadImage(data);
            if (result.success) {
                uploadedPaths.push(result.path);
            } else {
                errors++;
            }
        }

        if (uploadedPaths.length > 0) {
            setFormData(prev => ({
                ...prev,
                gallery: [...prev.gallery, ...uploadedPaths]
            }));
        }

        if (errors > 0) {
            setStatus(`Uploaded ${uploadedPaths.length} images. ${errors} failed.`);
        } else {
            setStatus('All images uploaded!');
            setTimeout(() => setStatus(''), 2000);
        }
    };

    const handleFileUpload = (e) => {
        processFiles(e.target.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        processFiles(e.dataTransfer.files);
    };

    const handleCADUpload = async (files) => {
        if (!files || files.length === 0) return;

        setStatus('Uploading CAD files...');
        const uploadedFiles = [];
        let errors = 0;

        for (const file of Array.from(files)) {
            const data = new FormData();
            data.append('file', file);
            data.append('slug', slug);

            const result = await uploadCADFile(data);
            if (result.success) {
                uploadedFiles.push(result.file);
            } else {
                errors++;
                console.error('CAD upload failed:', result.error);
            }
        }

        if (uploadedFiles.length > 0) {
            setFormData(prev => ({
                ...prev,
                cadFiles: [...prev.cadFiles, ...uploadedFiles]
            }));
        }

        if (errors > 0) {
            setStatus(`Uploaded ${uploadedFiles.length} files. ${errors} failed.`);
        } else {
            setStatus('CAD files uploaded!');
            setTimeout(() => setStatus(''), 2000);
        }
    };

    const removeCADFile = (index) => {
        setFormData(prev => ({
            ...prev,
            cadFiles: prev.cadFiles.filter((_, i) => i !== index)
        }));
        setStatus('File removed. Click Save to apply changes.');
        setTimeout(() => setStatus(''), 2000);
    };

    return (
        <div className={styles.editor}>
            <header className={styles.header}>
                <h1>Editing: {slug}</h1>
                <div className={styles.actions}>
                    <span className={styles.status}>{status}</span>
                    <button onClick={handleSave} className={styles.saveBtn}>Save Changes</button>
                </div>
            </header>

            <div className={styles.grid}>
                <div className={styles.meta}>
                    <label>Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} className={styles.input} />

                    <label>Date</label>
                    <input name="date" type="date" value={formData.date} onChange={handleChange} className={styles.input} />

                    <label>Tags (comma separated)</label>
                    <input name="tags" value={formData.tags} onChange={handleChange} className={styles.input} />

                    <label>Vital Skills (comma separated)</label>
                    <input name="skills" value={formData.skills} onChange={handleChange} className={styles.input} placeholder="e.g. SolidWorks, FEA, Python" />

                    <label>Project Paper (PDF)</label>
                    <div className={styles.paperUpload}>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                setStatus('Uploading Paper...');
                                const data = new FormData();
                                data.append('file', file);
                                data.append('slug', slug);
                                const result = await uploadImage(data); // Reusing uploadImage logic
                                if (result.success) {
                                    setFormData(prev => ({ ...prev, paper: result.path }));
                                    setStatus('Paper uploaded!');
                                } else {
                                    setStatus('Upload failed.');
                                }
                            }}
                            className={styles.input}
                        />
                        {formData.paper && (
                            <p className={styles.fileLink}>
                                Current: <a href={formData.paper} target="_blank" rel="noopener noreferrer">{formData.paper.split('/').pop()}</a>
                            </p>
                        )}
                    </div>

                    <label>YouTube Video ID</label>
                    <input name="videoId" value={formData.videoId} onChange={handleChange} className={styles.input} />

                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className={styles.textareaSmall} />
                </div>

                <div className={styles.mainContent}>
                    <div className={styles.mainImageSection}>
                        <h3>Main Image</h3>
                        <div
                            className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={async (e) => {
                                e.preventDefault();
                                setIsDragging(false);
                                const file = e.dataTransfer.files[0];
                                if (!file) return;

                                setStatus('Uploading Main Image...');
                                const data = new FormData();
                                data.append('file', file);
                                data.append('slug', slug);
                                const result = await uploadImage(data);
                                if (result.success) {
                                    setFormData(prev => ({ ...prev, mainImage: result.path }));
                                    setStatus('Main Image uploaded!');
                                } else {
                                    setStatus('Upload failed.');
                                }
                            }}
                        >
                            <input
                                type="file"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    setStatus('Uploading Main Image...');
                                    const data = new FormData();
                                    data.append('file', file);
                                    data.append('slug', slug);
                                    const result = await uploadImage(data);
                                    if (result.success) {
                                        setFormData(prev => ({ ...prev, mainImage: result.path }));
                                        setStatus('Main Image uploaded!');
                                    } else {
                                        setStatus('Upload failed.');
                                    }
                                }}
                                accept="image/*"
                                className={styles.fileInput}
                            />
                            {formData.mainImage ? (
                                <div className={styles.previewWrapper}>
                                    <img src={formData.mainImage} alt="Main" className={styles.mainImagePreview} />
                                    <p>Click or Drop to Replace</p>
                                </div>
                            ) : (
                                <>
                                    <span className={styles.uploadIcon}>🖼️</span>
                                    <p className={styles.hint}>
                                        Drag & Drop Main Image<br />
                                        <span style={{ fontSize: '0.8em', opacity: 0.7 }}>or click to browse</span>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    <label>Markdown Content</label>
                    <textarea name="content" value={formData.content} onChange={handleChange} className={styles.textareaLarge} />
                </div>
            </div>

            <div className={styles.gallerySection}>
                <h3>Image Gallery</h3>
                <div
                    className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        accept="image/*"
                        multiple
                        className={styles.fileInput}
                    />
                    <span className={styles.uploadIcon}>☁️</span>
                    <p className={styles.hint}>
                        Drag & Drop images here<br />
                        <span style={{ fontSize: '0.8em', opacity: 0.7 }}>or click to browse</span>
                    </p>
                </div>
                <Gallery images={formData.gallery} />
            </div>

            <div className={styles.cadSection}>
                <h3>CAD Files & Technical Drawings</h3>
                <p className={styles.sectionHint}>Upload STEP, SolidWorks, CATIA, DWG, PDF files to showcase your CAD skills</p>
                <div
                    className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        handleCADUpload(e.dataTransfer.files);
                    }}
                >
                    <input
                        type="file"
                        onChange={(e) => handleCADUpload(e.target.files)}
                        accept=".step,.stp,.sldprt,.sldasm,.slddrw,.catpart,.catproduct,.catdrawing,.dwg,.dxf,.pdf,.iges,.igs,.stl"
                        multiple
                        className={styles.fileInput}
                    />
                    <span className={styles.uploadIcon}>📐</span>
                    <p className={styles.hint}>
                        Drag & Drop CAD files here<br />
                        <span style={{ fontSize: '0.8em', opacity: 0.7 }}>or click to browse</span>
                    </p>
                </div>

                {formData.cadFiles.length > 0 && (
                    <div className={styles.cadFileList}>
                        {formData.cadFiles.map((file, index) => (
                            <div key={index} className={styles.cadFileItem}>
                                <div className={styles.cadFileInfo}>
                                    <span className={styles.cadFileName}>📄 {file.name}</span>
                                    <span className={styles.cadFileSize}>
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeCADFile(index)}
                                    className={styles.removeBtn}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
