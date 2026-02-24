import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user securely
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await SecureStore.getItemAsync("user");

                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.log("Load user error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    // Save user securely
    useEffect(() => {
        const saveUser = async () => {
            try {
                if (user) {
                    await SecureStore.setItemAsync(
                        "user",
                        JSON.stringify(user)
                    );
                } else {
                    await SecureStore.deleteItemAsync("user");
                }
            } catch (error) {
                console.log("Save user error:", error);
            }
        };

        saveUser();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};