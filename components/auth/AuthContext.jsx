"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { supabase } from "../../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ============================================
    // CHECK CURRENT SESSION
    // ============================================

    useEffect(() => {
        let mounted = true;

        const loadUser = async () => {
            try {
                // getSession() is safe when nobody is logged in.
                const {
                    data: { session },
                    error,
                } = await supabase.auth.getSession();

                if (error) {
                    console.error(
                        "Unable to get auth session:",
                        error
                    );
                }

                if (mounted) {
                    setUser(
                        session?.user || null
                    );
                    setLoading(false);
                }
            } catch (error) {
                console.error(
                    "Unable to load auth session:",
                    error
                );

                if (mounted) {
                    setUser(null);
                    setLoading(false);
                }
            }
        };

        loadUser();

        // ============================================
        // LISTEN FOR AUTH CHANGES
        // ============================================

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (!mounted) return;

                setUser(
                    session?.user || null
                );

                setLoading(false);
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    // ============================================
    // LOGIN
    // ============================================

    const login = async (
        email,
        password
    ) => {
        try {
            const {
                data,
                error,
            } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            });

            if (error) {
                return {
                    success: false,
                    message:
                        error.message ||
                        "Incorrect email or password.",
                };
            }

            setUser(data.user);

            return {
                success: true,
                user: data.user,
            };
        } catch (error) {
            console.error(
                "Login error:",
                error
            );

            return {
                success: false,
                message:
                    "Something went wrong. Please try again.",
            };
        }
    };

    // ============================================
    // REGISTER
    // ============================================

    const register = async (
        name,
        email,
        password
    ) => {
        try {
            const {
                data,
                error,
            } = await supabase.auth.signUp({
                email: email.trim(),
                password,
                options: {
                    data: {
                        full_name: name.trim(),
                    },
                },
            });

            if (error) {
                return {
                    success: false,
                    message:
                        error.message ||
                        "Unable to create account.",
                };
            }

            // ========================================
            // EMAIL CONFIRMATION REQUIRED
            // ========================================

            if (
                data.user &&
                !data.session
            ) {
                return {
                    success: true,
                    needsConfirmation: true,
                    message:
                        "Account created. Please check your email to confirm your account.",
                };
            }

            // ========================================
            // AUTO LOGIN
            // ========================================

            setUser(data.user);

            return {
                success: true,
                user: data.user,
            };
        } catch (error) {
            console.error(
                "Registration error:",
                error
            );

            return {
                success: false,
                message:
                    "Something went wrong. Please try again.",
            };
        }
    };

    // ============================================
    // LOGOUT
    // ============================================

    const logout = async () => {
        try {
            const { error } =
                await supabase.auth.signOut();

            if (error) {
                console.error(
                    "Logout error:",
                    error
                );
            }

            setUser(null);
        } catch (error) {
            console.error(
                "Logout error:",
                error
            );

            setUser(null);
        }
    };

    // ============================================
    // CONTEXT
    // ============================================

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ============================================
// HOOK
// ============================================

export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}