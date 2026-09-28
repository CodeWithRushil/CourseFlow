import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import CourseLayout from "@/models/courseLayout";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isAuthorized(request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true; // allow in local/dev without secret
  const auth = request.headers.get("authorization") || "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const querySecret = request.nextUrl.searchParams.get("secret");
  return bearer === cronSecret || querySecret === cronSecret;
}

async function pingMongo() {
  await connectDB();
  const mongoose = require("mongoose");
  await mongoose.connection.db.collection('keep_alive_pings').updateOne(
    { _id: "ping" },
    { $set: { lastPing: new Date() } },
    { upsert: true }
  );
  
  return { ok: true };
}

async function pingAppwrite() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;

  if (!endpoint || !projectId) {
    return { ok: false, skipped: true, reason: "Appwrite env not configured" };
  }

  const headers = {
    "X-Appwrite-Project": projectId,
    "Content-Type": "application/json",
  };

  const requests = [];
  
  if (bucketId) {
    requests.push({
      url: `${endpoint.replace(/\/$/, "")}/storage/buckets/${bucketId}/files?limit=1`,
      method: "GET"
    });
    
    requests.push({
      url: `${endpoint.replace(/\/$/, "")}/storage/buckets/${bucketId}/files`,
      method: "POST",
      body: JSON.stringify({ fileId: "keep-alive", permissions: [] })
    });
  }
  
  requests.push({
    url: `${endpoint.replace(/\/$/, "")}/health`,
    method: "GET"
  });

  let lastError = null;
  for (const req of requests) {
    try {
      const res = await fetch(req.url, {
        method: req.method,
        headers,
        body: req.body,
        cache: "no-store",
      });
      if (res.ok || [401, 403, 404, 400].includes(res.status)) {
        if (req.method === "POST") {
          return { ok: true, status: res.status, url: req.url, method: "POST" };
        }
      } else {
        lastError = `HTTP ${res.status}`;
      }
    } catch (err) {
      lastError = err?.message || String(err);
    }
  }

  return { ok: lastError === null, error: lastError };
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const results = { mongo: null, appwrite: null };

  try {
    results.mongo = await pingMongo();
  } catch (err) {
    results.mongo = { ok: false, error: err?.message || String(err) };
  }

  try {
    results.appwrite = await pingAppwrite();
  } catch (err) {
    results.appwrite = { ok: false, error: err?.message || String(err) };
  }

  const success = Boolean(results.mongo?.ok) && Boolean(results.appwrite?.ok || results.appwrite?.skipped);

  return NextResponse.json(
    {
      success,
      message: "Keep-alive ping complete",
      at: new Date().toISOString(),
      results,
    },
    { status: success ? 200 : 207 }
  );
}
