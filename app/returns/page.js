"use client";

import {
    Box,
    Container,
    Divider,
    Typography,
} from "@mui/material";

export default function ReturnsPage() {
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
                        CHŌYIFY CUSTOMER CARE
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
                        RETURNS
                        <br />

                        <Box
                            component="span"
                            sx={{
                                color: "#ACBDAA",
                            }}
                        >
                            & EXCHANGES.
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
                        Changed your mind or received something that
                        isn't quite right? Here's how our return and
                        exchange process works.
                    </Typography>
                </Box>
            </Box>

            {/* =====================================================
          RETURN OVERVIEW
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
                        SIMPLE
                        <br />
                        RETURNS.
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
                        We want you to feel confident when shopping with
                        CHŌYIFY. If your purchase doesn't work out, our
                        return and exchange process is designed to be
                        straightforward.
                    </Typography>

                    <ReturnSection
                        number="01"
                        title="RETURN WINDOW"
                    >
                        Eligible products may be requested for return
                        within the return period specified for your order.
                        Please check the final CHŌYIFY return policy before
                        submitting a request.
                    </ReturnSection>

                    <ReturnSection
                        number="02"
                        title="PRODUCT CONDITION"
                    >
                        Items should be returned unused, unworn and in
                        their original condition, with original tags,
                        packaging and accessories intact where applicable.
                    </ReturnSection>

                    <ReturnSection
                        number="03"
                        title="HOW TO REQUEST A RETURN"
                    >
                        Contact CHŌYIFY with your order number and the
                        reason for your return. Our team will guide you
                        through the next steps and provide the applicable
                        return instructions.
                    </ReturnSection>

                    <ReturnSection
                        number="04"
                        title="EXCHANGES"
                    >
                        Exchanges may be available for eligible products
                        depending on size availability and stock. If the
                        requested replacement is unavailable, an
                        alternative resolution may be offered.
                    </ReturnSection>

                    <ReturnSection
                        number="05"
                        title="REFUNDS"
                    >
                        Once an approved return has been received and
                        inspected, the applicable refund will be processed
                        according to the payment method and refund policy
                        associated with the order.
                    </ReturnSection>

                    <ReturnSection
                        number="06"
                        title="DAMAGED OR INCORRECT ITEMS"
                    >
                        If your order arrives damaged, defective or
                        contains an incorrect item, please contact us as
                        soon as possible with your order details and clear
                        photographs of the issue.
                    </ReturnSection>
                </Container>
            </Box>

            {/* =====================================================
          RETURN CHECKLIST
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#F4F1EC",
                    py: { xs: 7, md: 9 },
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
                                xs: "40px",
                                md: "55px",
                            },
                            lineHeight: 0.95,
                            color: "#1E2D4C",
                            mb: 3,
                        }}
                    >
                        BEFORE YOU
                        <br />
                        RETURN.
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gap: 1.5,
                        }}
                    >
                        <ChecklistItem>
                            Keep the original product tags attached.
                        </ChecklistItem>

                        <ChecklistItem>
                            Keep the original packaging wherever possible.
                        </ChecklistItem>

                        <ChecklistItem>
                            Make sure the item has not been worn or washed.
                        </ChecklistItem>

                        <ChecklistItem>
                            Keep your order number ready.
                        </ChecklistItem>

                        <ChecklistItem>
                            Photograph any damage or incorrect item received.
                        </ChecklistItem>
                    </Box>
                </Container>
            </Box>

            {/* =====================================================
          IMPORTANT NOTE
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#FFFFFF",
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
                            PLEASE NOTE
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
                            Return eligibility, timelines, exclusions,
                            shipping charges and refund conditions may vary
                            by product and order. The final CHŌYIFY return
                            policy displayed at the time of purchase will
                            apply to your order.
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* =====================================================
          CONTACT CTA
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
                    NEED HELP WITH A RETURN?
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
                    TALK TO OUR TEAM.
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
   RETURN SECTION
========================================================= */

function ReturnSection({
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

/* =========================================================
   CHECKLIST ITEM
========================================================= */

function ChecklistItem({ children }) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                p: 2,
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
            }}
        >
            <Box
                sx={{
                    width: 8,
                    height: 8,
                    mt: "5px",
                    flexShrink: 0,
                    borderRadius: "50%",
                    backgroundColor: "#ACBDAA",
                }}
            />

            <Typography
                sx={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "12px",
                    lineHeight: 1.7,
                    color: "#858585",
                }}
            >
                {children}
            </Typography>
        </Box>
    );
}