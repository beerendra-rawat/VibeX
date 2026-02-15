import { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9;
const SPACING = 10;

const icons = {
    play: require("../assets/img/playy.png"),
    heart: require("../assets/img/heart.png"),
    download: require("../assets/img/download.png"),
    dots: require("../assets/img/dots.png"),
};

const cardData = [
    {
        id: 1,
        title: "Discover weekly",
        description: "The original slow instrumental best playlists.",
        image: require("../assets/img/card1.png"),
    },
    {
        id: 2,
        title: "Top Hits",
        description: "Trending music from around the world.",
        image: require("../assets/img/card1.png"),
    },
    {
        id: 3,
        title: "Chill Vibes",
        description: "Relax and enjoy calm instrumental beats.",
        image: require("../assets/img/card1.png"),
    },
];

export default function AutoSliderCard() {
    const scrollRef = useRef(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const next = (index + 1) % cardData.length;
            scrollRef.current?.scrollTo({
                x: next * (CARD_WIDTH + SPACING),
                animated: true,
            });
            setIndex(next);
        }, 4000);

        return () => clearInterval(interval);
    }, [index]);

    const handleScroll = (e) => {
        const slide = Math.round(
            e.nativeEvent.contentOffset.x / (CARD_WIDTH + SPACING)
        );
        setIndex(slide);
    };

    return (
        <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled={false}
            snapToInterval={CARD_WIDTH + SPACING}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: (width - CARD_WIDTH) / 2,
            }}
            onMomentumScrollEnd={handleScroll}
        >
            {cardData.map((item) => (
                <View key={item.id} style={styles.card}>
                    <View style={styles.left}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.desc}>{item.description}</Text>

                        <View style={styles.iconRow}>
                            <TouchableOpacity style={styles.playBtn}>
                                <Image source={icons.play} style={styles.playIcon} />
                            </TouchableOpacity>

                            {[icons.heart, icons.download, icons.dots].map(
                                (icon, i) => (
                                    <TouchableOpacity key={i}>
                                        <Image source={icon} style={styles.icon} />
                                    </TouchableOpacity>
                                )
                            )}
                        </View>
                    </View>

                    <Image source={item.image} style={styles.image} />
                </View>
            ))}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: 180,
        backgroundColor: "#C9A7EB",
        borderRadius: 25,
        padding: 20,
        marginRight: SPACING,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    left: {
        flex: 1,
        paddingRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
    },
    desc: {
        fontSize: 14,
        marginTop: 8,
        color: "#333",
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop: 20,
    },
    playBtn: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: "#5E2B97",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },
    playIcon: {
        width: 18,
        height: 18,
        tintColor: "#fff",
        resizeMode: "contain",
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 18,
        resizeMode: "contain",
    },
    image: {
        position: 'relative',
        width: "50%",
        height:  "100%",
        borderRadius: 22,
        resizeMode: 'contain'
    },
});