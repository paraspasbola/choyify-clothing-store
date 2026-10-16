"use client";

import {
    Box,
    Button,
    Typography,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import ProductGrid from "../../components/products/ProductGrid";

export default function SalePage() {
    return (
        <main>
            {/* =========================================
          SALE HERO
      ========================================= */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#1E2D4C",

                    color: "#FFFFFF",

                    py: {
                        xs: 9,
                        md: 13,
                    },

                    px: {
                        xs: 3,
                        sm: 5,
                        md: 7,
                    },
                }}
            >
                <Box
                    sx={{
                        maxWidth: "1500px",
                        mx: "auto",

                        display: {
                            xs: "block",
                            md: "grid",
                        },

                        gridTemplateColumns: {
                            md: "1.2fr 0.8fr",
                        },

                        alignItems: "end",

                        gap: {
                            xs: 5,
                            md: 8,
                        },
                    }}
                >
                    {/* LEFT */}

                    <Box>
                        <Typography
                            sx={{
                                fontFamily:
                                    "var(--font-montserrat)",

                                fontSize: "11px",

                                fontWeight: 800,

                                letterSpacing: "0.3em",

                                color: "#ACBDAA",

                                mb: 2,
                            }}
                        >
                            CHŌYIFY SPECIAL
                        </Typography>

                        <Typography
                            component="h1"
                            sx={{
                                fontFamily:
                                    "var(--font-anton)",

                                fontSize: {
                                    xs: "80px",
                                    sm: "100px",
                                    md: "140px",
                                    lg: "170px",
                                },

                                lineHeight: 0.82,

                                letterSpacing: "-2px",

                                fontWeight: 400,

                                color: "#FFFFFF",
                            }}
                        >
                            SALE
                        </Typography>
                    </Box>

                    {/* RIGHT */}

                    <Box
                        sx={{
                            display: "flex",

                            flexDirection: "column",

                            alignItems: {
                                xs: "flex-start",
                                md: "flex-end",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily:
                                    "var(--font-montserrat)",

                                fontSize: "13px",

                                lineHeight: 1.8,

                                fontWeight: 500,

                                color:
                                    "rgba(255,255,255,0.65)",

                                maxWidth: "430px",

                                textAlign: {
                                    xs: "left",
                                    md: "right",
                                },

                                mb: 3,
                            }}
                        >
                            Your favourites, now for less.
                            Discover selected CHŌYIFY styles
                            with limited-time prices before
                            they're gone.
                        </Typography>

                        <Button
                            href="/shop"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                fontFamily:
                                    "var(--font-montserrat)",

                                fontSize: "10px",

                                fontWeight: 800,

                                letterSpacing: "0.15em",

                                color: "#FFFFFF",

                                borderBottom:
                                    "1px solid #FFFFFF",

                                borderRadius: 0,

                                px: 0,

                                pb: 1,

                                "&:hover": {
                                    backgroundColor:
                                        "transparent",

                                    color: "#ACBDAA",

                                    borderColor: "#ACBDAA",
                                },
                            }}
                        >
                            SHOP ALL
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* =========================================
          COLLECTION HEADER
      ========================================= */}

            <Box
                sx={{
                    backgroundColor: "#FFFFFF",

                    py: {
                        xs: 6,
                        md: 8,
                    },

                    px: {
                        xs: 3,
                        md: 7,
                    },
                }}
            >
                <Box
                    sx={{
                        maxWidth: "1500px",
                        mx: "auto",

                        display: "flex",

                        alignItems: {
                            xs: "flex-start",
                            md: "center",
                        },

                        justifyContent: "space-between",

                        flexDirection: {
                            xs: "column",
                            md: "row",
                        },

                        gap: 3,
                    }}
                >
                    {/* TITLE */}

                    <Box>
                        <Typography
                            sx={{
                                fontFamily:
                                    "var(--font-montserrat)",

                                fontSize: "10px",

                                fontWeight: 800,

                                letterSpacing: "0.25em",

                                color: "#858585",

                                mb: 1,
                            }}
                        >
                            LIMITED PRICES
                        </Typography>

                        <Typography
                            component="h2"
                            sx={{
                                fontFamily:
                                    "var(--font-anton)",

                                fontSize: {
                                    xs: "45px",
                                    md: "60px",
                                },

                                lineHeight: 0.9,

                                color: "#1E2D4C",

                                fontWeight: 400,
                            }}
                        >
                            SHOP SALE
                        </Typography>
                    </Box>

                    {/* RIGHT LABEL */}

                    <Typography
                        sx={{
                            fontFamily:
                                "var(--font-montserrat)",

                            fontSize: "12px",

                            fontWeight: 600,

                            color: "#858585",
                        }}
                    >
                        SALE COLLECTION
                    </Typography>
                </Box>
            </Box>

            {/* =========================================
          SALE PRODUCTS
      ========================================= */}

            <ProductGrid category="SALE" />
        </main>
    );
}