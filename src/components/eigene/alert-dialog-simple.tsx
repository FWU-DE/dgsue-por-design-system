'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../shadcn/dialog.tsx';
import { Button } from '../shadcn/button.tsx';
import { AlertTriangle, Info } from 'lucide-react';

type AlertDialogSimpleProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  variant?: 'default' | 'destructive';
};

export function AlertDialogSimple({
  open,
  onClose,
  title,
  message,
  variant = 'default',
}: AlertDialogSimpleProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {variant === 'destructive' ? (
              <AlertTriangle className="h-5 w-5 text-destructive" />
            ) : (
              <Info className="h-5 w-5 text-primary" />
            )}
            {title || (variant === 'destructive' ? 'Fehler' : 'Hinweis')}
          </DialogTitle>
          <DialogDescription className="text-left whitespace-pre-line">{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button type="button" onClick={onClose}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
