"use client";
import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";


import { supabase } from "../../lib/supabase";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useAuth } from "../../components/auth/AuthContext";

export default function AccountPage() {
    const { user, loading: authLoading, login, register } = useAuth();

    const [mode, setMode] = useState("login");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("error");
    const [submitting, setSubmitting] = useState(false);

    const isLogin = mode === "login";

    const switchMode = (newMode) => {
        setMode(newMode);

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setMessage("");
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");

        // ============================================
        // BASIC VALIDATION
        // ============================================

        if (!email.trim() || !password.trim()) {
            setMessageType("error");
            setMessage(
                "Please enter your email and password."
            );
            return;
        }

        if (!isLogin && !name.trim()) {
            setMessageType("error");
            setMessage("Please enter your full name.");
            return;
        }

        if (!isLogin && password.length < 6) {
            setMessageType("error");
            setMessage(
                "Password must be at least 6 characters."
            );
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setMessageType("error");
            setMessage(
                "Passwords do not match."
            );
            return;
        }

        setSubmitting(true);

        try {
            let result;

            // ============================================
            // LOGIN
            // ============================================

            if (isLogin) {
                result = await login(
                    email.trim(),
                    password
                );
            }

            // ============================================
            // REGISTER
            // ============================================

            else {
                result = await register(
                    name.trim(),
                    email.trim(),
                    password
                );
            }

            // ============================================
            // ERROR
            // ============================================

            if (!result?.success) {
                setMessageType("error");

                setMessage(
                    result?.message ||
                    "Something went wrong. Please try again."
                );

                return;
            }

            // ============================================
            // EMAIL CONFIRMATION
            // ============================================

            if (
                !isLogin &&
                result?.needsConfirmation
            ) {
                setMessageType("success");

                setMessage(
                    result.message ||
                    "Account created. Please check your email to confirm your account."
                );

                setPassword("");
                setConfirmPassword("");

                return;
            }

            // ============================================
            // SUCCESS
            // ============================================

            setMessageType("success");

            if (isLogin) {
                setMessage(
                    "Welcome back to CHŌYIFY."
                );
            } else {
                setMessage(
                    "Your CHŌYIFY account has been created."
                );
            }

        } catch (error) {
            console.error(
                "Authentication error:",
                error
            );

            setMessageType("error");

            setMessage(
                "Something went wrong. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        setMessage("");

        try {
            const { error } =
                await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        redirectTo:
                            `${window.location.origin}/account`,
                    },
                });

            if (error) {
                setMessageType("error");
                setMessage(error.message);
            }
        } catch (error) {
            console.error(
                "Google login error:",
                error
            );

            setMessageType("error");
            setMessage(
                "Google sign-in is currently unavailable."
            );
        }
    };

    if (authLoading) {
        return (
            <Box
                sx={{
                    minHeight: "calc(100vh - 120px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FEFAEF",
                }}
            >
                <CircularProgress sx={{ color: "#1E2D4C" }} />
            </Box>
        );
    }

    if (user) {
        return (
            <AccountLoggedIn
                user={user}
                onBackToShop={() => {
                    window.location.href = "/shop";
                }}
            />
        );
    }

    return (
        <Box
            component="main"
            sx={{
                minHeight: "calc(100vh - 120px)",
                backgroundColor: "#FEFAEF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 2, sm: 3 },
                py: { xs: 6, md: 9 },
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 520,
                    borderRadius: { xs: "24px", md: "30px" },
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(30,45,76,0.10)",
                    boxShadow: "0 25px 70px rgba(30,45,76,0.10)",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        px: { xs: 3, sm: 5 },
                        py: { xs: 4, sm: 5 },
                    }}
                >
                    {/* BRAND */}
                    <Box
                        sx={{
                            textAlign: "center",
                            mb: 4,
                        }}
                    >
                        <Typography
                            component="a"
                            href="/"
                            sx={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: { xs: "26px", sm: "30px" },
                                fontWeight: 800,
                                letterSpacing: "0.12em",
                                color: "#1E2D4C",
                                textDecoration: "none",
                            }}
                        >
                            CHŌYIFY
                        </Typography>

                        <Box
                            sx={{
                                width: 42,
                                height: 3,
                                backgroundColor: "#ACBDAA",
                                mx: "auto",
                                mt: 1.5,
                                borderRadius: 5,
                            }}
                        />
                    </Box>

                    {/* HEADING */}
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Typography
                            sx={{
                                fontFamily: "var(--font-anton)",
                                fontSize: { xs: "38px", sm: "46px" },
                                lineHeight: 0.95,
                                color: "#1E2D4C",
                                letterSpacing: "-0.5px",
                            }}
                        >
                            {isLogin ? "WELCOME BACK" : "CREATE ACCOUNT"}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1.5,
                                color: "#858585",
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "13px",
                                lineHeight: 1.6,
                            }}
                        >
                            {isLogin
                                ? "Sign in to continue your CHŌYIFY journey."
                                : "Join CHŌYIFY and discover your everyday style."}
                        </Typography>
                    </Box>

                    {/* MODE SWITCH */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            backgroundColor: "#F4F1EC",
                            borderRadius: "14px",
                            p: "4px",
                            mb: 3,
                        }}
                    >
                        <Button
                            onClick={() => switchMode("login")}
                            disableRipple
                            sx={{
                                minHeight: 44,
                                borderRadius: "11px",
                                textTransform: "none",
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "12px",
                                fontWeight: 700,
                                color: isLogin ? "#FFFFFF" : "#858585",
                                backgroundColor: isLogin
                                    ? "#1E2D4C"
                                    : "transparent",
                                "&:hover": {
                                    backgroundColor: isLogin
                                        ? "#1E2D4C"
                                        : "rgba(30,45,76,0.05)",
                                },
                            }}
                        >
                            Sign In
                        </Button>

                        <Button
                            onClick={() => switchMode("signup")}
                            disableRipple
                            sx={{
                                minHeight: 44,
                                borderRadius: "11px",
                                textTransform: "none",
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "12px",
                                fontWeight: 700,
                                color: !isLogin ? "#FFFFFF" : "#858585",
                                backgroundColor: !isLogin
                                    ? "#1E2D4C"
                                    : "transparent",
                                "&:hover": {
                                    backgroundColor: !isLogin
                                        ? "#1E2D4C"
                                        : "rgba(30,45,76,0.05)",
                                },
                            }}
                        >
                            Create Account
                        </Button>
                    </Box>

                    {/* MESSAGE */}
                    {message && (
                        <Alert
                            severity={messageType}
                            sx={{
                                mb: 2.5,
                                borderRadius: "12px",
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "12px",
                            }}
                        >
                            {message}
                        </Alert>
                    )}

                    {/* FORM */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <Stack spacing={2}>
                            {/* NAME */}
                            {!isLogin && (
                                <TextField
                                    fullWidth
                                    label="Full name"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    autoComplete="name"
                                    sx={fieldStyles}
                                />
                            )}

                            {/* EMAIL */}
                            <TextField
                                fullWidth
                                label="Email address"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                autoComplete="email"
                                sx={fieldStyles}
                            />

                            {/* PASSWORD */}
                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                autoComplete={
                                    isLogin
                                        ? "current-password"
                                        : "new-password"
                                }
                                sx={fieldStyles}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        setShowPassword((prev) => !prev)
                                                    }
                                                    edge="end"
                                                    aria-label="Toggle password visibility"
                                                    sx={{
                                                        color: "#858585",
                                                    }}
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOffOutlinedIcon />
                                                    ) : (
                                                        <VisibilityOutlinedIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />

                            {/* CONFIRM PASSWORD */}
                            {!isLogin && (
                                <TextField
                                    fullWidth
                                    label="Confirm password"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="new-password"
                                    sx={fieldStyles}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                (prev) => !prev
                                                            )
                                                        }
                                                        edge="end"
                                                        aria-label="Toggle confirm password visibility"
                                                        sx={{
                                                            color: "#858585",
                                                        }}
                                                    >
                                                        {showConfirmPassword ? (
                                                            <VisibilityOffOutlinedIcon />
                                                        ) : (
                                                            <VisibilityOutlinedIcon />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            )}

                            {/* LOGIN BUTTON */}
                            <Button
                                type="submit"
                                fullWidth
                                disabled={submitting}
                                sx={{
                                    minHeight: 56,
                                    mt: 0.5,
                                    borderRadius: "14px",
                                    backgroundColor: "#1E2D4C",
                                    color: "#FFFFFF",
                                    fontFamily: "var(--font-montserrat)",
                                    fontSize: "12px",
                                    fontWeight: 800,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    "&:hover": {
                                        backgroundColor: "#ACBDAA",
                                        color: "#1E2D4C",
                                    },
                                    "&:disabled": {
                                        backgroundColor: "#D8D8D8",
                                        color: "#858585",
                                    },
                                }}
                            >
                                {submitting ? (
                                    <CircularProgress
                                        size={22}
                                        sx={{ color: "#FFFFFF" }}
                                    />
                                ) : isLogin ? (
                                    "Sign In"
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </Stack>
                    </Box>

                    {/* DIVIDER */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            my: 3,
                        }}
                    >
                        <Divider sx={{ flex: 1 }} />

                        <Typography
                            sx={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "11px",
                                fontWeight: 600,
                                color: "#858585",
                                letterSpacing: "0.08em",
                            }}
                        >
                            OR
                        </Typography>

                        <Divider sx={{ flex: 1 }} />
                    </Box>

                    {/* GOOGLE */}
                    <Button
                        fullWidth
                        onClick={handleGoogleLogin}
                        startIcon={<GoogleIcon />}
                        sx={{
                            minHeight: 54,
                            borderRadius: "14px",
                            border: "1px solid rgba(30,45,76,0.15)",
                            backgroundColor: "#FFFFFF",
                            color: "#1E2D4C",
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "12px",
                            fontWeight: 700,
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#F7F7F7",
                                borderColor: "#ACBDAA",
                            },
                        }}
                    >
                        Continue with Google
                    </Button>

                    {/* TERMS */}
                    <Typography
                        sx={{
                            mt: 3,
                            textAlign: "center",
                            color: "#858585",
                            fontFamily: "var(--font-montserrat)",
                            fontSize: "10px",
                            lineHeight: 1.6,
                        }}
                    >
                        By continuing, you agree to our{" "}
                        <Box
                            component="span"
                            sx={{
                                color: "#1E2D4C",
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                        >
                            Terms & Conditions
                        </Box>{" "}
                        and{" "}
                        <Box
                            component="span"
                            sx={{
                                color: "#1E2D4C",
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                        >
                            Privacy Policy
                        </Box>
                        .
                    </Typography>

                    {/* FOOTER LINK */}
                    <Box
                        sx={{
                            mt: 3,
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "11px",
                                color: "#858585",
                            }}
                        >
                            {isLogin
                                ? "New to CHŌYIFY?"
                                : "Already have a CHŌYIFY account?"}
                        </Typography>

                        <Button
                            onClick={() =>
                                switchMode(isLogin ? "signup" : "login")
                            }
                            sx={{
                                mt: 0.5,
                                minWidth: 0,
                                p: 0,
                                textTransform: "none",
                                fontFamily: "var(--font-montserrat)",
                                fontSize: "12px",
                                fontWeight: 800,
                                color: "#1E2D4C",
                                "&:hover": {
                                    backgroundColor: "transparent",
                                    color: "#ACBDAA",
                                },
                            }}
                        >
                            {isLogin
                                ? "Create an account"
                                : "Sign in instead"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}


function AccountLoggedIn({ user, onBackToShop }) {
    const { logout } = useAuth();

    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [ordersError, setOrdersError] = useState("");

    const [cancelOrder, setCancelOrder] = useState(null);
    const [cancelling, setCancelling] = useState(false);
    const [cancelMessage, setCancelMessage] = useState("");

    useEffect(() => {
        let active = true;

        const fetchOrders = async () => {
            setOrdersLoading(true);
            setOrdersError("");

            try {
                const { data, error } = await supabase
                    .from("orders")
                    .select(`
                        id,
                        order_number,
                        status,
                        payment_status,
                        payment_method,
                        subtotal,
                        shipping_fee,
                        total_amount,
                        created_at,
                        order_items (
                            id,
                            product_name,
                            sku,
                            size,
                            color,
                            quantity,
                            unit_price,
                            total_price
                        )
                    `)
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });

                if (error) throw error;

                if (active) {
                    setOrders(data || []);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);

                if (active) {
                    setOrdersError(
                        "We couldn't load your orders. Please try again."
                    );
                }
            } finally {
                if (active) {
                    setOrdersLoading(false);
                }
            }
        };

        fetchOrders();

        return () => {
            active = false;
        };
    }, [user.id]);

    const formatPrice = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(Number(amount || 0));

    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
            : "Date unavailable";

    const getStatusColor = (status) => {
        switch ((status || "").toLowerCase()) {
            case "delivered":
                return "success";
            case "shipped":
                return "info";
            case "cancelled":
            case "canceled":
                return "error";
            case "processing":
                return "warning";
            default:
                return "default";
        }
    };


    const handleCancelOrder = async () => {
        if (!cancelOrder || cancelling) return;

        setCancelling(true);
        setCancelMessage("");

        try {
            const { data, error } = await supabase.rpc(
                "cancel_choyify_order",
                { p_order_id: cancelOrder.id }
            );

            if (error) throw error;

            if (!data?.success) {
                throw new Error("Unable to cancel this order.");
            }

            setOrders((previousOrders) =>
                previousOrders.map((order) =>
                    order.id === cancelOrder.id
                        ? { ...order, status: "cancelled" }
                        : order
                )
            );

            setCancelOrder(null);
        } catch (error) {
            console.error("Order cancellation failed:", error);
            setCancelMessage(
                error.message || "Unable to cancel this order."
            );
        } finally {
            setCancelling(false);
        }
    };


    return (
        <Box
            component="main"
            sx={{
                minHeight: "calc(100vh - 120px)",
                backgroundColor: "#FEFAEF",
                px: { xs: 2, sm: 4, md: 6 },
                py: { xs: 5, md: 8 },
            }}
        >
            <Box sx={{ maxWidth: 1100, mx: "auto" }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, sm: 4 },
                        mb: 4,
                        borderRadius: "24px",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid rgba(30,45,76,0.10)",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "var(--font-anton)",
                            fontSize: { xs: 34, sm: 44 },
                            color: "#1E2D4C",
                        }}
                    >
                        MY ACCOUNT
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1,
                            fontFamily: "var(--font-montserrat)",
                            color: "#858585",
                            fontSize: 13,
                        }}
                    >
                        Welcome back,{" "}
                        {user.user_metadata?.full_name ||
                            user.email?.split("@")[0] ||
                            "CHŌYIFY Customer"}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.5,
                            fontFamily: "var(--font-montserrat)",
                            color: "#858585",
                            fontSize: 13,
                            overflowWrap: "anywhere",
                        }}
                    >
                        {user.email}
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                        sx={{ mt: 3 }}
                    >
                        <Button
                            onClick={onBackToShop}
                            sx={{
                                minHeight: 48,
                                px: 3,
                                borderRadius: "12px",
                                backgroundColor: "#1E2D4C",
                                color: "#FFFFFF",
                                fontFamily: "var(--font-montserrat)",
                                fontWeight: 700,
                                "&:hover": {
                                    backgroundColor: "#ACBDAA",
                                    color: "#1E2D4C",
                                },
                            }}
                        >
                            Continue Shopping
                        </Button>

                        <Button
                            onClick={logout}
                            startIcon={<ArrowBackIcon />}
                            sx={{
                                minHeight: 48,
                                px: 3,
                                borderRadius: "12px",
                                border: "1px solid rgba(30,45,76,0.15)",
                                color: "#1E2D4C",
                                fontFamily: "var(--font-montserrat)",
                                fontWeight: 700,
                            }}
                        >
                            Sign Out
                        </Button>
                    </Stack>
                </Paper>

                <Box sx={{ mb: 3 }}>
                    <Typography
                        sx={{
                            fontFamily: "var(--font-anton)",
                            fontSize: { xs: 32, sm: 40 },
                            color: "#1E2D4C",
                        }}
                    >
                        MY ORDERS
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0.5,
                            color: "#858585",
                            fontFamily: "var(--font-montserrat)",
                            fontSize: 13,
                        }}
                    >
                        Track your purchases and view your order details.
                    </Typography>
                </Box>

                {ordersLoading ? (
                    <Box sx={{ py: 8, textAlign: "center" }}>
                        <CircularProgress sx={{ color: "#1E2D4C" }} />
                        <Typography
                            sx={{
                                mt: 2,
                                color: "#858585",
                                fontFamily: "var(--font-montserrat)",
                                fontSize: 13,
                            }}
                        >
                            Loading your orders...
                        </Typography>
                    </Box>
                ) : ordersError ? (
                    <Alert severity="error" sx={{ borderRadius: 3 }}>
                        {ordersError}
                    </Alert>
                ) : orders.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 4, sm: 6 },
                            textAlign: "center",
                            borderRadius: "24px",
                            backgroundColor: "#FFFFFF",
                            border: "1px solid rgba(30,45,76,0.10)",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 44,
                                color: "#ACBDAA",
                                mb: 1,
                            }}
                        >
                            ♡
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: "var(--font-anton)",
                                fontSize: 28,
                                color: "#1E2D4C",
                            }}
                        >
                            NO ORDERS YET
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                color: "#858585",
                                fontFamily: "var(--font-montserrat)",
                                fontSize: 13,
                            }}
                        >
                            Your purchases will appear here once you place an
                            order.
                        </Typography>

                        <Button
                            onClick={onBackToShop}
                            sx={{
                                mt: 3,
                                backgroundColor: "#1E2D4C",
                                color: "#FFFFFF",
                                px: 3,
                                py: 1.5,
                                borderRadius: "12px",
                                fontFamily: "var(--font-montserrat)",
                                fontWeight: 700,
                                "&:hover": {
                                    backgroundColor: "#ACBDAA",
                                    color: "#1E2D4C",
                                },
                            }}
                        >
                            Explore Products
                        </Button>
                    </Paper>
                ) : (
                    <Stack spacing={3}>
                        {orders.map((order) => (
                            <Card
                                key={order.id}
                                elevation={0}
                                sx={{
                                    borderRadius: "22px",
                                    border: "1px solid rgba(30,45,76,0.10)",
                                    backgroundColor: "#FFFFFF",
                                    overflow: "hidden",
                                }}
                            >
                                <CardContent
                                    sx={{
                                        p: { xs: 2.5, sm: 3.5 },
                                        "&:last-child": { pb: 3.5 },
                                    }}
                                >

                                    <Stack
                                        direction={{
                                            xs: "column",
                                            sm: "row",
                                        }}
                                        spacing={2}
                                        sx={{
                                            justifyContent: "space-between",
                                            alignItems: {
                                                xs: "flex-start",
                                                sm: "center",
                                            },
                                        }}
                                    >

                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontFamily:
                                                        "var(--font-montserrat)",
                                                    fontSize: 11,
                                                    color: "#858585",
                                                    fontWeight: 700,
                                                    letterSpacing: "0.08em",
                                                }}
                                            >
                                                ORDER NUMBER
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    mt: 0.5,
                                                    fontFamily:
                                                        "var(--font-montserrat)",
                                                    fontWeight: 800,
                                                    color: "#1E2D4C",
                                                    overflowWrap: "anywhere",
                                                }}
                                            >
                                                {order.order_number}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    mt: 0.5,
                                                    fontFamily:
                                                        "var(--font-montserrat)",
                                                    fontSize: 12,
                                                    color: "#858585",
                                                }}
                                            >
                                                Placed on{" "}
                                                {formatDate(order.created_at)}
                                            </Typography>
                                        </Box>

                                        <Chip
                                            label={order.status || "Pending"}
                                            color={getStatusColor(order.status)}
                                            sx={{
                                                fontFamily:
                                                    "var(--font-montserrat)",
                                                fontWeight: 700,
                                                textTransform: "capitalize",
                                            }}
                                        />


                                        {["pending", "processing"].includes(
                                            (order.status || "pending").toLowerCase()
                                        ) && (
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => {
                                                        setCancelMessage("");
                                                        setCancelOrder(order);
                                                    }}
                                                    sx={{
                                                        borderRadius: "10px",
                                                        textTransform: "none",
                                                        fontFamily: "var(--font-montserrat)",
                                                        fontWeight: 700,
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    Cancel Order
                                                </Button>
                                            )}

                                    </Stack>

                                    <Divider sx={{ my: 2.5 }} />

                                    {/* ORDER STATUS TIMELINE */}
                                    <Box
                                        sx={{
                                            p: { xs: 2, sm: 2.5 },
                                            mb: 2,
                                            borderRadius: "16px",
                                            backgroundColor: "#F7F8F5",
                                            border: "1px solid rgba(30,45,76,0.08)",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: "var(--font-montserrat)",
                                                fontWeight: 800,
                                                fontSize: 12,
                                                color: "#1E2D4C",
                                                letterSpacing: "0.08em",
                                                mb: 2.5,
                                            }}
                                        >
                                            ORDER TRACKING
                                        </Typography>

                                        {(order.status || "pending").toLowerCase() === "cancelled" ? (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1.5,
                                                    color: "#C62828",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 34,
                                                        height: 34,
                                                        borderRadius: "50%",
                                                        backgroundColor: "#FDECEC",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontWeight: 800,
                                                        fontSize: 18,
                                                    }}
                                                >
                                                    ×
                                                </Box>

                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "var(--font-montserrat)",
                                                            fontWeight: 800,
                                                            fontSize: 14,
                                                        }}
                                                    >
                                                        Order Cancelled
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "var(--font-montserrat)",
                                                            fontSize: 12,
                                                            color: "#858585",
                                                            mt: 0.5,
                                                        }}
                                                    >
                                                        This order has been cancelled.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    width: "100%",
                                                }}
                                            >
                                                {["Pending", "Processing", "Shipped", "Delivered"].map((step, index) => (
                                                    <Box
                                                        key={step}
                                                        sx={{
                                                            flex: index === 3 ? "0 0 auto" : 1,
                                                            minWidth: 0,
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            {index > 0 && (
                                                                <Box
                                                                    sx={{
                                                                        flex: 1,
                                                                        height: 3,
                                                                        backgroundColor:
                                                                            ["pending", "processing", "shipped", "delivered"].indexOf(
                                                                                (order.status || "pending").toLowerCase()
                                                                            ) >= index
                                                                                ? "#ACBDAA"
                                                                                : "#DADDE2",
                                                                    }}
                                                                />
                                                            )}

                                                            <Box
                                                                sx={{
                                                                    width: 24,
                                                                    height: 24,
                                                                    flexShrink: 0,
                                                                    borderRadius: "50%",
                                                                    border: "2px solid",
                                                                    borderColor:
                                                                        ["pending", "processing", "shipped", "delivered"].indexOf(
                                                                            (order.status || "pending").toLowerCase()
                                                                        ) >= index
                                                                            ? "#ACBDAA"
                                                                            : "#DADDE2",
                                                                    backgroundColor:
                                                                        ["pending", "processing", "shipped", "delivered"].indexOf(
                                                                            (order.status || "pending").toLowerCase()
                                                                        ) >= index
                                                                            ? "#ACBDAA"
                                                                            : "#FFFFFF",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    color: "#1E2D4C",
                                                                    fontSize: 12,
                                                                    fontWeight: 800,
                                                                }}
                                                            >
                                                                {["pending", "processing", "shipped", "delivered"].indexOf(
                                                                    (order.status || "pending").toLowerCase()
                                                                ) >= index
                                                                    ? "✓"
                                                                    : index + 1}
                                                            </Box>

                                                            {index < 3 && (
                                                                <Box
                                                                    sx={{
                                                                        flex: 1,
                                                                        height: 3,
                                                                        backgroundColor:
                                                                            ["pending", "processing", "shipped", "delivered"].indexOf(
                                                                                (order.status || "pending").toLowerCase()
                                                                            ) > index
                                                                                ? "#ACBDAA"
                                                                                : "#DADDE2",
                                                                    }}
                                                                />
                                                            )}
                                                        </Box>

                                                        <Typography
                                                            sx={{
                                                                mt: 1,
                                                                fontFamily: "var(--font-montserrat)",
                                                                fontSize: { xs: 9, sm: 11 },
                                                                fontWeight: 700,
                                                                color:
                                                                    ["pending", "processing", "shipped", "delivered"].indexOf(
                                                                        (order.status || "pending").toLowerCase()
                                                                    ) >= index
                                                                        ? "#1E2D4C"
                                                                        : "#858585",
                                                                textAlign: "center",
                                                                overflowWrap: "anywhere",
                                                            }}
                                                        >
                                                            {step}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </Box>

                                    <Stack spacing={2}>
                                        {(order.order_items || []).map(
                                            (item) => (
                                                <Box
                                                    key={item.id}
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        gap: 2,
                                                    }}
                                                >
                                                    <Box sx={{ minWidth: 0 }}>
                                                        <Typography
                                                            sx={{
                                                                fontFamily:
                                                                    "var(--font-montserrat)",
                                                                fontWeight: 700,
                                                                color: "#1E2D4C",
                                                                fontSize: 14,
                                                                overflowWrap:
                                                                    "anywhere",
                                                            }}
                                                        >
                                                            {item.product_name ||
                                                                "Product"}
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                mt: 0.5,
                                                                fontFamily:
                                                                    "var(--font-montserrat)",
                                                                fontSize: 12,
                                                                color: "#858585",
                                                            }}
                                                        >
                                                            {[
                                                                item.size &&
                                                                `Size: ${item.size}`,
                                                                item.color &&
                                                                `Color: ${item.color}`,
                                                                `Qty: ${item.quantity}`,
                                                            ]
                                                                .filter(Boolean)
                                                                .join(" · ")}
                                                        </Typography>
                                                    </Box>

                                                    <Typography
                                                        sx={{
                                                            flexShrink: 0,
                                                            fontFamily:
                                                                "var(--font-montserrat)",
                                                            fontWeight: 700,
                                                            color: "#1E2D4C",
                                                            fontSize: 13,
                                                        }}
                                                    >
                                                        {formatPrice(
                                                            item.total_price
                                                        )}
                                                    </Typography>
                                                </Box>
                                            )
                                        )}
                                    </Stack>

                                    <Divider sx={{ my: 2.5 }} />

                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Typography
                                                sx={{
                                                    fontFamily:
                                                        "var(--font-montserrat)",
                                                    fontSize: 11,
                                                    color: "#858585",
                                                }}
                                            >
                                                PAYMENT METHOD
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    mt: 0.5,
                                                    fontFamily:
                                                        "var(--font-montserrat)",
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: "#1E2D4C",
                                                }}
                                            >
                                                {(
                                                    order.payment_method || "COD"
                                                )
                                                    .replaceAll("_", " ")
                                                    .toUpperCase()}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    mt: 0.5,
                                                    fontFamily:
                                                        "var(--font-montserrat)",
                                                    fontSize: 12,
                                                    color: "#858585",
                                                }}
                                            >
                                                Payment:{" "}
                                                {(
                                                    order.payment_status ||
                                                    "Pending"
                                                )
                                                    .replaceAll("_", " ")
                                                    .toUpperCase()}
                                            </Typography>
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <Typography
                                                sx={{
                                                    fontFamily:
                                                        "var(--font-montserrat)",
                                                    fontSize: 11,
                                                    color: "#858585",
                                                }}
                                            >
                                                ORDER TOTAL
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    mt: 0.5,
                                                    fontFamily:
                                                        "var(--font-montserrat)",
                                                    fontWeight: 800,
                                                    fontSize: 23,
                                                    color: "#1E2D4C",
                                                }}
                                            >
                                                {formatPrice(
                                                    order.total_amount
                                                )}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    mt: 0.5,
                                                    fontFamily:
                                                        "var(--font-montserrat)",
                                                    fontSize: 12,
                                                    color: "#858585",
                                                }}
                                            >
                                                Shipping:{" "}
                                                {formatPrice(order.shipping_fee)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                )}
            </Box>

            <Dialog
                open={Boolean(cancelOrder)}
                onClose={() => {
                    if (!cancelling) {
                        setCancelOrder(null);
                        setCancelMessage("");
                    }
                }}
                fullWidth
                maxWidth="xs"
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: "20px",
                            p: 1,
                        },
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontFamily: "var(--font-anton)",
                        color: "#1E2D4C",
                        fontSize: 28,
                    }}
                >
                    CANCEL ORDER?
                </DialogTitle>

                <DialogContent>
                    <Typography
                        sx={{
                            fontFamily: "var(--font-montserrat)",
                            fontSize: 13,
                            color: "#858585",
                            lineHeight: 1.8,
                        }}
                    >
                        Are you sure you want to cancel order{" "}
                        <strong>{cancelOrder?.order_number}</strong>?
                        This action cannot be undone.
                    </Typography>

                    {cancelMessage && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {cancelMessage}
                        </Alert>
                    )}
                </DialogContent>

                <DialogActions sx={{ px: 2, pb: 2, gap: 1 }}>
                    <Button
                        disabled={cancelling}
                        onClick={() => {
                            setCancelOrder(null);
                            setCancelMessage("");
                        }}
                        sx={{
                            color: "#1E2D4C",
                            textTransform: "none",
                        }}
                    >
                        Keep Order
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        disabled={cancelling}
                        onClick={handleCancelOrder}
                        sx={{ textTransform: "none", borderRadius: "10px" }}
                    >
                        {cancelling ? "Cancelling..." : "Confirm Cancellation"}
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}


const fieldStyles = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "14px",
        backgroundColor: "#FAFAF8",
        fontFamily: "var(--font-montserrat)",
        fontSize: "13px",

        "& fieldset": {
            borderColor: "rgba(30,45,76,0.15)",
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
        fontSize: "13px",
        color: "#858585",
    },

    "& .MuiInputLabel-root.Mui-focused": {
        color: "#1E2D4C",
    },
};