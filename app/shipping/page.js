"use client";

import {
    Box,
    Container,
    Divider,
    Typography,
} from "@mui/material";

export default function ShippingPage() {
    return (
        <main>
            {/* =====================================================
          HERO
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#FEFAEF",
                    minHeight: { xs: "55vh", md: "62vh" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    px: 3,
                    pt: { xs: 10, md: 12 },
                    pb: { xs: 7, md: 9 },
                }}
            >
                <Box sx={{ maxWidth: 900 }}>
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
                        CHŌYIFY DELIVERY
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
                        SHIPPING
                        <br />

                        <Box
                            component="span"
                            sx={{
                                color: "#ACBDAA",
                            }}
                        >
                            & DELIVERY.
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            maxWidth: 600,
                            mx: "auto",
                            mt: 3,
                            fontFamily: "var(--font-montserrat)",
                            fontSize: {
                                xs: "12px",
                                md: "14px",
                            },
                            lineHeight: 1.8,
                            color: "#858585",
                        }}
                    >
                        Everything you need to know about getting
                        your CHŌYIFY order delivered to your doorstep.
                    </Typography>
                </Box>
            </Box>

            {/* =====================================================
          SHIPPING OVERVIEW
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#FFFFFF",
                    py: { xs: 7, md: 10 },
                }}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        px: { xs: 3, md: 5 },
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "var(--font-anton)",
                            fontSize: {
                                xs: "42px",
                                md: "58px",
                            },
                            lineHeight: 0.95,
                            color: "#1E2D4C",
                            mb: 2,
                        }}
                    >
                        DELIVERY
                        <br />
                        DETAILS.
                    </Typography>

                    <Typography
                        sx={{
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "13px",
                            lineHeight: 1.9,
                            color: "#858585",
                            mb: 5,
                        }}
                    >
                        We want your CHŌYIFY experience to be simple from
                        checkout to delivery. Once your order is confirmed,
                        we'll carefully prepare it and hand it over to our
                        delivery partner.
                    </Typography>

                    <ShippingSection
                        number="01"
                        title="WHERE WE DELIVER"
                    >
                        CHŌYIFY currently delivers across India. During
                        checkout, enter your complete delivery address and
                        pincode so we can verify service availability for
                        your location.
                    </ShippingSection>

                    <ShippingSection
                        number="02"
                        title="PROCESSING TIME"
                    >
                        Orders are generally processed after payment and
                        order confirmation. Processing may take
                        approximately 1–3 business days before your package
                        is handed over to the delivery partner.
                    </ShippingSection>

                    <ShippingSection
                        number="03"
                        title="DELIVERY TIME"
                    >
                        Once dispatched, delivery usually takes around
                        3–7 business days depending on your location,
                        courier availability and other operational
                        circumstances.
                    </ShippingSection>

                    <ShippingSection
                        number="04"
                        title="SHIPPING CHARGES"
                    >
                        Applicable shipping charges, if any, will be
                        displayed during checkout before you complete your
                        purchase.
                    </ShippingSection>

                    <ShippingSection
                        number="05"
                        title="ORDER TRACKING"
                    >
                        Once your order has been dispatched, tracking
                        information can be provided through your order
                        details or the communication associated with your
                        purchase.
                    </ShippingSection>

                    <ShippingSection
                        number="06"
                        title="DELIVERY DELAYS"
                    >
                        Delivery times may occasionally be affected by
                        weather, public holidays, courier disruptions,
                        incorrect address information or other unforeseen
                        circumstances.
                    </ShippingSection>
                </Container>
            </Box>

            {/* =====================================================
          IMPORTANT NOTE
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#F4F1EC",
                    py: { xs: 6, md: 8 },
                }}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        px: { xs: 3, md: 5 },
                    }}
                >
                    <Box
                        sx={{
                            borderLeft: "4px solid #ACBDAA",
                            pl: { xs: 2.5, md: 4 },
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "10px",
                                fontWeight: 800,
                                letterSpacing: "0.14em",
                                color: "#1E2D4C",
                                mb: 1.5,
                            }}
                        >
                            IMPORTANT
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: {
                                    xs: "12px",
                                    md: "13px",
                                },
                                lineHeight: 1.8,
                                color: "#858585",
                            }}
                        >
                            Please make sure your delivery address,
                            phone number and pincode are correct before
                            placing your order. CHŌYIFY cannot be
                            responsible for delays caused by incorrect or
                            incomplete address information.
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* =====================================================
          NEED HELP
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
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.16em",
                        color: "#1E2D4C",
                        mb: 1.5,
                    }}
                >
                    NEED HELP?
                </Typography>

                <Typography
                    sx={{
                        fontFamily: "var(--font-anton)",
                        fontSize: {
                            xs: "42px",
                            md: "62px",
                        },
                        lineHeight: 0.95,
                        color: "#1E2D4C",
                    }}
                >
                    WE'RE HERE FOR YOU.
                </Typography>

                <Box
                    component="a"
                    href="/contact"
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 3,
                        minHeight: 50,
                        px: 4,
                        borderRadius: "12px",
                        backgroundColor: "#1E2D4C",
                        color: "#FFFFFF",
                        textDecoration: "none",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        transition: "all 0.25s ease",
                        "&:hover": {
                            backgroundColor: "#FFFFFF",
                            color: "#1E2D4C",
                            transform: "translateY(-2px)",
                        },
                    }}
                >
                    CONTACT US
                </Box>
            </Box>
        </main>
    );
}

/* =========================================================
   SHIPPING SECTION
========================================================= */

function ShippingSection({
    number,
    title,
    children,
}) {
    return (
        <Box sx={{ mb: 4.5 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 2,
                    mb: 1.2,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "10px",
                        fontWeight: 800,
                        color: "#ACBDAA",
                        letterSpacing: "0.08em",
                    }}
                >
                    {number}
                </Typography>

                <Typography
                    sx={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "12px",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        color: "#1E2D4C",
                    }}
                >
                    {title}
                </Typography>
            </Box>

            <Typography
                sx={{
                    pl: { xs: 0, sm: "30px" },
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "12px",
                    lineHeight: 1.9,
                    color: "#858585",
                }}
            >
                {children}
            </Typography>

            <Divider
                sx={{
                    mt: 4,
                    borderColor: "rgba(30,45,76,0.08)",
                }}
            />
        </Box>
    );
}