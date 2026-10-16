"use client";

import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    Chip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const articles = [
    {
        category: "STYLE",
        title: "HOW TO BUILD YOUR EVERYDAY WARDROBE",
        description:
            "A simple guide to creating a wardrobe that feels effortless, versatile and completely yours.",
        image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
        date: "OCT 02, 2026",
    },
    {
        category: "TRENDING",
        title: "THE ART OF MINIMAL DRESSING",
        description:
            "Discover how clean silhouettes, neutral tones and thoughtful details can transform your everyday style.",
        image:
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80",
        date: "SEP 24, 2026",
    },
    {
        category: "INSPIRATION",
        title: "WEAR YOUR STORY",
        description:
            "Fashion is more than what you wear. It's about the confidence, individuality and stories behind every look.",
        image:
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
        date: "SEP 16, 2026",
    },
    {
        category: "STYLE GUIDE",
        title: "5 WAYS TO STYLE ONE SHIRT",
        description:
            "One essential piece. Five completely different looks. Here's how to make your wardrobe work harder.",
        image:
            "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=80",
        date: "SEP 08, 2026",
    },
    {
        category: "CHŌYIFY",
        title: "MEET THE CHŌYIFY EDIT",
        description:
            "A closer look at the pieces, silhouettes and details that define our latest collection.",
        image:
            "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
        date: "AUG 29, 2026",
    },
    {
        category: "FASHION",
        title: "DRESSING FOR YOURSELF",
        description:
            "Forget the rules. The best outfit is the one that makes you feel like yourself.",
        image:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
        date: "AUG 18, 2026",
    },
];

function ArticleCard({ article }) {
    return (
        <Card
            elevation={0}
            sx={{
                backgroundColor: "transparent",
                borderRadius: 0,
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* IMAGE */}
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    aspectRatio: "4 / 3",
                    backgroundColor: "#E0C8BB",
                }}
            >
                <CardMedia
                    component="img"
                    image={article.image}
                    alt={article.title}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s ease",
                        "&:hover": {
                            transform: "scale(1.04)",
                        },
                    }}
                />

                <Chip
                    label={article.category}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 18,
                        left: 18,
                        backgroundColor: "#FFFFFF",
                        color: "#1E2D4C",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "1px",
                        borderRadius: 0,
                        px: 0.5,
                    }}
                />
            </Box>

            {/* CONTENT */}
            <CardContent
                sx={{
                    px: 0,
                    pt: 3,
                    pb: 0,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#858585",
                        letterSpacing: "1px",
                        mb: 1.5,
                    }}
                >
                    {article.date}
                </Typography>

                <Typography
                    component="h2"
                    sx={{
                        fontFamily: "var(--font-anton)",
                        fontSize: {
                            xs: "30px",
                            md: "34px",
                        },
                        lineHeight: 0.95,
                        color: "#1E2D4C",
                        mb: 2,
                    }}
                >
                    {article.title}
                </Typography>

                <Typography
                    sx={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "13px",
                        lineHeight: 1.8,
                        color: "#858585",
                        maxWidth: "520px",
                    }}
                >
                    {article.description}
                </Typography>

                <Button
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        mt: 2.5,
                        px: 0,
                        color: "#1E2D4C",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "1px",
                        minWidth: "auto",
                        "&:hover": {
                            backgroundColor: "transparent",
                            color: "#ACBDAA",
                        },
                    }}
                >
                    READ MORE
                </Button>
            </CardContent>
        </Card>
    );
}

