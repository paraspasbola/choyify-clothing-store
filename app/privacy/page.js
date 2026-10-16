"use client";

import {
    Box,
    Container,
    Typography,
    Button,
    Divider,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const sections = [
    {
        number: "01",
        title: "INFORMATION WE COLLECT",
        content: (
            <>
                <Typography component="p">
                    When you visit CHŌYIFY, create an account, place an order, or contact
                    us, we may collect information that you provide directly to us.
                </Typography>

                <Typography component="p">
                    This may include your name, email address, phone number, shipping
                    address, billing information, order details, and information you
                    provide when contacting our support team.
                </Typography>

                <Typography component="p">
                    We may also collect basic technical information such as your browser,
                    device type, IP address, and how you interact with our website.
                </Typography>
            </>
        ),
    },

    {
        number: "02",
        title: "HOW WE USE YOUR INFORMATION",
        content: (
            <>
                <Typography component="p">
                    We use the information we collect to provide and improve our
                    services, process orders, communicate with you, and provide customer
                    support.
                </Typography>

                <Typography component="p">
                    Your information may also be used to send important updates about
                    your orders, account, products, services, or changes to our policies.
                </Typography>

                <Typography component="p">
                    Where permitted by law and with the appropriate consent, we may also
                    use your information to send promotional communications and updates
                    about CHŌYIFY.
                </Typography>
            </>
        ),
    },

    {
        number: "03",
        title: "ORDERS & PAYMENTS",
        content: (
            <>
                <Typography component="p">
                    When you place an order, certain information is required to process
                    and deliver your purchase.
                </Typography>

                <Typography component="p">
                    Payment information may be processed through our third-party payment
                    providers. CHŌYIFY does not need to store your complete card or
                    banking credentials on our own systems when those details are handled
                    by the payment provider.
                </Typography>

                <Typography component="p">
                    Payment providers may have their own privacy policies and terms that
                    apply to information processed through their services.
                </Typography>
            </>
        ),
    },

    {
        number: "04",
        title: "COOKIES & TECHNOLOGIES",
        content: (
            <>
                <Typography component="p">
                    CHŌYIFY may use cookies and similar technologies to keep the website
                    functioning correctly and understand how visitors use our website.
                </Typography>

                <Typography component="p">
                    Cookies may help us remember preferences, maintain sessions, improve
                    website performance, and understand which areas of the website are
                    useful to our customers.
                </Typography>
            </>
        ),
    },

    {
        number: "05",
        title: "SHARING INFORMATION",
        content: (
            <>
                <Typography component="p">
                    We do not sell your personal information as a business practice.
                </Typography>

                <Typography component="p">
                    We may share necessary information with trusted service providers
                    that help us operate CHŌYIFY, such as payment processors, shipping
                    partners, hosting providers, analytics services, and customer-support
                    tools.
                </Typography>

                <Typography component="p">
                    These providers receive only the information reasonably necessary to
                    perform the services they provide to us.
                </Typography>
            </>
        ),
    },

    {
        number: "06",
        title: "DATA SECURITY",
        content: (
            <>
                <Typography component="p">
                    We take reasonable measures to protect the information associated
                    with your account and orders.
                </Typography>

                <Typography component="p">
                    However, no method of transmitting or storing information online can
                    be guaranteed to be completely secure.
                </Typography>

                <Typography component="p">
                    We continuously work to improve the security of our systems and
                    protect customer information from unauthorized access.
                </Typography>
            </>
        ),
    },

    {
        number: "07",
        title: "YOUR RIGHTS",
        content: (
            <>
                <Typography component="p">
                    Depending on applicable law, you may have rights relating to your
                    personal information, including requesting access, correction, or
                    deletion of certain information.
                </Typography>

                <Typography component="p">
                    You may also contact us if you have questions about how your
                    information is being used or wish to update information associated
                    with your account.
                </Typography>
            </>
        ),
    },

    {
        number: "08",
        title: "THIRD-PARTY LINKS",
        content: (
            <>
                <Typography component="p">
                    Our website may contain links to third-party websites, services, or
                    social media platforms.
                </Typography>

                <Typography component="p">
                    CHŌYIFY is not responsible for the privacy practices or content of
                    those third-party services. We recommend reviewing their privacy
                    policies before providing personal information.
                </Typography>
            </>
        ),
    },

    {
        number: "09",
        title: "CHANGES TO THIS POLICY",
        content: (
            <>
                <Typography component="p">
                    We may update this Privacy Policy from time to time to reflect
                    changes to our services, technology, or legal requirements.
                </Typography>

                <Typography component="p">
                    When changes are made, the updated version will be published on this
                    page with the revised effective date.
                </Typography>
            </>
        ),
    },

    {
        number: "10",
        title: "CONTACT US",
        content: (
            <>
                <Typography component="p">
                    If you have questions about this Privacy Policy or how CHŌYIFY
                    handles your information, please contact us.
                </Typography>

                <Typography
                    component="a"
                    href="mailto:hello@choyify.in"
                    sx={{
                        color: "#1E2D4C",
                        fontWeight: 800,
                        textDecoration: "none",
                        "&:hover": {
                            color: "#ACBDAA",
                        },
                    }}
                >
                    hello@choyify.in
                </Typography>
            </>
        ),
    },
];

export default function PrivacyPage() {
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
                    CHŌYIFY
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
                    PRIVACY
                    <br />
                    POLICY.
                </Typography>

                <Typography
                    sx={{
                        mt: 4,
                        maxWidth: "620px",
                        mx: "auto",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "13px",
                        lineHeight: 1.9,
                        color: "#858585",
                    }}
                >
                    Your privacy matters to us. This page explains what information
                    CHŌYIFY may collect, how we use it, and how we work to protect it.
                </Typography>

                <Typography
                    sx={{
                        mt: 3,
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                        color: "#858585",
                    }}
                >
                    EFFECTIVE DATE: OCTOBER 2026
                </Typography>
            </Box>

            {/* =====================================================
          CONTENT
      ===================================================== */}

            <Container
                maxWidth="md"
                sx={{
                    pb: {
                        xs: 10,
                        md: 15,
                    },
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#FFFFFF",
                        p: {
                            xs: 3,
                            sm: 5,
                            md: 7,
                        },
                    }}
                >
                    {sections.map((section, index) => (
                        <Box key={section.number}>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        sm: "80px 1fr",
                                    },
                                    gap: {
                                        xs: 2,
                                        sm: 4,
                                    },
                                }}
                            >
                                {/* NUMBER */}

                                <Typography
                                    sx={{
                                        fontFamily: "var(--font-anton)",
                                        fontSize: "34px",
                                        lineHeight: 1,
                                        color: "#ACBDAA",
                                    }}
                                >
                                    {section.number}
                                </Typography>

                                {/* CONTENT */}

                                <Box>
                                    <Typography
                                        component="h2"
                                        sx={{
                                            fontFamily: "var(--font-anton)",
                                            fontSize: {
                                                xs: "30px",
                                                md: "38px",
                                            },
                                            lineHeight: 0.95,
                                            color: "#1E2D4C",
                                            mb: 3,
                                        }}
                                    >
                                        {section.title}
                                    </Typography>

                                    <Box
                                        sx={{
                                            "& p": {
                                                fontFamily: "var(--font-montserrat)",
                                                fontSize: "13px",
                                                lineHeight: 1.9,
                                                color: "#666666",
                                                mb: 2,
                                            },
                                        }}
                                    >
                                        {section.content}
                                    </Box>
                                </Box>
                            </Box>

                            {index !== sections.length - 1 && (
                                <Divider
                                    sx={{
                                        my: {
                                            xs: 5,
                                            md: 7,
                                        },
                                        borderColor: "#EAE7DD",
                                    }}
                                />
                            )}
                        </Box>
                    ))}
                </Box>
            </Container>

            {/* =====================================================
          CTA
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
                    HAVE A QUESTION?
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
                    WE'RE HERE
                    <br />
                    TO HELP.
                </Typography>

                <Button
                    href="/contact"
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        mt: 4,
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
                    CONTACT US
                </Button>
            </Box>
        </Box>
    );
}