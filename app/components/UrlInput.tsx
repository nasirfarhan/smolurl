"use client";

import { useState } from "react";
import { isValidUrl } from "../lib/utils";

export default function UrlInput() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setShortUrl("");

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex gap-3"
      >
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white disabled:opacity-50"
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {error && (
        <p className="mt-3 text-sm text-red-500">
          {error}
        </p>
      )}

      {shortUrl && (
        <div className="mt-5 rounded-lg border p-4">
          <p className="text-sm text-gray-500">
            Your shortened URL
          </p>

          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-blue-600 hover:underline"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}