"use client";

import { useEffect, useState } from "react";
import {
    Upload,
    MapPin,
    Sparkles,
    Trash2,
    Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UploadCardProps {
    image: File | null;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
    previewUrl: string;
    setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
    location: {
        latitude: number;
        longitude: number;
    } | null;
    address: string;
    isAnalyzing: boolean;
    onAnalyze: (
        image: File,
        location: { latitude: number; longitude: number },
        address: string
    ) => void;
    error: string;
    loading: boolean;
}

export function UploadCard({
    image,
    setImage,
    previewUrl,
    setPreviewUrl,
    location,
    address,
    isAnalyzing,
    onAnalyze,
    error,
    loading,
}: UploadCardProps) {


    useEffect(() => {
        if (!image) {
            setPreviewUrl("");
            return;
        }

        const url = URL.createObjectURL(image);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [image, setPreviewUrl]);


    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files?.[0]) {
            setImage(e.target.files[0]);
        }
    };

    const removeImage = () => {
        setImage(null);
    };


    return (
        <Card className="rounded-3xl border-0 bg-white/60 p-6 shadow-xl backdrop-blur-xl dark:bg-zinc-900/60">

            {!image ? (
                <label className="group flex h-[500px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-blue-300 transition hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-zinc-800">

                    <div className="rounded-full bg-blue-100 p-6 dark:bg-blue-900/30">
                        <Upload className="h-12 w-12 text-blue-600" />
                    </div>

                    <h2 className="mt-6 text-3xl font-bold">
                        Upload Image
                    </h2>

                    <p className="mt-3 text-center text-muted-foreground">
                        Click or drag & drop your image here
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                        JPG • PNG • WEBP
                    </p>

                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </label>
            ) : (
                <div>

                    <div className="relative overflow-hidden rounded-3xl">

                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="h-[420px] w-full object-contain bg-muted"
                            />
                        ) : (
                            <div className="flex h-[420px] items-center justify-center bg-muted">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        )}

                        <Button
                            size="icon"
                            variant="destructive"
                            className="absolute right-4 top-4"
                            onClick={removeImage}
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>

                    </div>

                    <div className="mt-3 rounded-xl bg-muted p-3">

                        <p className="truncate text-sm font-medium">
                            {image.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {(image.size / 1024 / 1024).toFixed(2)} MB
                        </p>

                    </div>

                </div>
            )}

            {/* Location */}

            <div className="mt-6 rounded-2xl border bg-muted/40 p-4">
                <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-blue-600" />

                    <div className="flex-1">

                        {loading && !error && (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm">
                                    Fetching your location...
                                </span>
                            </div>
                        )}
                        {error && (
                            <div className="text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        {location && (
                            <>
                                <p className="font-semibold text-green-600">
                                    GPS Location Active
                                </p>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    {address || "Fetching address..."}
                                </p>

                                <p className="mt-2 text-xs text-muted-foreground">
                                    {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                                </p>
                            </>
                        )
                        }
                    </div>
                </div>
            </div>

            {image && location && (

                <Button
                    onClick={() =>
                        onAnalyze(
                            image,
                            location,
                            address
                        )
                    }
                    disabled={isAnalyzing}
                    className="mt-6 h-14 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-lg hover:from-blue-700 hover:to-indigo-700"
                >

                    {isAnalyzing ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Analyze with AI
                        </>
                    )}

                </Button>

            )}

        </Card>
    );
}