export default function JournalPage() {
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: "#FEFAEF",
                minHeight: "100vh",
            }}
        >
            {/* =====================================================
          HERO
      ===================================================== */}
            <Box
                sx={{
                    pt: {
                        xs: 16,
                        md: 20,
                    },
                    pb: {
                        xs: 10,
                        md: 14,
                    },
                    px: 3,
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "3px",
                        color: "#ACBDAA",
                        mb: 3,
                    }}
                >
                    THE CHŌYIFY JOURNAL
                </Typography>

                <Typography
                    component="h1"
                    sx={{
                        fontFamily: "var(--font-anton)",
                        fontSize: {
                            xs: "64px",
                            sm: "90px",
                            md: "120px",
                        },
                        lineHeight: 0.85,
                        color: "#1E2D4C",
                        letterSpacing: "-2px",
                    }}
                >
                    STYLE.
                    <br />
                    STORIES.
                    <br />
                    YOU.
                </Typography>

                <Typography
                    sx={{
                        mt: 4,
                        maxWidth: "600px",
                        mx: "auto",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "14px",
                        lineHeight: 1.9,
                        color: "#858585",
                    }}
                >
                    Fashion inspiration, styling ideas and stories from the world of
                    CHŌYIFY. Discover new ways to express yourself and wear your story.
                </Typography>
            </Box>

            {/* =====================================================
          FEATURED ARTICLE
      ===================================================== */}
            <Box
                sx={{
                    backgroundColor: "#1E2D4C",
                    py: {
                        xs: 8,
                        md: 12,
                    },
                }}
            >
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "1.15fr 0.85fr",
                            },
                            gap: {
                                xs: 5,
                                md: 8,
                            },
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=1600&q=80"
                                alt="CHŌYIFY featured story"
                                sx={{
                                    width: "100%",
                                    display: "block",
                                    aspectRatio: "4 / 3",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontFamily: "var(--font-montserrat)",
                                    fontSize: "11px",
                                    fontWeight: 800,
                                    letterSpacing: "3px",
                                    color: "#ACBDAA",
                                    mb: 3,
                                }}
                            >
                                FEATURED STORY
                            </Typography>

                            <Typography
                                component="h2"
                                sx={{
                                    fontFamily: "var(--font-anton)",
                                    fontSize: {
                                        xs: "52px",
                                        md: "76px",
                                    },
                                    lineHeight: 0.9,
                                    color: "#FFFFFF",
                                    mb: 3,
                                }}
                            >
                                WEAR
                                <br />
                                YOUR
                                <br />
                                STORY.
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily: "var(--font-montserrat)",
                                    fontSize: "14px",
                                    lineHeight: 1.9,
                                    color: "rgba(255,255,255,0.68)",
                                    mb: 4,
                                    maxWidth: "500px",
                                }}
                            >
                                Style isn't about following every trend. It's about finding
                                the pieces that feel like you and making them your own.
                            </Typography>

                            <Button
                                variant="outlined"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    borderColor: "#ACBDAA",
                                    color: "#FFFFFF",
                                    borderRadius: 0,
                                    px: 4,
                                    py: 1.5,
                                    fontFamily: "var(--font-montserrat)",
                                    fontSize: "11px",
                                    fontWeight: 800,
                                    letterSpacing: "1px",
                                    "&:hover": {
                                        borderColor: "#FFFFFF",
                                        backgroundColor: "rgba(255,255,255,0.08)",
                                    },
                                }}
                            >
                                EXPLORE STORY
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* =====================================================
          ARTICLE GRID
      ===================================================== */}
            <Container
                maxWidth="xl"
                sx={{
                    py: {
                        xs: 10,
                        md: 14,
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        gap: 3,
                        mb: 7,
                        flexWrap: "wrap",
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "11px",
                                fontWeight: 800,
                                letterSpacing: "3px",
                                color: "#ACBDAA",
                                mb: 2,
                            }}
                        >
                            FROM THE JOURNAL
                        </Typography>

                        <Typography
                            component="h2"
                            sx={{
                                fontFamily: "var(--font-anton)",
                                fontSize: {
                                    xs: "52px",
                                    md: "72px",
                                },
                                lineHeight: 0.9,
                                color: "#1E2D4C",
                            }}
                        >
                            LATEST STORIES
                        </Typography>
                    </Box>

                    <Button
                        href="/shop"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            color: "#1E2D4C",
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "11px",
                            fontWeight: 800,
                            letterSpacing: "1px",
                            "&:hover": {
                                backgroundColor: "transparent",
                                color: "#ACBDAA",
                            },
                        }}
                    >
                        SHOP THE COLLECTION
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            lg: "repeat(3, 1fr)",
                        },
                        gap: {
                            xs: 6,
                            md: 7,
                        },
                    }}
                >
                    {articles.map((article) => (
                        <ArticleCard
                            key={article.title}
                            article={article}
                        />
                    ))}
                </Box>
            </Container>

            {/* =====================================================
          NEWSLETTER CTA
      ===================================================== */}
            <Box
                sx={{
                    backgroundColor: "#ACBDAA",
                    py: {
                        xs: 9,
                        md: 12,
                    },
                    px: 3,
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "3px",
                        color: "#1E2D4C",
                        mb: 2,
                    }}
                >
                    STAY IN THE LOOP
                </Typography>

                <Typography
                    component="h2"
                    sx={{
                        fontFamily: "var(--font-anton)",
                        fontSize: {
                            xs: "52px",
                            md: "76px",
                        },
                        lineHeight: 0.9,
                        color: "#1E2D4C",
                    }}
                >
                    MORE STYLE.
                    <br />
                    LESS NOISE.
                </Typography>

                <Typography
                    sx={{
                        maxWidth: "500px",
                        mx: "auto",
                        mt: 3,
                        mb: 4,
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "13px",
                        lineHeight: 1.8,
                        color: "rgba(30,45,76,0.72)",
                    }}
                >
                    Get new drops, styling inspiration and CHŌYIFY stories delivered
                    straight to your inbox.
                </Typography>

                <Button
                    href="/contact"
                    variant="contained"
                    sx={{
                        backgroundColor: "#1E2D4C",
                        color: "#FFFFFF",
                        borderRadius: 0,
                        px: 5,
                        py: 1.7,
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "1px",
                        "&:hover": {
                            backgroundColor: "#111111",
                        },
                    }}
                >
                    GET IN TOUCH
                </Button>
            </Box>
        </Box>
    );
}