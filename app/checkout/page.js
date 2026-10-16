"use client";

import { useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../components/auth/AuthContext";

import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    Radio,
    RadioGroup,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { useCart } from "../../components/cart/CartContext";

export default function CheckoutPage() {
    const { user, loading: authLoading } = useAuth();
    const {
        cartItems,
        cartSubtotal,
        cartTotal,
        clearCart,
        isLoaded,
    } = useCart();

    /* =====================================================
       FORM STATE
    ===================================================== */

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [paymentMethod, setPaymentMethod] =
        useState("cod");

    const [saveInfo, setSaveInfo] =
        useState(false);

    const [errors, setErrors] = useState({});

    const [placingOrder, setPlacingOrder] =
        useState(false);

    const [orderSuccess, setOrderSuccess] =
        useState(false);

    const [snackbarOpen, setSnackbarOpen] =
        useState(false);

    const [snackbarMessage, setSnackbarMessage] =
        useState("");

    /* =====================================================
       PRICE HELPER
    ===================================================== */

    const getNumericPrice = (price) => {
        if (typeof price === "number") {
            return price;
        }

        if (typeof price === "string") {
            return Number(
                price.replace(/[₹,\s]/g, "")
            );
        }

        return 0;
    };

    /* =====================================================
       SHIPPING
    ===================================================== */

    const shipping = useMemo(() => {
        if (cartSubtotal >= 999) {
            return 0;
        }

        return cartItems.length > 0 ? 99 : 0;
    }, [cartSubtotal, cartItems.length]);

    /* =====================================================
       GRAND TOTAL
    ===================================================== */

    const grandTotal =
        Number(cartTotal || cartSubtotal || 0) +
        shipping;

    /* =====================================================
       FORMAT PRICE
    ===================================================== */

    const formatPrice = (price) => {
        return `₹${Number(price || 0).toLocaleString(
            "en-IN"
        )}`;
    };

    /* =====================================================
       HANDLE INPUT
    ===================================================== */

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((current) => ({
                ...current,
                [name]: "",
            }));
        }
    };

    /* =====================================================
       VALIDATION
    ===================================================== */

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName =
                "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName =
                "Last name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email =
                "Email address is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email
            )
        ) {
            newErrors.email =
                "Enter a valid email address";
        }

        if (!formData.phone.trim()) {
            newErrors.phone =
                "Phone number is required";
        } else if (
            !/^[6-9]\d{9}$/.test(
                formData.phone.replace(/\s/g, "")
            )
        ) {
            newErrors.phone =
                "Enter a valid 10-digit phone number";
        }

        if (!formData.address.trim()) {
            newErrors.address =
                "Address is required";
        }

        if (!formData.city.trim()) {
            newErrors.city =
                "City is required";
        }

        if (!formData.state.trim()) {
            newErrors.state =
                "State is required";
        }

        if (!formData.pincode.trim()) {
            newErrors.pincode =
                "PIN code is required";
        } else if (
            !/^\d{6}$/.test(
                formData.pincode
            )
        ) {
            newErrors.pincode =
                "Enter a valid 6-digit PIN code";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    /* =====================================================
       PLACE ORDER
    ===================================================== */



    const handlePlaceOrder = async () => {
        if (authLoading) {
            setSnackbarMessage("Checking your account. Please wait.");
            setSnackbarOpen(true);
            return;
        }

        if (!user) {
            setSnackbarMessage("Please log in before placing your order.");
            setSnackbarOpen(true);
            return;
        }

        if (cartItems.length === 0) {
            setSnackbarMessage("Your bag is empty.");
            setSnackbarOpen(true);
            return;
        }

        if (!validateForm()) {
            window.scrollTo({ top: 350, behavior: "smooth" });
            return;
        }

        if (paymentMethod !== "cod") {
            setSnackbarMessage(
                "Online payment is not connected yet. Please select Cash on Delivery."
            );
            setSnackbarOpen(true);
            return;
        }

        setPlacingOrder(true);

        try {
            // 1. Verify the current Supabase session
            const {
                data: { session },
                error: sessionError,
            } = await supabase.auth.getSession();

            if (sessionError) {
                throw sessionError;
            }

            if (!session || session.user.id !== user.id) {
                throw new Error(
                    "Your session has expired. Please log in again."
                );
            }

            // 2. Calculate order totals
            const subtotal = Number(cartSubtotal || 0);
            const shippingFee = Number(shipping || 0);
            const total = subtotal + shippingFee;

            // 3. Generate a unique order number
            const orderNumber =
                `CHY-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

            // 4. Prepare the order information
            const orderPayload = {
                user_id: user.id,
                order_number: orderNumber,
                subtotal,
                shipping_fee: shippingFee,
                total_amount: total,
                full_name:
                    `${formData.firstName} ${formData.lastName}`.trim(),
                phone: formData.phone.trim(),
                address_line1: formData.address.trim(),
                address_line2: formData.apartment.trim(),
                city: formData.city.trim(),
                state: formData.state.trim(),
                pincode: formData.pincode.trim(),
            };

            // 5. Keep only valid UUIDs for database product/variant IDs
            const toUuidOrNull = (value) => {
                if (typeof value !== "string") {
                    return null;
                }

                return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                    value
                )
                    ? value
                    : null;
            };

            // 6. Prepare all order items
            const orderItemsPayload = cartItems.map((item) => {
                const price = getNumericPrice(item.price);
                const quantity = Number(item.quantity || 1);

                return {
                    product_id: toUuidOrNull(item.productId),
                    variant_id: toUuidOrNull(item.variantId),
                    product_name: item.name,
                    sku: item.sku || null,
                    size: item.size || null,
                    color: item.color || null,
                    quantity,
                    unit_price: price,
                    total_price: price * quantity,
                };
            });

            // 7. Save the order and all items in one database transaction
            const { data: order, error: orderError } = await supabase.rpc(
                "create_choyify_order",
                {
                    p_order: orderPayload,
                    p_items: orderItemsPayload,
                }
            );

            if (orderError) {
                throw orderError;
            }

            if (!order?.id || !order?.order_number) {
                throw new Error(
                    "The order response was incomplete. Please contact support."
                );
            }

            // 8. Show success and clear the cart only after saving succeeds
            console.log("Order placed successfully:", order.order_number);

            setOrderSuccess(true);
            clearCart();

        } catch (error) {
            console.error("Checkout error:", error);

            setSnackbarMessage(
                error?.message ||
                "Unable to place your order. Please try again."
            );

            setSnackbarOpen(true);

        } finally {
            setPlacingOrder(false);
        }
    };


    /* =====================================================
       LOADING
    ===================================================== */

    if (!isLoaded) {
        return (
            <Box
                sx={{
                    minHeight: "70vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress
                    sx={{
                        color: "#1E2D4C",
                    }}
                />
            </Box>
        );
    }

    /* =====================================================
       ORDER SUCCESS
    ===================================================== */

    if (orderSuccess) {
        return (
            <Box
                component="main"
                sx={{
                    minHeight: "70vh",
                    backgroundColor: "#F5F5F2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 3,
                    py: 12,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "650px",
                        backgroundColor: "#FFFFFF",
                        textAlign: "center",
                        px: {
                            xs: 3,
                            sm: 6,
                            md: 9,
                        },
                        py: {
                            xs: 6,
                            md: 9,
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            backgroundColor: "#ACBDAA",
                            color: "#1E2D4C",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 3,
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "34px",
                            fontWeight: 800,
                        }}
                    >
                        ✓
                    </Box>

                    <Typography
                        sx={{
                            fontFamily:
                                "var(--font-montserrat)",
                            fontSize: "10px",
                            fontWeight: 800,
                            letterSpacing: "0.3em",
                            color: "#858585",
                            mb: 2,
                        }}
                    >
                        CHŌYIFY
                    </Typography>

                    <Typography
                        component="h1"
                        sx={{
                            fontFamily:
                                "var(--font-anton)",
                            fontSize: {
                                xs: "55px",
                                sm: "70px",
                            },
                            lineHeight: 0.9,
                            color: "#1E2D4C",
                            mb: 3,
                        }}
                    >
                        ORDER
                        <br />
                        CONFIRMED
                    </Typography>

                    <Typography
                        sx={{
                            fontFamily:
                                "var(--font-montserrat)",
                            fontSize: "13px",
                            lineHeight: 1.8,
                            color: "#858585",
                            maxWidth: "450px",
                            mx: "auto",
                            mb: 4,
                        }}
                    >
                        Thank you for shopping with
                        CHŌYIFY. Your order has been
                        received successfully.
                    </Typography>

                    <Button
                        href="/shop"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            height: 54,
                            px: 4,
                            borderRadius: 0,
                            backgroundColor: "#1E2D4C",
                            color: "#FFFFFF",
                            fontFamily:
                                "var(--font-montserrat)",
                            fontSize: "10px",
                            fontWeight: 800,
                            letterSpacing: "0.15em",
                            "&:hover": {
                                backgroundColor: "#ACBDAA",
                                color: "#1E2D4C",
                            },
                        }}
                    >
                        CONTINUE SHOPPING
                    </Button>
                </Box>
            </Box>
        );
    }

    /* =====================================================
       EMPTY CART
    ===================================================== */

    if (cartItems.length === 0) {
        return (
            <Box
                component="main"
                sx={{
                    backgroundColor: "#F5F5F2",
                    minHeight: "70vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 3,
                    py: 10,
                }}
            >
                <Box
                    sx={{
                        textAlign: "center",
                        maxWidth: "600px",
                    }}
                >
                    <ShoppingBagOutlinedIcon
                        sx={{
                            fontSize: 65,
                            color: "#ACBDAA",
                            mb: 3,
                        }}
                    />

                    <Typography
                        sx={{
                            fontFamily:
                                "var(--font-anton)",
                            fontSize: {
                                xs: "55px",
                                sm: "75px",
                            },
                            lineHeight: 0.88,
                            color: "#1E2D4C",
                            mb: 4,
                        }}
                    >
                        YOUR BAG
                        <br />
                        IS EMPTY
                    </Typography>

                    <Button
                        href="/shop"
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            height: 56,
                            px: 4,
                            borderRadius: 0,
                            backgroundColor: "#ACBDAA",
                            color: "#1E2D4C",
                            fontFamily:
                                "var(--font-montserrat)",
                            fontSize: "10px",
                            fontWeight: 800,
                            letterSpacing: "0.15em",
                            "&:hover": {
                                backgroundColor: "#1E2D4C",
                                color: "#FFFFFF",
                            },
                        }}
                    >
                        CONTINUE SHOPPING
                    </Button>
                </Box>
            </Box>
        );
    }

    /* =====================================================
       CHECKOUT PAGE
    ===================================================== */

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: "#F5F5F2",
                minHeight: "100vh",
            }}
        >
            {/* =================================================
          CHECKOUT HEADER
      ================================================= */}

            <Box
                sx={{
                    backgroundColor: "#FFFFFF",
                    borderBottom:
                        "1px solid rgba(30,45,76,0.08)",
                    px: {
                        xs: 3,
                        sm: 5,
                        md: 8,
                    },
                    py: {
                        xs: 5,
                        md: 7,
                    },
                }}
            >
                <Box
                    sx={{
                        maxWidth: "1500px",
                        mx: "auto",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent:
                            "space-between",
                        gap: 4,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontFamily:
                                    "var(--font-montserrat)",
                                fontSize: "10px",
                                fontWeight: 800,
                                letterSpacing: "0.3em",
                                color: "#858585",
                                mb: 2,
                            }}
                        >
                            CHŌYIFY
                        </Typography>

                        <Typography
                            component="h1"
                            sx={{
                                fontFamily:
                                    "var(--font-anton)",
                                fontSize: {
                                    xs: "55px",
                                    sm: "75px",
                                    md: "95px",
                                },
                                lineHeight: 0.85,
                                color: "#1E2D4C",
                            }}
                        >
                            CHECKOUT
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                            alignItems: "center",
                            gap: 1,
                            pb: 1,
                        }}
                    >
                        <LockOutlinedIcon
                            sx={{
                                fontSize: 18,
                                color: "#858585",
                            }}
                        />

                        <Typography
                            sx={{
                                fontFamily:
                                    "var(--font-montserrat)",
                                fontSize: "10px",
                                fontWeight: 800,
                                letterSpacing: "0.12em",
                                color: "#858585",
                            }}
                        >
                            SECURE CHECKOUT
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* =================================================
          MAIN CHECKOUT
      ================================================= */}

            <Box
                sx={{
                    maxWidth: "1500px",
                    mx: "auto",
                    px: {
                        xs: 2,
                        sm: 3,
                        md: 5,
                        lg: 7,
                    },
                    py: {
                        xs: 5,
                        md: 8,
                    },
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "1.25fr 0.75fr",
                    },
                    gap: {
                        xs: 5,
                        lg: 8,
                    },
                }}
            >
                {/* =================================================
            LEFT — CUSTOMER DETAILS
        ================================================= */}

                <Box
                    sx={{
                        backgroundColor: "#FFFFFF",
                        p: {
                            xs: 3,
                            sm: 4,
                            md: 5,
                        },
                    }}
                >
                    {/* CUSTOMER INFORMATION */}

                    <Typography
                        sx={{
                            fontFamily:
                                "var(--font-montserrat)",
                            fontSize: "10px",
                            fontWeight: 800,
                            letterSpacing: "0.25em",
                            color: "#858585",
                            mb: 1,
                        }}
                    >
                        01
                    </Typography>

                    <Typography
                        component="h2"
                        sx={{
                            fontFamily:
                                "var(--font-anton)",
                            fontSize: {
                                xs: "40px",
                                md: "50px",
                            },
                            lineHeight: 0.9,
                            color: "#1E2D4C",
                            mb: 4,
                        }}
                    >
                        CONTACT
                        <br />
                        INFORMATION
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                            },
                            gap: 2,
                        }}
                    >
                        <TextField
                            fullWidth
                            name="firstName"
                            label="First name"
                            value={formData.firstName}
                            onChange={handleChange}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                        />

                        <TextField
                            fullWidth
                            name="lastName"
                            label="Last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                        />

                        <TextField
                            fullWidth
                            name="email"
                            label="Email address"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{
                                gridColumn: {
                                    xs: "auto",
                                    sm: "1 / -1",
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            name="phone"
                            label="Phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 10,
                                    inputMode: "numeric",
                                },
                            }}
                        />
                    </Box>

                    <Divider
                        sx={{
                            my: 6,
                            borderColor:
                                "rgba(30,45,76,0.10)",
                        }}
                    />

                    {/* DELIVERY ADDRESS */}

                    <Typography
                        sx={{
                            fontFamily:
                                "var(--font-montserrat)",
                            fontSize: "10px",
                            fontWeight: 800,
                            letterSpacing: "0.25em",
                            color: "#858585",
                            mb: 1,
                        }}
                    >
                        02
                    </Typography>

                    <Typography
                        component="h2"
                        sx={{
                            fontFamily:
                                "var(--font-anton)",
                            fontSize: {
                                xs: "40px",
                                md: "50px",
                            },
                            lineHeight: 0.9,
                            color: "#1E2D4C",
                            mb: 4,
                        }}
                    >
                        DELIVERY
                        <br />
                        ADDRESS
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gap: 2,
                        }}
                    >
                        <TextField
                            fullWidth
                            name="address"
                            label="Street address"
                            value={formData.address}
                            onChange={handleChange}
                            error={!!errors.address}
                            helperText={errors.address}
                        />

                        <TextField
                            fullWidth
                            name="apartment"
                            label="Apartment, suite, etc. (optional)"
                            value={formData.apartment}
                            onChange={handleChange}
                        />

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "1fr 1fr",
                                },
                                gap: 2,
                            }}
                        >
                            <TextField
                                fullWidth
                                name="city"
                                label="City"
                                value={formData.city}
                                onChange={handleChange}
                                error={!!errors.city}
                                helperText={errors.city}
                            />

                            <TextField
                                fullWidth
                                name="state"
                                label="State"
                                value={formData.state}
                                onChange={handleChange}
                                error={!!errors.state}
                                helperText={errors.state}
                            />
                        </Box>

                        <TextField
                            fullWidth
                            name="pincode"
                            label="PIN code"
                            value={formData.pincode}
                            onChange={handleChange}
                            error={!!errors.pincode}
                            helperText={errors.pincode}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 6,
                                    inputMode: "numeric",
                                },
                            }}
                        />
                    </Box>

                    <FormControlLabel
                        sx={{
                            mt: 2,
                            "& .MuiFormControlLabel-label": {
                                fontFamily:
                                    "var(--font-montserrat)",
                                fontSize: "11px",
                                color: "#858585",
                            },
                        }}
                        control={
                            <Checkbox
                                checked={saveInfo}
                                onChange={(event) =>
                                    setSaveInfo(
                                        event.target.checked
                                    )
                                }
                                sx={{
                                    color: "#ACBDAA",
                                    "&.Mui-checked": {
                                        color: "#1E2D4C",
                                    },
                                }}
                            />
                        }
                        label="Save my information for next time"
                    />

                    <Divider
                        sx={{
                            my: 6,
                            borderColor:
                                "rgba(30,45,76,0.10)",
                        }}
                    />

                    {/* PAYMENT */}

                    <Typography
                        sx={{
                            fontFamily:
                                "var(--font-montserrat)",
                            fontSize: "10px",
                            fontWeight: 800,
                            letterSpacing: "0.25em",
                            color: "#858585",
                            mb: 1,
                        }}
                    >
                        03
                    </Typography>

                    <Typography
                        component="h2"
                        sx={{
                            fontFamily:
                                "var(--font-anton)",
                            fontSize: {
                                xs: "40px",
                                md: "50px",
                            },
                            lineHeight: 0.9,
                            color: "#1E2D4C",
                            mb: 4,
                        }}
                    >
                        PAYMENT
                        <br />
                        METHOD
                    </Typography>

                    <RadioGroup
                        value={paymentMethod}
                        onChange={(event) =>
                            setPaymentMethod(
                                event.target.value
                            )
                        }
                    >
                        <Box
                            sx={{
                                border:
                                    paymentMethod === "cod"
                                        ? "2px solid #1E2D4C"
                                        : "1px solid #D8D8D8",
                                p: 2,
                                mb: 2,
                                transition:
                                    "border 0.2s ease",
                            }}
                        >
                            <FormControlLabel
                                value="cod"
                                control={
                                    <Radio
                                        sx={{
                                            color: "#ACBDAA",
                                            "&.Mui-checked": {
                                                color: "#1E2D4C",
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontFamily:
                                                    "var(--font-montserrat)",
                                                fontSize: "12px",
                                                fontWeight: 800,
                                                color: "#1E2D4C",
                                            }}
                                        >
                                            CASH ON DELIVERY
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontFamily:
                                                    "var(--font-montserrat)",
                                                fontSize: "10px",
                                                color: "#858585",
                                                mt: 0.5,
                                            }}
                                        >
                                            Pay when your order
                                            arrives.
                                        </Typography>
                                    </Box>
                                }
                            />
                        </Box>

                        <Box
                            sx={{
                                border:
                                    paymentMethod === "online"
                                        ? "2px solid #1E2D4C"
                                        : "1px solid #D8D8D8",
                                p: 2,
                                transition:
                                    "border 0.2s ease",
                            }}
                        >
                            <FormControlLabel
                                value="online"
                                control={
                                    <Radio
                                        sx={{
                                            color: "#ACBDAA",
                                            "&.Mui-checked": {
                                                color: "#1E2D4C",
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontFamily:
                                                    "var(--font-montserrat)",
                                                fontSize: "12px",
                                                fontWeight: 800,
                                                color: "#1E2D4C",
                                            }}
                                        >
                                            ONLINE PAYMENT
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontFamily:
                                                    "var(--font-montserrat)",
                                                fontSize: "10px",
                                                color: "#858585",
                                                mt: 0.5,
                                            }}
                                        >
                                            UPI, cards and net
                                            banking.
                                        </Typography>
                                    </Box>
                                }
                            />
                        </Box>
                    </RadioGroup>

                    {paymentMethod === "online" && (
                        <Alert
                            severity="info"
                            sx={{
                                mt: 2,
                                fontFamily:
                                    "var(--font-montserrat)",
                                fontSize: "11px",
                            }}
                        >
                            Online payment gateway will
                            be connected in the next
                            ecommerce step.
                        </Alert>
                    )}
                </Box>

                {/* =================================================
            RIGHT — ORDER SUMMARY
        ================================================= */}

                <Box
                    sx={{
                        height: "fit-content",
                        position: {
                            lg: "sticky",
                        },
                        top: {
                            lg: 110,
                        },
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#FFFFFF",
                            p: {
                                xs: 3,
                                sm: 4,
                                md: 5,
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily:
                                    "var(--font-montserrat)",
                                fontSize: "10px",
                                fontWeight: 800,
                                letterSpacing: "0.25em",
                                color: "#858585",
                                mb: 1,
                            }}
                        >
                            YOUR ORDER
                        </Typography>

                        <Typography
                            component="h2"
                            sx={{
                                fontFamily:
                                    "var(--font-anton)",
                                fontSize: {
                                    xs: "45px",
                                    md: "55px",
                                },
                                lineHeight: 0.9,
                                color: "#1E2D4C",
                                mb: 4,
                            }}
                        >
                            ORDER
                            <br />
                            SUMMARY
                        </Typography>

                        {/* PRODUCTS */}

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2.5,
                            }}
                        >
                            {cartItems.map((item) => {
                                const price =
                                    getNumericPrice(
                                        item.price
                                    );

                                const quantity = Number(
                                    item.quantity || 1
                                );

                                return (
                                    <Box
                                        key={`${item.id}-${item.size}`}
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "85px 1fr auto",
                                            gap: 2,
                                            alignItems: "start",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={
                                                item.images?.[0] ||
                                                item.image
                                            }
                                            alt={item.name}
                                            sx={{
                                                width: "85px",
                                                height: "110px",
                                                objectFit: "cover",
                                                display: "block",
                                                backgroundColor:
                                                    "#F5F5F2",
                                            }}
                                        />

                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontFamily:
                                                        "var(--font-montserrat)",
                                                    fontSize: "11px",
                                                    fontWeight: 800,
                                                    lineHeight: 1.4,
                                                    color: "#1E2D4C",
                                                    mb: 0.8,
                                                }}
                                            >
                                                {item.name}
                                            </Typography>

                                            {item.size && (
                                                <Typography
                                                    sx={{
                                                        fontFamily:
                                                            "var(--font-montserrat)",
                                                        fontSize: "9px",
                                                        fontWeight: 700,
                                                        letterSpacing:
                                                            "0.08em",
                                                        color: "#858585",
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    SIZE: {item.size}
                                                </Typography>
                                            )}

                                            <Typography
                                                sx={{
                                                    fontFamily:
                                                        "var(--font-montserrat)",
                                                    fontSize: "10px",
                                                    color: "#858585",
                                                }}
                                            >
                                                QTY: {quantity}
                                            </Typography>
                                        </Box>

                                        <Typography
                                            sx={{
                                                fontFamily:
                                                    "var(--font-montserrat)",
                                                fontSize: "12px",
                                                fontWeight: 800,
                                                color: "#1E2D4C",
                                            }}
                                        >
                                            {formatPrice(
                                                price * quantity
                                            )}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Box>

                        <Divider
                            sx={{
                                my: 4,
                                borderColor:
                                    "rgba(30,45,76,0.10)",
                            }}
                        />

                        {/* SUBTOTAL */}

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                mb: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily:
                                        "var(--font-montserrat)",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    color: "#858585",
                                }}
                            >
                                SUBTOTAL
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily:
                                        "var(--font-montserrat)",
                                    fontSize: "13px",
                                    fontWeight: 800,
                                    color: "#1E2D4C",
                                }}
                            >
                                {formatPrice(
                                    cartSubtotal
                                )}
                            </Typography>
                        </Box>

                        {/* SHIPPING */}

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                mb: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily:
                                        "var(--font-montserrat)",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    color: "#858585",
                                }}
                            >
                                SHIPPING
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily:
                                        "var(--font-montserrat)",
                                    fontSize: "13px",
                                    fontWeight: 800,
                                    color:
                                        shipping === 0
                                            ? "#ACBDAA"
                                            : "#1E2D4C",
                                }}
                            >
                                {shipping === 0
                                    ? "FREE"
                                    : formatPrice(shipping)}
                            </Typography>
                        </Box>

                        {cartSubtotal < 999 && (
                            <Typography
                                sx={{
                                    fontFamily:
                                        "var(--font-montserrat)",
                                    fontSize: "9px",
                                    lineHeight: 1.6,
                                    color: "#858585",
                                    mb: 3,
                                }}
                            >
                                Add{" "}
                                {formatPrice(
                                    999 - cartSubtotal
                                )}{" "}
                                more to unlock free
                                shipping.
                            </Typography>
                        )}

                        <Divider
                            sx={{
                                mb: 3,
                                borderColor:
                                    "rgba(30,45,76,0.10)",
                            }}
                        />

                        {/* TOTAL */}

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems: "center",
                                mb: 4,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily:
                                        "var(--font-montserrat)",
                                    fontSize: "12px",
                                    fontWeight: 800,
                                    letterSpacing:
                                        "0.12em",
                                    color: "#1E2D4C",
                                }}
                            >
                                TOTAL
                            </Typography>

                            <Typography
                                sx={{
                                    fontFamily:
                                        "var(--font-montserrat)",
                                    fontSize: "23px",
                                    fontWeight: 800,
                                    color: "#1E2D4C",
                                }}
                            >
                                {formatPrice(
                                    grandTotal
                                )}
                            </Typography>
                        </Box>

                        {/* PLACE ORDER */}

                        <Button
                            fullWidth
                            onClick={handlePlaceOrder}
                            disabled={placingOrder}
                            endIcon={
                                placingOrder ? (
                                    <CircularProgress
                                        size={18}
                                        sx={{
                                            color: "#1E2D4C",
                                        }}
                                    />
                                ) : (
                                    <ArrowForwardIcon />
                                )
                            }
                            sx={{
                                height: 60,
                                borderRadius: 0,
                                backgroundColor: "#ACBDAA",
                                color: "#1E2D4C",
                                fontFamily:
                                    "var(--font-montserrat)",
                                fontSize: "10px",
                                fontWeight: 800,
                                letterSpacing: "0.15em",
                                "&:hover": {
                                    backgroundColor:
                                        "#1E2D4C",
                                    color: "#FFFFFF",
                                },
                                "&.Mui-disabled": {
                                    backgroundColor:
                                        "#D8DED7",
                                    color: "#6F766E",
                                },
                            }}
                        >
                            {placingOrder
                                ? "PLACING ORDER..."
                                : "PLACE ORDER"}
                        </Button>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 0.8,
                                mt: 3,
                            }}
                        >
                            <LockOutlinedIcon
                                sx={{
                                    fontSize: 14,
                                    color: "#858585",
                                }}
                            />

                            <Typography
                                sx={{
                                    fontFamily:
                                        "var(--font-montserrat)",
                                    fontSize: "9px",
                                    fontWeight: 600,
                                    color: "#858585",
                                }}
                            >
                                SECURE CHŌYIFY CHECKOUT
                            </Typography>
                        </Box>
                    </Box>

                    {/* FREE SHIPPING BOX */}

                    <Box
                        sx={{
                            backgroundColor: "#ACBDAA",
                            mt: 2,
                            px: 3,
                            py: 2.5,
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily:
                                    "var(--font-montserrat)",
                                fontSize: "10px",
                                fontWeight: 800,
                                letterSpacing:
                                    "0.12em",
                                color: "#1E2D4C",
                            }}
                        >
                            FREE SHIPPING ON ORDERS
                            ABOVE ₹999
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* =================================================
          SNACKBAR
      ================================================= */}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbarOpen(false)
                }
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Alert
                    severity="warning"
                    onClose={() =>
                        setSnackbarOpen(false)
                    }
                    sx={{
                        fontFamily:
                            "var(--font-montserrat)",
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}