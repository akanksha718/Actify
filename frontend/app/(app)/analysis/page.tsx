"use client";

import { useEffect, useState } from "react";
import { getAddressFromCoords } from "@/services/location";
import { Upload, Sparkles, MapPin } from "lucide-react";
import { useLocation } from "@/hooks/useLocation";
import { toast } from "sonner"


export default function AIAnalyzerPage() {
  const [image, setImage] = useState<File | null>(null);
  const { location, loading, error } = useLocation();
  const [address, setAddress] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  useEffect(() => {
    const fetchAddress = async () => {
      if (!location) return;

      const result = await getAddressFromCoords(
        location.latitude,
        location.longitude
      );

      if (result) {
        setAddress(result.displayName);
      }
    };

    fetchAddress();
  }, [location]);

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
  useEffect(() => {
    if (!image) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(image);

    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [image]);

  const handleAnalyze = async () => {
    if (!image) {
      toast.error("Please upload an image first.");
      return;
    }

    if (!location) {
      toast.error("Location not available.");
      return;
    }

    try {
      setIsAnalyzing(true);

      const formData = new FormData();

      formData.append("image", image);
      formData.append("address", address);
      formData.append(
        "latitude",
        location.latitude.toString()
      );
      formData.append(
        "longitude",
        location.longitude.toString()
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/analyze`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();

      console.log(data);

      setResult(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-8 py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-800 to-purple-400 bg-clip-text text-transparent mb-4">
          AI-Powered Civic Issue Detection
        </h1>

        <p className="text-xl text-slate-600">
          Upload an image of a civic issue and our AI will automatically
          identify, categorize, and assess its severity.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
        {/* Upload Section */}
        <div className="flex flex-col items-center">
          {!image ? (
            <label className="w-full border-2 border-dashed border-blue-300 rounded-3xl cursor-pointer hover:border-blue-500 transition-all">
              <div className="h-[420px] flex flex-col justify-center items-center text-center px-6">
                <Upload size={50} className="text-blue-300 mb-6" />

                <h2 className="text-3xl font-semibold text-slate-900">
                  Drop image here or click to upload
                </h2>

                <p className="text-blue-400 text-lg mt-4">
                  Supports JPG, PNG, WEBP (Max 10MB)
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          ) : (
            <div className="relative w-full rounded-3xl overflow-hidden bg-slate-50">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-auto  object-contain"
                />
              )}

              <button
                type="button"
                onClick={removeImage}
                className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>

              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm">
                {image.name}
              </div>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />

          {/* {Location} */}

          <div className="flex items-center gap-2 mt-8">
            <MapPin size={20} />

            {loading && (
              <span className="text-orange-500">
                Fetching Location...
              </span>
            )}

            {error && (
              <span className="text-red-500">
                {error}
              </span>
            )}

            {location && (
              <div className="text-green-600">
                <p className="font-medium">
                  GPS Location Active
                </p>

                {address && (
                  <div className="mt-2 text-sm text-slate-600">
                    {address}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Analyze Button */}
          {image && (
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="mt-10 flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50"
            >
              <Sparkles size={20} />

              {isAnalyzing
                ? "Analyzing..."
                : "Analyze Image"}
            </button>
          )}
        </div>

        {/* Results Section */}
        <div className="h-[420px] border rounded-3xl bg-slate-50 flex flex-col justify-center items-center text-center p-8">
          <MapPin size={50} className="text-slate-300 mb-6" />

          <h2 className="text-4xl font-bold text-slate-900">
            Analysis Results
          </h2>

          <p className="mt-4 text-slate-500 text-lg max-w-md">
            Upload an image and click analyze to view AI-powered issue
            detection results.
          </p>
        </div>
      </div>
    </div>
  );
}