"use client";

import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function ContactPage() {
    return (
        <main>
            {/* =====================================================
          HERO
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    minHeight: { xs: "55vh", md: "65vh" },
                    backgroundColor: "#FEFAEF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 3,
                    pt: { xs: 10, md: 12 },
                    pb: { xs: 7, md: 9 },
                }}
            >
                <Box sx={{ maxWidth: 850 }}>
                    <Typography
                        sx={{
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "11px",
                            fontWeight: 800,
                            letterSpacing: "0.18em",
                            color: "#858585",
                            mb: 2,
                        }}
                    >
                        GET IN TOUCH
                    </Typography>

                    <Typography
                        component="h1"
                        sx={{
                            fontFamily: "var(--font-anton)",
                            fontSize: {
                                xs: "58px",
                                sm: "78px",
                                md: "105px",
                            },
                            lineHeight: 0.88,
                            color: "#1E2D4C",
                            letterSpacing: "-1px",
                        }}
                    >
                        CONTACT
                        <br />
                        <Box
                            component="span"
                            sx={{
                                color: "#ACBDAA",
                            }}
                        >
                            CHŌYIFY.
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            maxWidth: 580,
                            mx: "auto",
                            mt: 3,
                            fontFamily: "var(--font-montserrat)",
                            fontSize: { xs: "12px", md: "14px" },
                            lineHeight: 1.8,
                            color: "#858585",
                        }}
                    >
                        Have a question about your order, our collections,
                        returns, or anything CHŌYIFY? We'd love to hear
                        from you.
                    </Typography>
                </Box>
            </Box>

            {/* =====================================================
          CONTACT CONTENT
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#FFFFFF",
                    py: { xs: 7, md: 10 },
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        px: { xs: 3, md: 5 },
                    }}
                >
                    <Grid
                        container
                        spacing={{ xs: 5, md: 8 }}
                    >
                        {/* LEFT SIDE */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Typography
                                sx={{
                                    fontFamily: "var(--font-anton)",
                                    fontSize: {
                                        xs: "42px",
                                        md: "58px",
                                    },
                                    lineHeight: 0.95,
                                    color: "#1E2D4C",
                                }}
                            >
                                LET'S TALK
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 2,
                                    maxWidth: 420,
                                    fontFamily: "var(--font-montserrat)",
                                    fontSize: "13px",
                                    lineHeight: 1.8,
                                    color: "#858585",
                                }}
                            >
                                Whether you need help with an order or simply
                                want to say hello, our team is here to help.
                            </Typography>

                            {/* CONTACT CARDS */}
                            <Box sx={{ mt: 4 }}>
                                <ContactCard
                                    icon={<EmailOutlinedIcon />}
                                    title="EMAIL"
                                    value="hello@choyify.in"
                                    href="mailto:hello@choyify.in"
                                />

                                <ContactCard
                                    icon={<WhatsAppIcon />}
                                    title="WHATSAPP"
                                    value="Chat with us"
                                    href="https://wa.me/"
                                    external
                                />

                                <ContactCard
                                    icon={<InstagramIcon />}
                                    title="INSTAGRAM"
                                    value="@choyify.in"
                                    href="https://instagram.com/"
                                    external
                                />
                            </Box>

                            {/* RESPONSE TIME */}
                            <Box
                                sx={{
                                    mt: 4,
                                    p: 3,
                                    backgroundColor: "#F4F1EC",
                                    borderRadius: "18px",
                                    borderLeft: "4px solid #ACBDAA",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "var(--font-montserrat)",
                                        fontSize: "10px",
                                        fontWeight: 800,
                                        letterSpacing: "0.12em",
                                        color: "#1E2D4C",
                                        mb: 1,
                                    }}
                                >
                                    RESPONSE TIME
                                </Typography>

                                <Typography
                                    sx={{
                                        fontFamily: "var(--font-montserrat)",
                                        fontSize: "12px",
                                        lineHeight: 1.7,
                                        color: "#858585",
                                    }}
                                >
                                    Our team usually responds within
                                    24–48 business hours.
                                </Typography>
                            </Box>
                        </Grid>

                        {/* RIGHT SIDE — FORM */}
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 3, sm: 4, md: 5 },
                                    borderRadius: "24px",
                                    backgroundColor: "#FEFAEF",
                                    border: "1px solid rgba(30,45,76,0.08)",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "var(--font-montserrat)",
                                        fontSize: "11px",
                                        fontWeight: 800,
                                        letterSpacing: "0.14em",
                                        color: "#ACBDAA",
                                        mb: 1,
                                    }}
                                >
                                    SEND A MESSAGE
                                </Typography>

                                <Typography
                                    sx={{
                                        fontFamily: "var(--font-anton)",
                                        fontSize: {
                                            xs: "38px",
                                            md: "50px",
                                        },
                                        lineHeight: 0.95,
                                        color: "#1E2D4C",
                                        mb: 3,
                                    }}
                                >
                                    HOW CAN WE HELP?
                                </Typography>

                                <Box
                                    component="form"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        alert(
                                            "Thank you for contacting CHŌYIFY. We'll get back to you soon."
                                        );
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        {/* NAME */}
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                required
                                                label="Full name"
                                                placeholder="Your name"
                                                sx={fieldStyles}
                                            />
                                        </Grid>

                                        {/* EMAIL */}
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                fullWidth
                                                required
                                                type="email"
                                                label="Email address"
                                                placeholder="you@example.com"
                                                sx={fieldStyles}
                                            />
                                        </Grid>

                                        {/* ORDER NUMBER */}
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Order number"
                                                placeholder="Optional"
                                                sx={fieldStyles}
                                            />
                                        </Grid>

                                        {/* SUBJECT */}
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                required
                                                label="Subject"
                                                placeholder="How can we help?"
                                                sx={fieldStyles}
                                            />
                                        </Grid>

                                        {/* MESSAGE */}
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                required
                                                multiline
                                                rows={6}
                                                label="Message"
                                                placeholder="Write your message..."
                                                sx={fieldStyles}
                                            />
                                        </Grid>

                                        {/* BUTTON */}
                                        <Grid size={{ xs: 12 }}>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                sx={{
                                                    minHeight: 56,
                                                    borderRadius: "14px",
                                                    backgroundColor: "#1E2D4C",
                                                    color: "#FFFFFF",
                                                    fontFamily:
                                                        "var(--font-montserrat)",
                                                    fontSize: "11px",
                                                    fontWeight: 800,
                                                    letterSpacing: "0.12em",
                                                    textTransform: "uppercase",
                                                    "&:hover": {
                                                        backgroundColor: "#ACBDAA",
                                                        color: "#1E2D4C",
                                                    },
                                                }}
                                            >
                                                SEND MESSAGE
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#ACBDAA",
                    py: { xs: 6, md: 8 },
                    px: 3,
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "var(--font-anton)",
                        fontSize: {
                            xs: "42px",
                            md: "64px",
                        },
                        lineHeight: 0.95,
                        color: "#1E2D4C",
                    }}
                >
                    READY TO FIND YOUR STYLE?
                </Typography>

                <Button
                    component="a"
                    href="/shop"
                    sx={{
                        mt: 3,
                        px: 4,
                        minHeight: 50,
                        borderRadius: "12px",
                        backgroundColor: "#1E2D4C",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        "&:hover": {
                            backgroundColor: "#FFFFFF",
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
   CONTACT CARD
========================================================= */

function ContactCard({
    icon,
    title,
    value,
    href,
    external = false,
}) {
    return (
        <Box
            component="a"
            href={href}
            target={external ? "_blank" : undefined}
            rel={
                external
                    ? "noopener noreferrer"
                    : undefined
            }
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                textDecoration: "none",
                mb: 2,
                p: 2,
                borderRadius: "14px",
                transition: "all 0.25s ease",
                "&:hover": {
                    backgroundColor: "#F4F1EC",
                    transform: "translateX(4px)",
                },
            }}
        >
            <Box
                sx={{
                    width: 46,
                    height: 46,
                    flexShrink: 0,
                    borderRadius: "12px",
                    backgroundColor: "#ACBDAA",
                    color: "#1E2D4C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {icon}
            </Box>

            <Box>
                <Typography
                    sx={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "9px",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        color: "#858585",
                        mb: 0.4,
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    sx={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#1E2D4C",
                    }}
                >
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}

/* =========================================================
   TEXT FIELD STYLES
========================================================= */

const fieldStyles = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        backgroundColor: "#FFFFFF",
        fontFamily: "var(--font-montserrat)",
        fontSize: "12px",

        "& fieldset": {
            borderColor: "rgba(30,45,76,0.12)",
        },

        "&:hover fieldset": {
            borderColor: "#ACBDAA",
        },

        "&.Mui-focused fieldset": {
            borderColor: "#1E2D4C",
            borderWidth: "1px",
        },
    },

    "& .MuiInputLabel-root": {
        fontFamily: "var(--font-montserrat)",
        fontSize: "12px",
        color: "#858585",
    },

    "& .MuiInputLabel-root.Mui-focused": {
        color: "#1E2D4C",
    },
};