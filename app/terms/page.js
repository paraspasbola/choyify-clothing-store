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
        title: "ABOUT CHŌYIFY",
        content: (
            <>
                <Typography component="p">
                    CHŌYIFY is an online fashion store offering clothing and accessories
                    through its website.
                </Typography>

                <Typography component="p">
                    By accessing or using the CHŌYIFY website, you agree to comply with
                    these Terms & Conditions. If you do not agree with these terms,
                    please do not use the website.
                </Typography>
            </>
        ),
    },

    {
        number: "02",
        title: "ELIGIBILITY",
        content: (
            <>
                <Typography component="p">
                    You must be legally capable of entering into a binding agreement to
                    use this website and place orders.
                </Typography>

                <Typography component="p">
                    If you are using CHŌYIFY on behalf of another person, you confirm
                    that you have the authority to accept these Terms & Conditions on
                    their behalf.
                </Typography>
            </>
        ),
    },

    {
        number: "03",
        title: "PRODUCT INFORMATION",
        content: (
            <>
                <Typography component="p">
                    We make reasonable efforts to ensure that product descriptions,
                    images, prices, sizes, colours, and other information displayed on
                    CHŌYIFY are accurate.
                </Typography>

                <Typography component="p">
                    However, colours may appear slightly different depending on your
                    device or screen settings. Product availability may also change
                    without prior notice.
                </Typography>

                <Typography component="p">
                    We reserve the right to correct errors, update product information,
                    or discontinue products at any time.
                </Typography>
            </>
        ),
    },

    {
        number: "04",
        title: "PRICES & AVAILABILITY",
        content: (
            <>
                <Typography component="p">
                    All product prices displayed on the website are shown in Indian
                    Rupees (INR), unless otherwise stated.
                </Typography>

                <Typography component="p">
                    Prices, discounts, promotions, and product availability may change
                    without prior notice.
                </Typography>

                <Typography component="p">
                    We reserve the right to correct pricing errors and cancel an order
                    where an obvious pricing or listing error has occurred.
                </Typography>
            </>
        ),
    },

    {
        number: "05",
        title: "ORDERS",
        content: (
            <>
                <Typography component="p">
                    Placing an order on CHŌYIFY does not automatically guarantee that
                    the order will be accepted.
                </Typography>

                <Typography component="p">
                    An order may be cancelled or declined in situations including
                    product unavailability, pricing errors, suspected fraudulent
                    activity, incorrect customer information, or other operational
                    reasons.
                </Typography>

                <Typography component="p">
                    If an order is cancelled after payment has been successfully
                    received, the applicable refund will be processed through the
                    relevant payment method or payment provider.
                </Typography>
            </>
        ),
    },

    {
        number: "06",
        title: "PAYMENTS",
        content: (
            <>
                <Typography component="p">
                    CHŌYIFY may offer multiple payment methods, including online payment
                    options and other methods that may become available.
                </Typography>

                <Typography component="p">
                    Payments may be processed by third-party payment providers. By
                    choosing a payment method, you may also be subject to the terms and
                    policies of that payment provider.
                </Typography>

                <Typography component="p">
                    We do not guarantee that every payment method will always be
                    available.
                </Typography>
            </>
        ),
    },

    {
        number: "07",
        title: "SHIPPING & DELIVERY",
        content: (
            <>
                <Typography component="p">
                    Orders are shipped to the delivery address provided during checkout.
                    Customers are responsible for ensuring that the shipping details
                    provided are accurate and complete.
                </Typography>

                <Typography component="p">
                    Delivery times are estimates and may vary depending on location,
                    courier availability, weather, holidays, operational conditions, or
                    other circumstances outside our control.
                </Typography>

                <Typography component="p">
                    For complete information, please refer to our Shipping & Delivery
                    policy.
                </Typography>
            </>
        ),
    },

    {
        number: "08",
        title: "RETURNS & EXCHANGES",
        content: (
            <>
                <Typography component="p">
                    Returns and exchanges are subject to the conditions described in our
                    Returns & Exchanges policy.
                </Typography>

                <Typography component="p">
                    Products may need to meet specific conditions regarding their
                    original packaging, tags, condition, and eligibility before a return
                    or exchange can be approved.
                </Typography>

                <Typography component="p">
                    Please review our Returns & Exchanges page before requesting a
                    return.
                </Typography>
            </>
        ),
    },

    {
        number: "09",
        title: "USER ACCOUNTS",
        content: (
            <>
                <Typography component="p">
                    If you create an account with CHŌYIFY, you are responsible for
                    keeping your account information accurate and protecting the
                    confidentiality of your login credentials.
                </Typography>

                <Typography component="p">
                    You should notify us if you believe that your account has been
                    accessed without your permission.
                </Typography>

                <Typography component="p">
                    We reserve the right to suspend or terminate accounts where we
                    reasonably believe that the account is being used fraudulently,
                    unlawfully, or in violation of these terms.
                </Typography>
            </>
        ),
    },

    {
        number: "10",
        title: "INTELLECTUAL PROPERTY",
        content: (
            <>
                <Typography component="p">
                    Unless otherwise stated, the CHŌYIFY website and its content,
                    including its branding, logo, text, graphics, photographs, product
                    presentation, design, and other materials, are owned by or licensed
                    to CHŌYIFY.
                </Typography>

                <Typography component="p">
                    You may not reproduce, copy, distribute, modify, publish, sell, or
                    commercially exploit our website content without prior written
                    permission.
                </Typography>
            </>
        ),
    },

    {
        number: "11",
        title: "PROHIBITED USE",
        content: (
            <>
                <Typography component="p">
                    You agree not to use CHŌYIFY for unlawful, fraudulent, abusive, or
                    harmful activities.
                </Typography>

                <Typography component="p">
                    You must not attempt to interfere with the website, gain
                    unauthorised access to systems, introduce malicious software, scrape
                    information in an abusive manner, or interfere with another
                    customer's use of the website.
                </Typography>
            </>
        ),
    },

    {
        number: "12",
        title: "THIRD-PARTY SERVICES",
        content: (
            <>
                <Typography component="p">
                    CHŌYIFY may use third-party services for payments, shipping,
                    analytics, hosting, authentication, communication, and other
                    operational purposes.
                </Typography>

                <Typography component="p">
                    Third-party services may have their own terms and privacy policies.
                    CHŌYIFY is not responsible for policies or practices that are
                    controlled by independent third parties.
                </Typography>
            </>
        ),
    },

    {
        number: "13",
        title: "LIMITATION OF LIABILITY",
        content: (
            <>
                <Typography component="p">
                    We make reasonable efforts to keep the website available and
                    functional, but we do not guarantee that the website will always be
                    uninterrupted, error-free, or available.
                </Typography>

                <Typography component="p">
                    To the extent permitted by applicable law, CHŌYIFY will not be
                    responsible for losses resulting from circumstances beyond our
                    reasonable control, including service interruptions, courier
                    delays, technical failures, or third-party service issues.
                </Typography>
            </>
        ),
    },

    {
        number: "14",
        title: "CHANGES TO THESE TERMS",
        content: (
            <>
                <Typography component="p">
                    We may update these Terms & Conditions from time to time to reflect
                    changes to our website, products, services, business practices, or
                    applicable requirements.
                </Typography>

                <Typography component="p">
                    Updated terms will be published on this page. Your continued use of
                    the website after an update may constitute acceptance of the revised
                    terms, to the extent permitted by applicable law.
                </Typography>
            </>
        ),
    },

    {
        number: "15",
        title: "CONTACT US",
        content: (
            <>
                <Typography component="p">
                    If you have questions about these Terms & Conditions, please contact
                    the CHŌYIFY team.
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

export default function TermsPage() {
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
                    TERMS &
                    <br />
                    CONDITIONS.
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
                    These terms explain the rules and conditions that apply when you use
                    the CHŌYIFY website and purchase products from us.
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
                    NEED HELP?
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
                    HAVE A
                    <br />
                    QUESTION?
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