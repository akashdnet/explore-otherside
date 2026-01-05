"use client";

import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";

interface ImageUploadProps {
    value?: string | File;
    onChange?: (file: File | null) => void;
    disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const maxSizeMB = 10;
    const maxSize = maxSizeMB * 1024 * 1024;

    const [
        { files, isDragging, errors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            getInputProps,
        },
    ] = useFileUpload({
        accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
        maxSize,
        onFilesChange: (files) => {
            if (onChange) {
                const file = files[0]?.file;
                onChange(file instanceof File ? file : null);
            }
        },
    });

    const previewUrl = files[0]?.preview || (typeof value === "string" ? value : null);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="relative">
                <div
                    className="relative flex min-h-40 flex-col items-center justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
                    data-dragging={isDragging || undefined}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input
                        {...getInputProps()}
                        disabled={disabled}
                        aria-label="Upload image file"
                        className="sr-only"
                    />
                    {previewUrl ? (
                        <div className="absolute inset-0 flex items-center justify-center p-2">
                            <img
                                alt="Profile preview"
                                className="mx-auto max-h-full rounded object-contain"
                                src={previewUrl}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                            <div
                                aria-hidden="true"
                                className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
                            >
                                <ImageIcon className="size-4 opacity-60" />
                            </div>
                            <p className="mb-1.5 font-medium text-xs">Drop your image here</p>
                            <p className="text-muted-foreground text-[10px]">
                                SVG, PNG, JPG (max. {maxSizeMB}MB)
                            </p>
                            <Button
                                type="button"
                                className="mt-2 h-8 text-xs"
                                onClick={openFileDialog}
                                variant="outline"
                                disabled={disabled}
                            >
                                <UploadIcon
                                    aria-hidden="true"
                                    className="-ms-1 size-3 opacity-60 mr-1"
                                />
                                Select image
                            </Button>
                        </div>
                    )}
                </div>

                {previewUrl && (
                    <div className="absolute top-2 right-2">
                        <button
                            aria-label="Remove image"
                            className="z-50 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            onClick={() => {
                                removeFile(files[0]?.id || "");
                                if (onChange) onChange(null);
                            }}
                            type="button"
                            disabled={disabled}
                        >
                            <XIcon aria-hidden="true" className="size-3" />
                        </button>
                    </div>
                )}
            </div>

            {errors.length > 0 && (
                <div
                    className="flex items-center gap-1 text-destructive text-[10px]"
                    role="alert"
                >
                    <AlertCircleIcon className="size-3 shrink-0" />
                    <span>{errors[0]}</span>
                </div>
            )}
        </div>
    );
}
