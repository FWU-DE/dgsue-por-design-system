'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog.tsx';
import { Button } from './button.tsx';
import { Loader2 } from 'lucide-react';

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  isLoading?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
};

export function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Bestätigen',
  cancelText = 'Abbrechen',
  variant = 'default',
  isLoading = false,
  loadingText = 'Lädt...',
  children,
}: ConfirmationDialogProps) {
  const [isPending, setIsPending] = React.useState(false);
  const busy = isLoading || isPending;

  const handleConfirm = async () => {
    if (busy) return;
    setIsPending(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog
      open={open}
      // nicht schließen, solange die Aktion läuft
      onOpenChange={(next) => {
        if (!next && !busy) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children && <div className="py-4">{children}</div>}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={busy}>
            {cancelText}
          </Button>
          <Button type="button" variant={variant} onClick={handleConfirm} disabled={busy}>
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {loadingText}
              </>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
