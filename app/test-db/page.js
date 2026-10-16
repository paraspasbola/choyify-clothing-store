"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function TestDatabasePage() {
    const [status, setStatus] = useState("Testing Supabase...");
    const [details, setDetails] = useState("");

    useEffect(() => {
        async function testSupabase() {
            try {
                const { data, error } = await supabase
                    .from("products")
                    .select("*")
                    .limit(1);

                if (error) {
                    console.log("SUPABASE ERROR:", error);

                    setStatus("Supabase responded");
                    setDetails(
                        `Message: ${error.message}\nCode: ${error.code || "N/A"}`
                    );

                    return;
                }

                console.log("SUPABASE DATA:", data);

                setStatus("Supabase connection is working!");
                setDetails(
                    "The request reached Supabase successfully."
                );
            } catch (error) {
                console.error("FETCH ERROR:", error);

                setStatus("Failed to reach Supabase");
                setDetails(error?.message || "Unknown error");
            }
        }

        testSupabase();
    }, []);

    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#FEFAEF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "30px",
                fontFamily: "var(--font-montserrat), sans-serif",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "650px",
                    background: "#fff",
                    borderRadius: "24px",
                    padding: "50px",
                    textAlign: "center",
                    boxShadow: "0 20px 60px rgba(30,45,76,0.1)",
                }}
            >
                <p
                    style={{
                        color: "#ACBDAA",
                        fontWeight: 800,
                        letterSpacing: "2px",
                    }}
                >
                    CHŌYIFY × SUPABASE
                </p>

                <h1
                    style={{
                        color: "#1E2D4C",
                        fontFamily: "var(--font-anton), sans-serif",
                        fontSize: "52px",
                        margin: "15px 0 30px",
                    }}
                >
                    DATABASE TEST
                </h1>

                <div
                    style={{
                        background: "#F5F3F1",
                        borderRadius: "16px",
                        padding: "25px",
                    }}
                >
                    <h2
                        style={{
                            color: "#1E2D4C",
                            margin: "0 0 15px",
                        }}
                    >
                        {status}
                    </h2>

                    <p
                        style={{
                            whiteSpace: "pre-line",
                            color: "#858585",
                            lineHeight: 1.7,
                            margin: 0,
                        }}
                    >
                        {details}
                    </p>
                </div>
            </div>
        </main>
    );
}