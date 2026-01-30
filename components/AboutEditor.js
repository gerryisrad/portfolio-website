'use client';

import { useState } from 'react';
import { saveAbout } from '@/app/actions';
import styles from './AboutEditor.module.css';

export default function AboutEditor({ initialData }) {
    const [data, setData] = useState(initialData);
    const [status, setStatus] = useState('');

    const handleChange = (section, field, value) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleArrayChange = (section, index, field, value) => {
        const newArray = [...data[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        setData(prev => ({ ...prev, [section]: newArray }));
    };

    const addItem = (section, template) => {
        setData(prev => ({
            ...prev,
            [section]: [template, ...prev[section]]
        }));
    };

    const removeItem = (section, index) => {
        const newArray = [...data[section]];
        newArray.splice(index, 1);
        setData(prev => ({ ...prev, [section]: newArray }));
    };

    const handleSkillKeywordChange = (skillIndex, value) => {
        const keywords = value.split(',').map(k => k.trim()).filter(Boolean);
        const newSkills = [...data.skills];
        newSkills[skillIndex] = { ...newSkills[skillIndex], keywords };
        setData(prev => ({ ...prev, skills: newSkills }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Saving...');
        const result = await saveAbout(data);
        if (result.success) {
            setStatus('Saved successfully!');
            setTimeout(() => setStatus(''), 2000);
        } else {
            setStatus('Error saving.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.header}>
                <h1>Edit About Page</h1>
                <div className={styles.actions}>
                    <span className={styles.status}>{status}</span>
                    <button type="submit" className={styles.saveBtn}>Save Changes</button>
                    <a href="/about" target="_blank" className={styles.previewBtn}>View Page</a>
                </div>
            </div>

            <section className={styles.section}>
                <h2>Basics</h2>
                <div className={styles.grid}>
                    <label className={styles.label}>
                        Name
                        <input
                            className={styles.input}
                            value={data.basics.name}
                            onChange={(e) => handleChange('basics', 'name', e.target.value)}
                        />
                    </label>
                    <label className={styles.label}>
                        Label (Role)
                        <input
                            className={styles.input}
                            value={data.basics.label}
                            onChange={(e) => handleChange('basics', 'label', e.target.value)}
                        />
                    </label>
                    <label className={`${styles.label} ${styles.fullWidth}`}>
                        Bio Summary
                        <textarea
                            className={styles.textarea}
                            value={data.basics.summary}
                            onChange={(e) => handleChange('basics', 'summary', e.target.value)}
                        />
                    </label>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Experience</h2>
                    <button type="button" onClick={() => addItem('work', { name: '', position: '', startDate: '', endDate: '', summary: '' })} className={styles.addBtn}>+ Add Job</button>
                </div>
                {data.work.map((job, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>Job {index + 1}</h3>
                            <button type="button" onClick={() => removeItem('work', index)} className={styles.removeBtn}>Remove</button>
                        </div>
                        <div className={styles.grid}>
                            <label className={styles.label}>Company <input className={styles.input} value={job.name} onChange={(e) => handleArrayChange('work', index, 'name', e.target.value)} /></label>
                            <label className={styles.label}>Position <input className={styles.input} value={job.position} onChange={(e) => handleArrayChange('work', index, 'position', e.target.value)} /></label>
                            <label className={styles.label}>Start Date <input className={styles.input} type="date" value={job.startDate} onChange={(e) => handleArrayChange('work', index, 'startDate', e.target.value)} /></label>
                            <label className={styles.label}>End Date <input className={styles.input} type="date" value={job.endDate} onChange={(e) => handleArrayChange('work', index, 'endDate', e.target.value)} /></label>
                            <label className={`${styles.label} ${styles.fullWidth}`}>Summary <textarea className={styles.textarea} value={job.summary} onChange={(e) => handleArrayChange('work', index, 'summary', e.target.value)} /></label>
                        </div>
                    </div>
                ))}
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Education</h2>
                    <button type="button" onClick={() => addItem('education', { institution: '', area: '', studyType: '', startDate: '', endDate: '', score: '' })} className={styles.addBtn}>+ Add Education</button>
                </div>
                {data.education.map((edu, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>School {index + 1}</h3>
                            <button type="button" onClick={() => removeItem('education', index)} className={styles.removeBtn}>Remove</button>
                        </div>
                        <div className={styles.grid}>
                            <label className={styles.label}>Institution <input className={styles.input} value={edu.institution} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} /></label>
                            <label className={styles.label}>Area <input className={styles.input} value={edu.area} onChange={(e) => handleArrayChange('education', index, 'area', e.target.value)} /></label>
                            <label className={styles.label}>Dates <input className={styles.input} value={edu.startDate} onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)} /> to <input className={styles.input} value={edu.endDate} onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)} /></label>
                            <label className={styles.label}>Score <input className={styles.input} value={edu.score} onChange={(e) => handleArrayChange('education', index, 'score', e.target.value)} /></label>
                        </div>
                    </div>
                ))}
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Skills</h2>
                    <button type="button" onClick={() => addItem('skills', { name: '', keywords: [] })} className={styles.addBtn}>+ Add Category</button>
                </div>
                {data.skills.map((skill, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>Category {index + 1}</h3>
                            <button type="button" onClick={() => removeItem('skills', index)} className={styles.removeBtn}>Remove</button>
                        </div>
                        <div className={styles.grid}>
                            <label className={styles.label}>Category Name <input className={styles.input} value={skill.name} onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)} /></label>
                            <label className={`${styles.label} ${styles.fullWidth}`}>
                                Keywords (comma separated)
                                <input
                                    className={styles.input}
                                    value={skill.keywords.join(', ')}
                                    onChange={(e) => handleSkillKeywordChange(index, e.target.value)}
                                    placeholder="React, Node.js, etc."
                                />
                            </label>
                        </div>
                    </div>
                ))}
            </section>
        </form>
    );
}
