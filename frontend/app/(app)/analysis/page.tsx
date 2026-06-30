"use client";

import { useEffect, useState } from "react";
import { getAddressFromCoords } from "@/services/location";
import { Sparkles } from "lucide-react";
import { useLocation } from "@/hooks/useLocation";
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs";
import { submitReport } from "@/lib/api-client";
import { AnalyzerHero } from "@/components/ai/analyzer-hero";
import { UploadCard } from "@/components/ai/upload-card";
import { SuccessDialog } from "@/components/ai/sucess-dialog";
import { Button } from "@/components/ui/button"

export default function AIAnalyzerPage() {

  const [image, setImage] = useState<File | null>(null);
  const { location, loading, error } = useLocation();
  const [address, setAddress] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { getToken } = useAuth();

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
      /*
      reponse format
        success: true,

        // Image information
        imageName: file.originalname,
        imageUrl,

        // Location
        address,
        latitude,
        longitude,

        // AI analysis
        category: aiResult.category,
        confidence: aiResult.confidence,
        severity: aiResult.severity,
        description: aiResult.description,
        recommendedDepartment: aiResult.recommendedDepartment,
      */
      const token = await getToken();
      const response = await submitReport(formData, token);
      if (!response.ok) {
        const text = await response.text();

        console.error("Server response:", text);

        try {
          const error = JSON.parse(text);
          toast.error(error.message);
        } catch {
          toast.error(text);
        }
        return;
      }


      const data = await response.json();

      console.log(data);

      setResult(data);
      setAnalysis(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };


  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/submit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: result.imageUrl,
            category: result.category,
            confidence: result.confidence,
            severity: result.severity,
            description: result.description,
            department:
              result.recommendedDepartment,

            address: result.address,
            latitude:result.latitude,
            longitude: result.longitude,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      toast.success("Report submitted!");

      setSubmitted(true);

      setResult(null);

      setImage(null);

      setPreviewUrl("");

    } catch (err) {
      toast.error("Failed to submit report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <AnalyzerHero />

      {/* Main Content */}
      <div className="mt-2 grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
        {/* Upload Section */}

        <UploadCard
          image={image}
          setImage={setImage}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          location={location}
          address={address}
          isAnalyzing={isAnalyzing}
          onAnalyze={handleAnalyze}
          error={error}
          loading={loading}
        />

        {/* Results Section */}

        <div className="border rounded-3xl bg-white shadow-lg p-8 min-h-[520px]">

          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Analysis Results
          </h2>

          {!result ? (
            <div className="h-full flex flex-col justify-center items-center text-center">
              <Sparkles
                size={60}
                className="text-blue-300 mb-6"
              />

              <p className="text-slate-500 text-lg">
                Upload an image and click Analyze to
                detect civic issues.
              </p>
            </div>
          ) : (
            <div className="space-y-6">

              {/* Category */}
              <div className="flex justify-between items-center">
                <span className="text-slate-500">
                  Category
                </span>

                <span
                  className={`px-4 py-2 rounded-full font-semibold text-white
          ${result.category === "No Issue"
                      ? "bg-green-500"
                      : "bg-red-500"
                    }`}
                >
                  {result.category}
                </span>
              </div>

              {/* Severity */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-500">
                    Severity
                  </span>

                  <span className="font-semibold">
                    {result.severity}
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full
            ${result.severity === "High"
                        ? "bg-red-500 w-full"
                        : result.severity === "Medium"
                          ? "bg-yellow-500 w-2/3"
                          : "bg-green-500 w-1/3"
                      }`}
                  />
                </div>
              </div>

              {/* Confidence */}

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-500">
                    AI Confidence
                  </span>

                  <span className="font-semibold">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${result.confidence * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Description */}

              <div>
                <p className="text-slate-500 mb-2">
                  Description
                </p>

                <div className="bg-slate-100 rounded-xl p-4">
                  {result.description}
                </div>
              </div>

              {/* Department */}

              <div>
                <p className="text-slate-500 mb-2">
                  Recommended Department
                </p>

                <div className="bg-blue-50 text-blue-700 rounded-xl p-4 font-medium">
                  {result.recommendedDepartment ||
                    "No department required"}
                </div>
              </div>

              {/* Location */}

              <div>
                <p className="text-slate-500 mb-2">
                  Report Location
                </p>

                <div className="bg-slate-100 rounded-xl p-4">
                  {result.address}
                </div>
              </div>

              {/* Uploaded Image */}

              <div>
                <p className="text-slate-500 mb-2">
                  Uploaded Image
                </p>

                <img
                  src={result.imageUrl}
                  className="rounded-xl border max-h-52 object-cover"
                />
              </div>

            </div>
          )}
          {result && (
            <Button
              className="mt-8 w-full"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit Report"}
            </Button>
          )}
        </div>

        <SuccessDialog open={submitted} onClose={() => setSubmitted(false)} />
      </div>
    </div>
  );
}

