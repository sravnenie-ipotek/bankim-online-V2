'use client'

import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'

interface UploadedFile {
  name: string
  size: number
  type: string
  status: 'uploading' | 'success' | 'error'
}

export default function MobileDocumentUpload() {
  const { t } = useTranslation()
  const params = useParams()
  const uploadId = params.uploadId as string

  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)

  const handleFiles = useCallback(async (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
      status: 'uploading' as const,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('uploadId', uploadId)

      try {
        const response = await fetch('/api/documents/upload', { method: 'POST', body: formData })
        if (response.ok) {
          setFiles((prev) =>
            prev.map((f) => f.name === file.name ? { ...f, status: 'success' } : f)
          )
        } else {
          throw new Error('Upload failed')
        }
      } catch {
        setFiles((prev) =>
          prev.map((f) => f.name === file.name ? { ...f, status: 'error' } : f)
        )
      }
    }
  }, [uploadId])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleFiles(e.target.files)
  }, [handleFiles])

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const statusIcons: Record<string, string> = {
    uploading: '⏳',
    success: '✅',
    error: '❌',
  }

  return (
    <div className="min-h-screen bg-base-primary p-4 flex flex-col gap-6">
      <h1 className="text-xl font-medium text-textTheme-primary text-center">
        {t('document_upload')}
      </h1>

      {/* Upload area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-accent-primary bg-accent-primary/10' : 'border-base-stroke'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <p className="text-textTheme-secondary mb-4">{t('drag_drop_files')}</p>
        <label className="inline-block px-6 py-3 bg-accent-primary text-base-primary rounded-lg font-medium cursor-pointer hover:bg-accent-primaryActiveButton transition-colors">
          {t('choose_files')}
          <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleInputChange} className="hidden" />
        </label>
        <p className="text-xs text-textTheme-disabled mt-2">{t('supported_formats')}: PDF, JPG, PNG, DOC</p>
      </div>

      {/* Uploaded files list */}
      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-textTheme-primary">{t('uploaded_files')}</h2>
          {files.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-base-secondary rounded-lg">
              <div className="flex flex-col">
                <span className="text-sm text-textTheme-primary">{file.name}</span>
                <span className="text-xs text-textTheme-secondary">{formatSize(file.size)}</span>
              </div>
              <span>{statusIcons[file.status]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
