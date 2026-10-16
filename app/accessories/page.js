"use client";

import {
    Box,
    Button,
    Typography,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import ProductGrid from "../../components/products/ProductGrid";

export default function AccessoriesPage() {
    return (
        <main>
            {/* ================================
          HERO / INTRO SECTION
      ================================= */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#F5F5F2",
                    py: { xs: 8, md: 12 },
                    px: { xs: 3, sm: 5, md: 7 },
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
                            md: "1fr 1fr",
                        },

                        alignItems: "end",

                        gap: {
                            xs: 4,
                            md: 8,
                        },
                    }}
                >
                    {/* LEFT */}

                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "11px",
                                fontWeight: 800,
                                letterSpacing: "0.3em",
                                color: "#858585",
                                mb: 2,
                            }}
                        >
                            CHŌYIFY ACCESSORIES
                        </Typography>

                        <Typography
                            component="h1"
                            sx={{
                                fontFamily: "var(--font-anton)",
                                fontSize: {
                                    xs: "60px",
                                    sm: "75px",
                                    md: "100px",
                                    lg: "115px",
                                },
                                lineHeight: 0.88,
                                letterSpacing: "-1px",
                                fontWeight: 400,
                                color: "#1E2D4C",
                            }}
                        >
                            ACCESSORIES
                            <br />

                            <Box
                                component="span"
                                sx={{
                                    color: "#ACBDAA",
                                }}
                            >
                                EDIT.
                            </Box>
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
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "13px",
                                lineHeight: 1.8,
                                fontWeight: 500,
                                color: "#858585",

                                maxWidth: "430px",

                                textAlign: {
                                    xs: "left",
                                    md: "right",
                                },

                                mb: 3,
                            }}
                        >
                            Complete your everyday look with
                            carefully selected accessories. From
                            subtle essentials to statement pieces,
                            find the details that make your style
                            uniquely yours.
                        </Typography>

                        <Button
                            href="/shop"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "10px",
                                fontWeight: 800,
                                letterSpacing: "0.15em",

                                color: "#1E2D4C",

                                borderBottom:
                                    "1px solid #1E2D4C",

                                borderRadius: 0,

                                px: 0,
                                pb: 1,

                                "&:hover": {
                                    backgroundColor: "transparent",
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

            {/* ================================
          COLLECTION HEADER
      ================================= */}

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
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "10px",
                                fontWeight: 800,
                                letterSpacing: "0.25em",
                                color: "#858585",
                                mb: 1,
                            }}
                        >
                            THE COLLECTION
                        </Typography>

                        <Typography
                            component="h2"
                            sx={{
                                fontFamily: "var(--font-anton)",
                                fontSize: {
                                    xs: "45px",
                                    md: "60px",
                                },
                                lineHeight: 0.9,
                                color: "#1E2D4C",
                                fontWeight: 400,
                            }}
                        >
                            SHOP ACCESSORIES
                        </Typography>
                    </Box>

                    {/* PRODUCT COUNT */}

                    <Typography
                        sx={{
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#858585",
                        }}
                    >
                        00 PRODUCTS
                    </Typography>
                </Box>
            </Box>

            {/* ================================
          PRODUCT GRID
      ================================= */}

            <ProductGrid category="ACCESSORIES" />
        </main>
    );
}