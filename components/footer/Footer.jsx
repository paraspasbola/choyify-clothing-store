"use client";

import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Link,
    Typography,
} from "@mui/material";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#1E2D4C",
                color: "#FFFFFF",
                mt: 0,
            }}
        >
            {/* MAIN FOOTER */}
            <Container
                maxWidth="xl"
                sx={{
                    py: { xs: 6, md: 9 },
                    px: { xs: 3, md: 6 },
                }}
            >
                <Grid
                    container
                    spacing={{ xs: 5, md: 4 }}
                >
                    {/* BRAND */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ maxWidth: 360 }}>
                            <Typography
                                component="a"
                                href="/"
                                sx={{
                                    display: "inline-block",
                                    color: "#FFFFFF",
                                    textDecoration: "none",
                                    fontFamily: "var(--font-montserrat)",
                                    fontSize: { xs: "27px", md: "32px" },
                                    fontWeight: 800,
                                    letterSpacing: "0.12em",
                                }}
                            >
                                CHŌYIFY
                            </Typography>

                            <Box
                                sx={{
                                    width: 45,
                                    height: 3,
                                    backgroundColor: "#ACBDAA",
                                    borderRadius: "10px",
                                    mt: 1.5,
                                    mb: 2.5,
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.68)",
                                    fontFamily: "var(--font-montserrat)",
                                    fontSize: "13px",
                                    lineHeight: 1.8,
                                    maxWidth: 320,
                                }}
                            >
                                Contemporary fashion for people who
                                believe what you wear should tell your
                                story.
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 2,
                                    color: "#ACBDAA",
                                    fontFamily: "var(--font-montserrat)",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "0.12em",
                                }}
                            >
                                WEAR YOUR STORY.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* SHOP */}
                    <Grid size={{ xs: 6, sm: 4, md: 2 }}>
                        <FooterHeading title="SHOP" />

                        <FooterLink href="/shop">
                            New In
                        </FooterLink>

                        <FooterLink href="/women">
                            Women
                        </FooterLink>

                        <FooterLink href="/men">
                            Men
                        </FooterLink>

                        <FooterLink href="/accessories">
                            Accessories
                        </FooterLink>

                        <FooterLink href="/sale">
                            Sale
                        </FooterLink>
                    </Grid>

                    {/* HELP */}
                    <Grid size={{ xs: 6, sm: 4, md: 2 }}>
                        <FooterHeading title="HELP" />

                        <FooterLink href="/contact">
                            Contact Us
                        </FooterLink>

                        <FooterLink href="/shipping">
                            Shipping
                        </FooterLink>

                        <FooterLink href="/returns">
                            Returns
                        </FooterLink>

                        <FooterLink href="/faq">
                            FAQ
                        </FooterLink>

                        <FooterLink href="/account">
                            My Account
                        </FooterLink>
                    </Grid>

                    {/* ABOUT */}
                    <Grid size={{ xs: 12, sm: 4, md: 2 }}>
                        <FooterHeading title="ABOUT" />

                        <FooterLink href="/about">
                            Our Story
                        </FooterLink>

                        <FooterLink href="/journal">
                            Journal
                        </FooterLink>

                        <FooterLink
                            href="https://instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </FooterLink>

                        <FooterLink
                            href="https://wa.me/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            WhatsApp
                        </FooterLink>
                    </Grid>

                    {/* NEWSLETTER */}
                    <Grid size={{ xs: 12, md: 2 }}>
                        <FooterHeading title="STAY IN THE LOOP" />

                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.68)",
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "11px",
                                lineHeight: 1.7,
                                mb: 2,
                            }}
                        >
                            Get updates about new drops,
                            collections and CHŌYIFY stories.
                        </Typography>

                        <Button
                            component="a"
                            href="/account"
                            fullWidth
                            sx={{
                                minHeight: 45,
                                borderRadius: "10px",
                                backgroundColor: "#ACBDAA",
                                color: "#1E2D4C",
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "10px",
                                fontWeight: 800,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                "&:hover": {
                                    backgroundColor: "#FFFFFF",
                                },
                            }}
                        >
                            Join CHŌYIFY
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            {/* BOTTOM */}
            <Divider
                sx={{
                    borderColor: "rgba(255,255,255,0.12)",
                }}
            />

            <Container
                maxWidth="xl"
                sx={{
                    px: { xs: 3, md: 6 },
                }}
            >
                <Box
                    sx={{
                        minHeight: 75,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        py: 2,
                    }}
                >
                    <Typography
                        sx={{
                            color: "rgba(255,255,255,0.55)",
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "10px",
                            textAlign: {
                                xs: "center",
                                sm: "left",
                            },
                        }}
                    >
                        © {currentYear} CHŌYIFY.IN. All rights reserved.
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2.5,
                            flexWrap: "wrap",
                            justifyContent: {
                                xs: "center",
                                sm: "flex-end",
                            },
                        }}
                    >
                        <FooterBottomLink href="/privacy">
                            Privacy Policy
                        </FooterBottomLink>

                        <FooterBottomLink href="/terms">
                            Terms & Conditions
                        </FooterBottomLink>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

/* FOOTER HEADING */

function FooterHeading({ title }) {
    return (
        <Typography
            sx={{
                color: "#ACBDAA",
                fontFamily: "var(--font-montserrat)",
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.14em",
                mb: 2.2,
            }}
        >
            {title}
        </Typography>
    );
}

/* FOOTER LINK */

function FooterLink({
    children,
    href,
    target,
    rel,
}) {
    return (
        <Link
            href={href}
            target={target}
            rel={rel}
            underline="none"
            sx={{
                display: "block",
                width: "fit-content",
                mb: 1.2,
                color: "rgba(255,255,255,0.68)",
                fontFamily: "var(--font-montserrat)",
                fontSize: "11px",
                transition: "all 0.2s ease",
                "&:hover": {
                    color: "#FFFFFF",
                    transform: "translateX(3px)",
                },
            }}
        >
            {children}
        </Link>
    );
}

/* BOTTOM LINKS */

function FooterBottomLink({ children, href }) {
    return (
        <Link
            href={href}
            underline="none"
            sx={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-montserrat)",
                fontSize: "9px",
                "&:hover": {
                    color: "#ACBDAA",
                },
            }}
        >
            {children}
        </Link>
    );
}