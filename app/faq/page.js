"use client";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

const faqGroups = [
    {
        title: "ORDERS",
        questions: [
            {
                question: "How do I place an order?",
                answer:
                    "Browse the CHŌYIFY collection, select the product you want, choose the available size or variant, and add it to your bag. Once you're ready, proceed to checkout and complete your order.",
            },
            {
                question: "Can I change my order after placing it?",
                answer:
                    "Order changes depend on whether your order has already been processed or dispatched. Contact our team as soon as possible with your order number if you need to make a change.",
            },
            {
                question: "How can I check my order status?",
                answer:
                    "Once real order tracking is connected to your CHŌYIFY account, you will be able to view your order status from your account area. You can also contact our support team with your order number.",
            },
        ],
    },

    {
        title: "PAYMENTS",
        questions: [
            {
                question: "What payment methods do you accept?",
                answer:
                    "CHŌYIFY will support the payment methods made available during checkout, including the payment options supported by our payment gateway.",
            },
            {
                question: "Is online payment secure?",
                answer:
                    "Payments will be processed through our secure payment gateway. CHŌYIFY does not store your complete card details on our website.",
            },
            {
                question: "Will I receive an order confirmation?",
                answer:
                    "Yes. After your order is successfully placed, you will receive an order confirmation through the contact details associated with your purchase.",
            },
        ],
    },

    {
        title: "SHIPPING",
        questions: [
            {
                question: "How long will my order take to arrive?",
                answer:
                    "Delivery times can vary depending on your location and courier availability. Please visit our Shipping & Delivery page for the current estimated processing and delivery timelines.",
            },
            {
                question: "Do you deliver across India?",
                answer:
                    "CHŌYIFY is planned to offer delivery across India, subject to serviceability for the delivery address entered during checkout.",
            },
            {
                question: "How can I track my package?",
                answer:
                    "Once tracking is connected to your order system, tracking information will be available through your order details. You may also receive tracking information through your registered contact details.",
            },
        ],
    },

    {
        title: "RETURNS & EXCHANGES",
        questions: [
            {
                question: "Can I return an item?",
                answer:
                    "Eligible products may be returned according to the CHŌYIFY return policy. Please review our Returns & Exchanges page for the applicable conditions.",
            },
            {
                question: "Can I exchange an item for another size?",
                answer:
                    "Size exchanges may be available for eligible products depending on stock availability. Contact CHŌYIFY support with your order number for assistance.",
            },
            {
                question: "What if I receive a damaged item?",
                answer:
                    "If your order arrives damaged or contains an incorrect item, contact our support team as soon as possible with your order number and clear photographs showing the issue.",
            },
        ],
    },

    {
        title: "ACCOUNT",
        questions: [
            {
                question: "Do I need an account to shop?",
                answer:
                    "You may be able to browse the CHŌYIFY store without an account. Creating an account will make it easier to manage your profile, wishlist, orders and other customer features.",
            },
            {
                question: "How do I create a CHŌYIFY account?",
                answer:
                    "Visit the Account page and choose the create-account option. Enter the requested details and complete the registration process.",
            },
            {
                question: "What should I do if I forget my password?",
                answer:
                    "Once real authentication is connected, you will be able to use the password recovery option on the Account page to reset your password securely.",
            },
        ],
    },
];

export default function FAQPage() {
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
                        NEED SOME ANSWERS?
                    </Typography>

                    <Typography
                        component="h1"
                        sx={{
                            fontFamily: "var(--font-anton)",
                            fontSize: {
                                xs: "62px",
                                sm: "82px",
                                md: "110px",
                            },
                            lineHeight: 0.88,
                            color: "#1E2D4C",
                            letterSpacing: "-1px",
                        }}
                    >
                        FREQUENTLY
                        <br />

                        <Box
                            component="span"
                            sx={{
                                color: "#ACBDAA",
                            }}
                        >
                            ASKED.
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
                        Find quick answers to some of the most common
                        questions about shopping with CHŌYIFY.
                    </Typography>
                </Box>
            </Box>

            {/* =====================================================
          FAQ CONTENT
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
                    {faqGroups.map((group) => (
                        <Box
                            key={group.title}
                            sx={{
                                mb: { xs: 6, md: 8 },
                            }}
                        >
                            {/* GROUP TITLE */}

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
                                {group.title}
                            </Typography>

                            {/* QUESTIONS */}

                            {group.questions.map((item) => (
                                <Accordion
                                    key={item.question}
                                    disableGutters
                                    elevation={0}
                                    sx={{
                                        backgroundColor: "transparent",
                                        borderTop:
                                            "1px solid rgba(30,45,76,0.12)",

                                        "&:last-child": {
                                            borderBottom:
                                                "1px solid rgba(30,45,76,0.12)",
                                        },

                                        "&::before": {
                                            display: "none",
                                        },
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={
                                            <AddIcon
                                                sx={{
                                                    color: "#1E2D4C",
                                                    fontSize: 20,
                                                }}
                                            />
                                        }
                                        sx={{
                                            minHeight: 70,
                                            px: 0,

                                            "& .MuiAccordionSummary-content": {
                                                margin: 0,
                                            },

                                            "&.Mui-expanded": {
                                                minHeight: 70,
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily:
                                                    "var(--font-montserrat)",
                                                fontSize: {
                                                    xs: "12px",
                                                    md: "13px",
                                                },
                                                fontWeight: 700,
                                                color: "#1E2D4C",
                                                pr: 2,
                                            }}
                                        >
                                            {item.question}
                                        </Typography>
                                    </AccordionSummary>

                                    <AccordionDetails
                                        sx={{
                                            px: 0,
                                            pt: 0,
                                            pb: 3,
                                            maxWidth: 720,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily:
                                                    "var(--font-montserrat)",
                                                fontSize: "12px",
                                                lineHeight: 1.9,
                                                color: "#858585",
                                            }}
                                        >
                                            {item.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    ))}
                </Container>
            </Box>

            {/* =====================================================
          CONTACT CTA
      ===================================================== */}

            <Box
                component="section"
                sx={{
                    backgroundColor: "#1E2D4C",
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
                        color: "#ACBDAA",
                        mb: 1.5,
                    }}
                >
                    STILL HAVE QUESTIONS?
                </Typography>

                <Typography
                    sx={{
                        fontFamily: "var(--font-anton)",
                        fontSize: {
                            xs: "42px",
                            md: "64px",
                        },
                        lineHeight: 0.95,
                        color: "#FFFFFF",
                    }}
                >
                    LET'S TALK.
                </Typography>

                <Typography
                    sx={{
                        maxWidth: 500,
                        mx: "auto",
                        mt: 2,
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "12px",
                        lineHeight: 1.8,
                        color: "rgba(255,255,255,0.65)",
                    }}
                >
                    Can't find the answer you're looking for?
                    Our team is happy to help.
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
                        backgroundColor: "#ACBDAA",
                        color: "#1E2D4C",
                        textDecoration: "none",
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        transition: "all 0.25s ease",
                        "&:hover": {
                            backgroundColor: "#FFFFFF",
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