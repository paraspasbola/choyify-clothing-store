"use client";

import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
} from "@mui/material";

export default function AboutPage() {
    return (
        <main>
            {/* =====================================================
          HERO
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#FEFAEF",
                    minHeight: { xs: "70vh", md: "78vh" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 3,
                    pt: { xs: 10, md: 12 },
                    pb: { xs: 8, md: 10 },
                }}
            >
                <Box sx={{ maxWidth: 1050 }}>
                    <Typography
                        sx={{
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "10px",
                            fontWeight: 800,
                            letterSpacing: "0.18em",
                            color: "#858585",
                            mb: 2,
                        }}
                    >
                        THE CHŌYIFY STORY
                    </Typography>

                    <Typography
                        component="h1"
                        sx={{
                            fontFamily: "var(--font-anton)",
                            fontSize: {
                                xs: "62px",
                                sm: "88px",
                                md: "125px",
                            },
                            lineHeight: 0.84,
                            color: "#1E2D4C",
                            letterSpacing: "-1px",
                        }}
                    >
                        WEAR
                        <br />

                        <Box
                            component="span"
                            sx={{
                                color: "#ACBDAA",
                            }}
                        >
                            YOUR STORY.
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            maxWidth: 620,
                            mx: "auto",
                            mt: 4,
                            fontFamily: "var(--font-montserrat)",
                            fontSize: {
                                xs: "12px",
                                md: "14px",
                            },
                            lineHeight: 1.9,
                            color: "#858585",
                        }}
                    >
                        CHŌYIFY is a contemporary fashion brand built
                        around individuality, everyday expression and
                        the belief that style should feel like you.
                    </Typography>
                </Box>
            </Box>

            {/* =====================================================
          OUR STORY
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#1E2D4C",
                    color: "#FFFFFF",
                    py: { xs: 8, md: 12 },
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        px: { xs: 3, md: 6 },
                    }}
                >
                    <Grid
                        container
                        spacing={{ xs: 5, md: 10 }}
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        {/* LEFT */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Typography
                                sx={{
                                    fontFamily: "var(--font-montserrat)",
                                    fontSize: "10px",
                                    fontWeight: 800,
                                    letterSpacing: "0.16em",
                                    color: "#ACBDAA",
                                    mb: 2,
                                }}
                            >
                                OUR STORY
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: "var(--font-anton)",
                                    fontSize: {
                                        xs: "48px",
                                        md: "68px",
                                    },
                                    lineHeight: 0.9,
                                    color: "#FFFFFF",
                                }}
                            >
                                FASHION
                                <br />
                                WITHOUT
                                <br />
                                THE RULES.
                            </Typography>
                        </Grid>

                        {/* RIGHT */}
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography
                                sx={{
                                    fontFamily: "var(--font-montserrat)",
                                    fontSize: {
                                        xs: "13px",
                                        md: "14px",
                                    },
                                    lineHeight: 2,
                                    color: "rgba(255,255,255,0.68)",
                                    mb: 3,
                                }}
                            >
                                We believe fashion should be personal. It
                                should give you the freedom to experiment,
                                change your mood and express who you are
                                without having to follow a formula.
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: "var(--font-montserrat)",
                                    fontSize: {
                                        xs: "13px",
                                        md: "14px",
                                    },
                                    lineHeight: 2,
                                    color: "rgba(255,255,255,0.68)",
                                    mb: 3,
                                }}
                            >
                                CHŌYIFY was created with a simple idea:
                                create contemporary pieces that fit naturally
                                into everyday life while still making a
                                statement.
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: "var(--font-montserrat)",
                                    fontSize: {
                                        xs: "13px",
                                        md: "14px",
                                    },
                                    lineHeight: 2,
                                    color: "rgba(255,255,255,0.68)",
                                }}
                            >
                                From relaxed essentials to statement pieces,
                                every collection is designed to help you build
                                a wardrobe that feels distinctly yours.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* =====================================================
          BRAND VALUES
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#FFFFFF",
                    py: { xs: 8, md: 11 },
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        px: { xs: 3, md: 6 },
                    }}
                >
                    <Box sx={{ mb: 6 }}>
                        <Typography
                            sx={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "10px",
                                fontWeight: 800,
                                letterSpacing: "0.16em",
                                color: "#858585",
                                mb: 1.5,
                            }}
                        >
                            WHAT WE BELIEVE
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: "var(--font-anton)",
                                fontSize: {
                                    xs: "46px",
                                    md: "64px",
                                },
                                lineHeight: 0.9,
                                color: "#1E2D4C",
                            }}
                        >
                            MADE FOR
                            <br />
                            <Box
                                component="span"
                                sx={{
                                    color: "#ACBDAA",
                                }}
                            >
                                YOUR EVERYDAY.
                            </Box>
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <ValueCard
                            number="01"
                            title="INDIVIDUALITY"
                            text="Your style doesn't need to fit into one category. Wear what feels right to you."
                        />

                        <ValueCard
                            number="02"
                            title="EFFORTLESS STYLE"
                            text="Pieces designed to work together, so getting dressed feels simple and natural."
                        />

                        <ValueCard
                            number="03"
                            title="EVERYDAY QUALITY"
                            text="We focus on creating pieces that can become part of the wardrobe you actually live in."
                        />

                        <ValueCard
                            number="04"
                            title="SELF EXPRESSION"
                            text="Fashion is another way to tell your story. Make it yours."
                        />
                    </Grid>
                </Container>
            </Box>

            {/* =====================================================
          CHŌYIFY STATEMENT
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#ACBDAA",
                    py: { xs: 8, md: 11 },
                    px: 3,
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.16em",
                        color: "#1E2D4C",
                        mb: 2,
                    }}
                >
                    OUR PHILOSOPHY
                </Typography>

                <Typography
                    sx={{
                        maxWidth: 1000,
                        mx: "auto",
                        fontFamily: "var(--font-anton)",
                        fontSize: {
                            xs: "44px",
                            sm: "58px",
                            md: "78px",
                        },
                        lineHeight: 0.9,
                        color: "#1E2D4C",
                    }}
                >
                    DON'T DRESS FOR THE
                    <br />
                    WORLD. DRESS FOR YOU.
                </Typography>
            </Box>

            {/* =====================================================
          SHOP CTA
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#FEFAEF",
                    py: { xs: 7, md: 9 },
                    px: 3,
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.16em",
                        color: "#858585",
                        mb: 1.5,
                    }}
                >
                    FIND YOUR NEXT LOOK
                </Typography>

                <Typography
                    sx={{
                        fontFamily: "var(--font-anton)",
                        fontSize: {
                            xs: "44px",
                            md: "64px",
                        },
                        lineHeight: 0.9,
                        color: "#1E2D4C",
                    }}
                >
                    YOUR STORY
                    <br />
                    STARTS HERE.
                </Typography>

                <Button
                    component="a"
                    href="/shop"
                    sx={{
                        mt: 3.5,
                        minHeight: 52,
                        px: 4,
                        borderRadius: "12px",
                        backgroundColor: "#1E2D4C",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        "&:hover": {
                            backgroundColor: "#ACBDAA",
                            color: "#1E2D4C",
                        },
                    }}
                >
                    SHOP CHŌYIFY
                </Button>
            </Box>
        </main>
    );
}

/* =========================================================
   VALUE CARD
========================================================= */

function ValueCard({
    number,
    title,
    text,
}) {
    return (
        <Grid size={{ xs: 12, sm: 6 }}>
            <Box
                sx={{
                    minHeight: {
                        xs: 220,
                        md: 250,
                    },
                    p: {
                        xs: 3,
                        md: 4,
                    },
                    backgroundColor: "#FEFAEF",
                    borderRadius: "20px",
                    border: "1px solid rgba(30,45,76,0.07)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.25s ease",
                    "&:hover": {
                        transform: "translateY(-5px)",
                        borderColor: "#ACBDAA",
                    },
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "10px",
                        fontWeight: 800,
                        color: "#ACBDAA",
                        letterSpacing: "0.1em",
                    }}
                >
                    {number}
                </Typography>

                <Box>
                    <Typography
                        sx={{
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "13px",
                            fontWeight: 800,
                            letterSpacing: "0.1em",
                            color: "#1E2D4C",
                            mb: 1.5,
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        sx={{
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "12px",
                            lineHeight: 1.8,
                            color: "#858585",
                        }}
                    >
                        {text}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    );
}