import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { createSession, getGymIdByUserId } from "@/app/lib/sessionHandler";
import { useAuthStore } from "@/app/lib/store";
import axios from "axios";
import { XIcon } from "lucide-react";
import { Session, sessionTypes } from "@/app/types/session";

interface CreateSessionFormProps {
  onClose: () => void;
  onSessionCreated?: () => void;
}

export default function CreateSessionForm({
  onClose,
  onSessionCreated,
}: CreateSessionFormProps) {
  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    description: "",
    type: "",
    cost: "",
    capacity: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const { userId, accessToken } = useAuthStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.cost) newErrors.cost = "Cost is required";
    if (!formData.capacity) newErrors.capacity = "Capacity is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (formData.type == "") newErrors.type = "Type is required";

    if (formData.startTime && formData.endTime) {
      const start = new Date(`1970-01-01T${formData.startTime}:00`);
      const end = new Date(`1970-01-01T${formData.endTime}:00`);

      if (end <= start) {
        newErrors.endTime = "End time must be after start time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!userId || !accessToken) {
      setError("You must be logged in to create a session");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const gymId = await getGymIdByUserId(userId);
      console.log("Retrieved gymId:", gymId);

      const newSession: Omit<Session, "id" | "gym" | "sessionHolder"> = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        cost: formData.cost,
        startTime: formData.startTime,
        endTime: formData.endTime,
        capacity: Number(formData.capacity),
        status: "ACTIVE",
        type: formData.type,
        imageUrl: formData.imageUrl,
      };

      console.log("Submitting session data:", newSession);

      await createSession(newSession, gymId);

      onClose();
      if (onSessionCreated) {
        onSessionCreated();
      }
    } catch (err) {
      console.error("Error creating session:", err);
      if (axios.isAxiosError(err)) {
        console.error("Response data:", err.response?.data);
        console.error("Response status:", err.response?.status);
      }
      setError("Failed to create session. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 max-w-[425px] w-full mx-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Session</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-emerald-800 font-medium">Title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`border ${
                errors.title ? "border-red-500" : "border-emerald-200"
              } rounded-lg px-3 py-2 focus:outline-emerald-400`}
              placeholder="Title"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title}</span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-emerald-800 font-medium">Description</span>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border border-emerald-200 rounded-lg px-3 py-2 focus:outline-emerald-400"
              placeholder="Description"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-emerald-800 font-medium">Type</span>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="border border-emerald-200 rounded-lg px-3 py-2 focus:outline-emerald-400"
            >
              <option value="">Select Type</option>
              {sessionTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && (
              <span className="text-red-500 text-sm">{errors.type}</span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-emerald-800 font-medium">Cost</span>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleInputChange}
              min={0}
              className={`border ${
                errors.cost ? "border-red-500" : "border-emerald-200"
              } rounded-lg px-3 py-2 focus:outline-emerald-400`}
              placeholder="Cost"
            />
            {errors.cost && (
              <span className="text-red-500 text-sm">{errors.cost}</span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-emerald-800 font-medium">Capacity</span>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              min={0}
              className={`border ${
                errors.capacity ? "border-red-500" : "border-emerald-200"
              } rounded-lg px-3 py-2 focus:outline-emerald-400`}
              placeholder="Capacity"
            />
            {errors.capacity && (
              <span className="text-red-500 text-sm">{errors.capacity}</span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-emerald-800 font-medium">Image Url</span>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="border border-emerald-200 rounded-lg px-3 py-2 focus:outline-emerald-400"
              placeholder="Image URL"
            />
          </label>

          <div className="space-y-3">
            <div className="w-full">
              <span className="text-emerald-800 font-medium text-sm block mb-1">
                Date
              </span>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`border ${
                  errors.date ? "border-red-500" : "border-emerald-200"
                } rounded-lg px-3 py-1.5 w-full focus:outline-emerald-400 text-sm`}
              />
              {errors.date && (
                <span className="text-red-500 text-xs">{errors.date}</span>
              )}
            </div>

            <div>
              <label className="flex flex-col gap-1">
                <span className="text-emerald-800 font-medium">Start Time</span>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className={`border ${
                    errors.startTime ? "border-red-500" : "border-emerald-200"
                  } rounded-lg px-3 py-2 focus:outline-emerald-400`}
                />
                {errors.startTime && (
                  <span className="text-red-500 text-sm">
                    {errors.startTime}
                  </span>
                )}
              </label>
            </div>

            <div>
              <label className="flex flex-col gap-1">
                <span className="text-emerald-800 font-medium">End Time</span>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className={`border ${
                    errors.endTime ? "border-red-500" : "border-emerald-200"
                  } rounded-lg px-3 py-2 focus:outline-emerald-400`}
                />
                {errors.endTime && (
                  <span className="text-red-500 text-sm">{errors.endTime}</span>
                )}
              </label>
            </div>
          </div>

          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 py-2 mt-2"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Add Session"}
          </Button>
          {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
        </form>
      </div>
    </div>
  );
}
