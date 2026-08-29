"use client";

import { useState } from "react";
import { isValidUrl } from "../lib/utils";

export default function UrlInput() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setError("");

  if (!isValidUrl(url)) {
    setError("Please enter a valid URL.");
    return;
  }

  try {
    const response = await fetch("/api/urls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    console.log(data);
  } catch {
    setError("Something went wrong.");
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl"
    >
      <div className="flex gap-3">
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Shorten
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </form>
  );
}