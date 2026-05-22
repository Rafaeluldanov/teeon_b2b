'use client';

import { useState, useRef, useCallback } from 'react';
import styles from './AdminImageUploader.module.css';

const FOLDERS = [
  { value: 'catalog', label: 'Каталог' },
  { value: 'branding', label: 'Брендирование' },
  { value: 'hero', label: 'Hero / Главная' },
  { value: 'portfolio', label: 'Портфолио' },
];

interface StorageFile {
  key: string;
  url: string;
  size: number;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} КБ`;
  return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
}

export default function AdminImageUploader() {
  const [folder, setFolder] = useState('catalog');
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [images, setImages] = useState<StorageFile[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const loadImages = useCallback(async (f: string) => {
    setLoadingList(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/api/admin/images?folder=${encodeURIComponent(f)}`);
      const json = await res.json() as { files: StorageFile[]; error?: string };
      if (!res.ok) throw new Error(json.error ?? 'Ошибка загрузки списка');
      setImages(json.files);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Ошибка');
    } finally {
      setLoadingList(false);
    }
  }, []);

  const changeFolder = (f: string) => {
    setFolder(f);
    setImages([]);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setErrorMsg('');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', folder);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd, credentials: 'same-origin' });
      const json = await res.json() as { success?: boolean; url?: string; key?: string; message?: string; error?: string };
      if (res.status === 401) throw new Error('Ошибка авторизации. Выйдите и войдите в админку заново.');
      if (!res.ok || !json.url) throw new Error(json.message ?? json.error ?? 'Ошибка загрузки');
      setImages((prev) => [{ key: json.key ?? json.url!, url: json.url!, size: file.size }, ...prev]);
      showSuccess(`✓ Загружено: ${file.name}`);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Ошибка загрузки');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    void uploadFile(files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = async (key: string) => {
    if (!confirm(`Удалить файл?\n${key}`)) return;
    try {
      const res = await fetch(`/api/admin/images?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Ошибка удаления');
      setImages((prev) => prev.filter((img) => img.key !== key));
      showSuccess('✓ Файл удалён');
    } catch {
      setErrorMsg('Ошибка удаления файла');
    }
  };

  const copyUrl = (url: string, key: string) => {
    void navigator.clipboard.writeText(url).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(''), 2000);
    });
  };

  const folderLabel = FOLDERS.find((f) => f.value === folder)?.label ?? folder;

  return (
    <div className={styles.uploader}>
      {/* Folder tabs */}
      <div className={styles.folderBar}>
        <div className={styles.folderTabs}>
          {FOLDERS.map((f) => (
            <button
              key={f.value}
              className={`${styles.folderBtn} ${folder === f.value ? styles.folderBtnActive : ''}`}
              onClick={() => changeFolder(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          className={styles.loadListBtn}
          onClick={() => loadImages(folder)}
          disabled={loadingList}
        >
          {loadingList ? 'Загружаем…' : '↺ Показать файлы'}
        </button>
      </div>

      {/* Drop zone */}
      <div
        className={`${styles.dropzone} ${dragging ? styles.dropzoneActive : ''} ${uploading ? styles.dropzoneUploading : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Зона загрузки изображения"
        onKeyDown={(e) => e.key === 'Enter' && !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          className={styles.fileInput}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className={styles.dropzoneContent}>
          {uploading ? (
            <>
              <div className={styles.spinner} aria-hidden="true" />
              <span className={styles.dropzoneText}>Загружаем…</span>
            </>
          ) : (
            <>
              <span className={styles.dropzoneIcon} aria-hidden="true">🖼</span>
              <span className={styles.dropzoneText}>
                {dragging ? 'Отпустите файл' : 'Нажмите или перетащите изображение'}
              </span>
              <span className={styles.dropzoneHint}>
                JPEG · PNG · WEBP · SVG · до 10 МБ · папка: {folderLabel}
              </span>
            </>
          )}
        </div>
      </div>

      {successMsg && <div className={styles.successMsg} role="status">{successMsg}</div>}
      {errorMsg && <div className={styles.errorMsg} role="alert">{errorMsg}</div>}

      {/* Gallery */}
      {images.length > 0 && (
        <div className={styles.gallery}>
          <p className={styles.galleryTitle}>
            {images.length} {images.length === 1 ? 'файл' : 'файлов'} в «{folderLabel}»
          </p>
          <div className={styles.galleryGrid}>
            {images.map((img) => (
              <div key={img.key} className={styles.card}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.key} className={styles.cardImg} loading="lazy" />
                <div className={styles.cardBody}>
                  <span className={styles.cardName} title={img.key}>
                    {img.key.split('/').pop()}
                  </span>
                  <span className={styles.cardSize}>{formatSize(img.size)}</span>
                </div>
                <div className={styles.cardActions}>
                  <button
                    className={`${styles.copyBtn} ${copiedKey === img.key ? styles.copyBtnDone : ''}`}
                    onClick={() => copyUrl(img.url, img.key)}
                    title="Копировать URL"
                  >
                    {copiedKey === img.key ? '✓' : '📋'} URL
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(img.key)}
                    aria-label={`Удалить ${img.key}`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length === 0 && !loadingList && (
        <p className={styles.emptyHint}>
          Нажмите «Показать файлы» чтобы увидеть уже загруженные изображения.
        </p>
      )}
    </div>
  );
}
