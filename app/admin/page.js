
"use client";

import { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { supabase } from "@/lib/supabase";

const ORDER_STATUSES = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
];

const NAVY = "#1E2D4C";

function formatDate(value) {
    if (!value) return "—";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleDateString("en-IN");
}

function formatMoney(value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(Number(value) || 0);
}

function normalizeStatus(value) {
    return String(value || "").trim().toLowerCase();
}

export default function AdminPage() {
    const [orders, setOrders] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState({});
    const [loading, setLoading] = useState(true);
    const [savingIds, setSavingIds] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Verify the authenticated user and load orders.
    const loadOrders = useCallback(async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const {
                data: { user },
                error: authError,
            } = await supabase.auth.getUser();

            console.log("SIGNED-IN USER:", user);
            console.log("SIGNED-IN USER ID:", user?.id);

            if (authError) {
                throw new Error(`Authentication error: ${authError.message}`);
            }

            if (!user) {
                throw new Error("No signed-in user. Please log in again.");
            }

            const {
                data: profile,
                error: profileError,
            } = await supabase
                .from("profiles")
                .select("id, full_name, role")
                .eq("id", user.id)
                .maybeSingle();

            console.log("PROFILE FETCHED:", profile);
            console.log("PROFILE ERROR:", profileError);
            console.log("PROFILE ROLE:", profile?.role);

            if (profileError) {
                throw new Error(
                    `Profile query failed: ${profileError.message}`
                );
            }

            if (!profile) {
                throw new Error(
                    `No profile exists for signed-in user ${user.id}.`
                );
            }

            if (String(profile.role || "").trim().toLowerCase() !== "admin") {
                throw new Error(
                    `Access denied. Profile role received: "${profile.role}".`
                );
            }

            if (normalizeStatus(profile.role) !== "admin") {
                throw new Error(
                    `Access denied. Signed-in account "${user.email || user.id}" has role "${profile.role || "not set"}". Sign in with the account whose profile role is admin.`
                );
            }

            const { data, error: ordersError } = await supabase
                .from("orders")
                .select("*")
                .order("created_at", { ascending: false });

            if (ordersError) {
                throw new Error(`Could not load orders: ${ordersError.message}`);
            }

            const fetchedOrders = data || [];

            setOrders(fetchedOrders);

            const initialStatuses = {};
            fetchedOrders.forEach((order) => {
                if (order.id) {
                    initialStatuses[order.id] = normalizeStatus(order.status);
                }
            });

            setSelectedStatuses(initialStatuses);
        } catch (err) {
            console.error("Admin page load failed:", err);
            setError(err?.message || "Could not load orders.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    function handleStatusChange(orderId, newStatus) {
        setSelectedStatuses((previous) => ({
            ...previous,
            [orderId]: normalizeStatus(newStatus),
        }));

        setError("");
        setSuccess("");
    }

    // Update exactly one order using its database UUID.
    async function updateOrderStatus(order) {
        setError("");
        setSuccess("");

        const orderId = order?.id;
        const newStatus = normalizeStatus(selectedStatuses[orderId]);

        console.log("ORDER BEING UPDATED:", order);
        console.log("ORDER UUID:", orderId);
        console.log("SELECTED STATUS:", newStatus);

        if (!orderId) {
            setError("Order UUID is missing. Refresh the orders and try again.");
            return;
        }

        if (!ORDER_STATUSES.includes(newStatus)) {
            setError("Please select a valid order status.");
            return;
        }

        const currentStatus = normalizeStatus(order.status);

        if (currentStatus === "cancelled" && newStatus !== "cancelled") {
            setError("Cancelled orders cannot be reopened.");
            return;
        }

        if (newStatus === currentStatus) {
            setError("Please select a different status before saving.");
            return;
        }

        setSavingIds((previous) => [...previous, orderId]);

        try {
            // Recheck the session before attempting a write.
            const {
                data: { user },
                error: authError,
            } = await supabase.auth.getUser();

            if (authError) {
                throw new Error(`Authentication failed: ${authError.message}`);
            }

            if (!user) {
                throw new Error("Your session has expired. Please sign in again.");
            }

            const { data, error: updateError } = await supabase
                .from("orders")
                .update({ status: newStatus })
                .eq("id", orderId)
                .select("id, order_number, status")
                .maybeSingle();

            if (updateError) {
                console.error("SUPABASE UPDATE ERROR:", updateError);
                throw new Error(
                    `Order update failed: ${updateError.message} (code: ${updateError.code || "unknown"})`
                );
            }

            if (!data) {
                throw new Error(
                    "Supabase updated 0 rows. Check that this order UUID exists and that the orders UPDATE policy permits this admin account. Also check any database triggers."
                );
            }

            // Update the visible row only after Supabase confirms success.
            setOrders((previous) =>
                previous.map((item) =>
                    item.id === data.id
                        ? { ...item, status: data.status }
                        : item
                )
            );

            setSelectedStatuses((previous) => ({
                ...previous,
                [data.id]: normalizeStatus(data.status),
            }));

            setSuccess(
                `Order ${data.order_number || data.id} updated to ${data.status}.`
            );
        } catch (err) {
            console.error("ORDER STATUS UPDATE FAILED:", err);
            setError(err?.message || "Failed to update order status.");
        } finally {
            setSavingIds((previous) =>
                previous.filter((id) => id !== orderId)
            );
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#F7F8F5",
                color: NAVY,
                py: { xs: 4, md: 6 },
            }}
        >
            <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { xs: "flex-start", md: "center" },
                        justifyContent: "space-between",
                        gap: 3,
                        mb: 3,
                    }}
                >
                    <Box>
                        <Typography
                            component="h1"
                            sx={{
                                fontFamily: "Anton, sans-serif",
                                fontSize: { xs: 42, md: 64 },
                                lineHeight: 1.1,
                                color: NAVY,
                            }}
                        >
                            CHŌYIFY ADMIN
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: { xs: 18, md: 26 },
                                color: "#858585",
                            }}
                        >
                            Order management
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={loadOrders}
                        disabled={loading}
                        sx={{
                            bgcolor: NAVY,
                            px: 4,
                            py: 1.5,
                            fontWeight: 700,
                            textTransform: "none",
                            "&:hover": { bgcolor: "#30466F" },
                        }}
                    >
                        {loading ? "Refreshing..." : "Refresh Orders"}
                    </Button>
                </Box>

                {error && (
                    <Alert
                        severity="error"
                        onClose={() => setError("")}
                        sx={{ mb: 3, whiteSpace: "pre-wrap" }}
                    >
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert
                        severity="success"
                        onClose={() => setSuccess("")}
                        sx={{ mb: 3 }}
                    >
                        {success}
                    </Alert>
                )}

                {loading ? (
                    <Box
                        sx={{
                            minHeight: 250,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 2,
                        }}
                    >
                        <CircularProgress sx={{ color: NAVY }} />
                        <Typography>Loading orders...</Typography>
                    </Box>
                ) : error && orders.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            border: "1px solid #E0E4E0",
                            bgcolor: "#FFFFFF",
                        }}
                    >
                        <Typography sx={{ mb: 2 }}>
                            Order management could not be loaded.
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={loadOrders}
                            sx={{ bgcolor: NAVY }}
                        >
                            Try Again
                        </Button>
                    </Paper>
                ) : orders.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            textAlign: "center",
                            border: "1px solid #E0E4E0",
                        }}
                    >
                        <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
                            No orders found
                        </Typography>
                        <Typography sx={{ mt: 1, color: "#858585" }}>
                            New customer orders will appear here.
                        </Typography>
                    </Paper>
                ) : (
                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                            border: "1px solid #DDE2DD",
                            borderRadius: 0,
                            overflowX: "auto",
                        }}
                    >
                        <Table sx={{ minWidth: 1050 }}>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "#EEF1EC" }}>
                                    {[
                                        "ORDER",
                                        "DATE",
                                        "PAYMENT",
                                        "TOTAL",
                                        "STATUS",
                                        "UPDATE STATUS",
                                    ].map((heading) => (
                                        <TableCell
                                            key={heading}
                                            sx={{
                                                py: 2.5,
                                                fontWeight: 800,
                                                color: NAVY,
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {heading}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {orders.map((order) => {
                                    const orderId = order.id;
                                    const currentStatus = normalizeStatus(order.status);
                                    const selectedStatus =
                                        selectedStatuses[orderId] ?? currentStatus;
                                    const isSaving = savingIds.includes(orderId);
                                    const isCancelled = currentStatus === "cancelled";

                                    return (
                                        <TableRow
                                            key={orderId}
                                            sx={{
                                                "&:hover": { bgcolor: "#FAFBF9" },
                                                "& td": { py: 3 },
                                            }}
                                        >
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 800,
                                                        color: NAVY,
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {order.order_number || orderId}
                                                </Typography>
                                            </TableCell>

                                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                                                {formatDate(order.created_at)}
                                            </TableCell>

                                            <TableCell>
                                                {order.payment_method ||
                                                    order.payment_status ||
                                                    "—"}
                                            </TableCell>

                                            <TableCell sx={{ whiteSpace: "nowrap" }}>
                                                <Typography sx={{ fontWeight: 800 }}>
                                                    {formatMoney(
                                                        order.total_amount ??
                                                        order.total ??
                                                        order.grand_total
                                                    )}
                                                </Typography>
                                            </TableCell>

                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: "inline-block",
                                                        px: 1.5,
                                                        py: 0.8,
                                                        bgcolor:
                                                            currentStatus === "delivered"
                                                                ? "#DDF2DF"
                                                                : isCancelled
                                                                    ? "#FCE4E4"
                                                                    : "#078AC8",
                                                        color:
                                                            currentStatus === "delivered"
                                                                ? "#245A2A"
                                                                : isCancelled
                                                                    ? "#A32121"
                                                                    : "#FFFFFF",
                                                        fontWeight: 700,
                                                        textTransform: "capitalize",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {currentStatus || "unknown"}
                                                </Box>
                                            </TableCell>

                                            <TableCell sx={{ minWidth: 250 }}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 1.5,
                                                    }}
                                                >
                                                    <FormControl fullWidth size="small">
                                                        <Select
                                                            value={selectedStatus}
                                                            onChange={(event) =>
                                                                handleStatusChange(
                                                                    orderId,
                                                                    event.target.value
                                                                )
                                                            }
                                                            disabled={isSaving || isCancelled}
                                                            inputProps={{
                                                                "aria-label": `Status for order ${order.order_number || orderId
                                                                    }`,
                                                            }}
                                                        >
                                                            {ORDER_STATUSES.map((status) => (
                                                                <MenuItem
                                                                    key={status}
                                                                    value={status}
                                                                    sx={{ textTransform: "capitalize" }}
                                                                >
                                                                    {status}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>

                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        disabled={
                                                            isSaving ||
                                                            !orderId ||
                                                            !selectedStatus ||
                                                            selectedStatus === currentStatus ||
                                                            isCancelled
                                                        }
                                                        onClick={() => updateOrderStatus(order)}
                                                        sx={{
                                                            bgcolor: NAVY,
                                                            py: 1.3,
                                                            fontWeight: 800,
                                                            textTransform: "none",
                                                            "&:hover": { bgcolor: "#30466F" },
                                                        }}
                                                    >
                                                        {isSaving ? (
                                                            <CircularProgress
                                                                size={20}
                                                                sx={{ color: "#FFFFFF" }}
                                                            />
                                                        ) : (
                                                            "Save Status"
                                                        )}
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <Typography
                    sx={{
                        mt: 3,
                        color: "#858585",
                        fontSize: { xs: 14, md: 17 },
                    }}
                >
                    Order statuses are stored in Supabase and displayed in customer
                    order history.
                </Typography>
            </Container>
        </Box>
    );
}
