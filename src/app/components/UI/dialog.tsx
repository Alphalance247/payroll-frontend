'use client'
import React, { ReactNode, useEffect } from "react";
    
interface DialogProps {
      open: boolean;
      onOpenChange: (open: boolean) => void;
      children: ReactNode;
}
    
    export function Dialog({ open, onOpenChange, children }: DialogProps) {
      useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Escape") onOpenChange(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
      }, [open, onOpenChange]);
    
      if (!open) return null;
    
      return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => onOpenChange(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      );
    }
    
    export function DialogContent({ children, className = "" }: { children: ReactNode; className?: string }) {
      return (
        <div className={`${className}`}>
          {children}
        </div>
      );
    }
    
    export function DialogHeader({ children }: { children: ReactNode }) {
      return <div className="border-b border-[#E3E3E5] pt-6 pb-[18px] px-4">{children}</div>;
    }
    
    export function DialogTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
      return <h2 className={`text-lg font-bold mb-2 ${className}`}>{children}</h2>;
    }
    
    export function DialogFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
      return <div className={`border-t gap-2 border-[#E3E3E5] mt-2 pt-4 ${className}`}>{children}</div>;
    }
