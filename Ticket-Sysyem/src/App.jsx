import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const INITIAL_TICKETS = [
  { id: "#1001", title: "Login Issues – Can't Access Account",      desc: "Customer is unable to log in to their account. They've tried resetting their password multiple times but still...", status: "Open",        priority: "HIGH PRIORITY",   assignee: "John Smith",      date: "1/15/2024" },
  { id: "#1002", title: "Payment Failed – Card Declined",           desc: "Customer attempted to pay using Visa ending 1234 but the payment keeps failing despite sufficient balance.",          status: "Open",        priority: "HIGH PRIORITY",   assignee: "Sarah Johnson",   date: "1/16/2024" },
  { id: "#1003", title: "Unable to Download Invoice",               desc: "Customer cannot download their January invoice from the billing section. The download button is...",                 status: "In-Progress", priority: "MEDIUM PRIORITY", assignee: "Michael Brown",   date: "1/17/2024" },
  { id: "#1004", title: "Incorrect Billing Address",                desc: "Customer's billing address shows a different city. They updated it but it still displays the old one.",              status: "Open",        priority: "LOW PRIORITY",    assignee: "Emily Davis",     date: "1/18/2024" },
  { id: "#1005", title: "App Crash on Launch",                      desc: "Customer reports that the mobile app crashes immediately upon opening on Android 13.",                               status: "Open",        priority: "HIGH PRIORITY",   assignee: "David Wilson",    date: "1/19/2024" },
  { id: "#1006", title: "Refund Not Processed",                     desc: "Customer requested a refund two weeks ago but has not received the amount yet.",                                    status: "In-Progress", priority: "MEDIUM PRIORITY", assignee: "Sophia Taylor",   date: "1/20/2024" },
  { id: "#1007", title: "Two-Factor Authentication Issue",          desc: "Customer is not receiving 2FA codes on their registered phone number.",                                              status: "Open",        priority: "HIGH PRIORITY",   assignee: "James Anderson",  date: "1/21/2024" },
  { id: "#1008", title: "Unable to Update Profile Picture",         desc: "Customer tries to upload a new profile picture but gets 'Upload failed' error.",                                    status: "Open",        priority: "LOW PRIORITY",    assignee: "Olivia Martinez", date: "1/22/2024" },
  { id: "#1009", title: "Subscription Auto-Renewal",                desc: "Customer wants to enable auto-renewal for their subscription but the toggle is disabled.",                          status: "In-Progress", priority: "MEDIUM PRIORITY", assignee: "Liam Thomas",     date: "1/17/2024" },
  { id: "#1010", title: "Missing Order Confirmation Email",         desc: "Customer placed an order but didn't receive a confirmation email even though payment succeeded.",                    status: "Open",        priority: "MEDIUM PRIORITY", assignee: "Isabella Garcia", date: "1/24/2024" },
];

const STATUS_CLASS  = { "Open": "badge-open", "In-Progress": "badge-inprogress" };
const PRIORITY_CLASS = { "HIGH PRIORITY": "pri-high", "MEDIUM PRIORITY": "pri-medium", "LOW PRIORITY": "pri-low" };