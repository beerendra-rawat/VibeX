import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
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

    useEffect(() => {
        const saveUser = async () => {
            if (user) {
                await AsyncStorage.setItem("user", JSON.stringify(user));
            } else {
                await AsyncStorage.removeItem("user");
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