import React, { useState, useRef } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { Button } from '../ui/button';

interface AddVersionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (versionName: string, remark: string, files: File[]) => void;
}

export const AddVersionModal: React.FC<AddVersionModalProps> = ({ isOpen, onClose, onImport }) => {
  const [name, setName] = useState('');
  const [remark, setRemark] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onImport(name, remark, selectedFiles);
    // Reset form
    setName('');
    setRemark('');
    setSelectedFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(Array.from(e.target.files));

      // Auto-fill version name from the first file name if empty
      if (!name) {
        const firstFile = e.target.files[0];
        // Remove extension
        const nameWithoutExt = firstFile.name.replace(/\.[^/.]+$/, "");
        setName(nameWithoutExt);
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">上传新版本标书</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">版本名称 <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
              placeholder="例如：投标文件-V2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">版本说明</label>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all resize-none"
              placeholder="简要描述此版本的修改内容..."
            />
          </div>

          <div>
            <input
              type="file"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".doc,.docx,.pdf,.xls,.xlsx"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <UploadCloud size={32} className="mx-auto text-gray-400 group-hover:text-brand mb-2" />
              <p className="text-sm font-medium text-gray-700">点击上传文件</p>
              <p className="text-xs text-gray-500 mt-1">支持常见文档格式，最大 100MB</p>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
              <div className="text-xs font-medium text-gray-500 mb-2">已选择 {selectedFiles.length} 个文件：</div>
              <ul className="space-y-1">
                {selectedFiles.map((f, i) => (
                  <li key={i} className="flex items-center justify-between text-xs text-gray-700 bg-white p-1.5 rounded border border-gray-100">
                    <span className="truncate flex-1 pr-2">{f.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-gray-400 hover:text-red-500 p-0.5"
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-2"
            >
              取消
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="px-6 py-2"
              disabled={!name || selectedFiles.length === 0}
            >
              <UploadCloud size={18} className="mr-2" />
              开始上传
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
