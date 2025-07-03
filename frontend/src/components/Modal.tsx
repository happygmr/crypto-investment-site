import React from 'react';

interface ModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({ open, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onCancel}>{cancelText}</button>
          <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
} 