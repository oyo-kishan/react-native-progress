import React, { useRef, useEffect } from 'react';
import { View, Dimensions, Animated, TextInput } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';



const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const Progress = ({ percentage, width, height ,strokeWidth ,strokeColor,strokeBackgroundColor}) => {
    const stroke = strokeWidth
    const radius = (Math.min(height,width) - 2 * stroke) / 2
    const circumference = 2 * Math.PI * radius
    const origin = radius + stroke;

    const circleRef = useRef();
    const textRef = useRef();
    const animated = useRef(new Animated.Value(0)).current

    const animation = (toValue) => {
        Animated.timing(animated, {
            toValue,
            duration: 500,
            delay: 0,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        animation(percentage);
        animated.addListener((animation) => {
            const strokeDashoffset =circumference- circumference * animation.value/ 100;
            if (textRef?.current) {
                textRef.current.setNativeProps({
                    text: `${Math.round(animation.value)}`
                })
            }
            if (circleRef?.current) {
                circleRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        })
        return ()=>{
            animated.removeAllListeners();
        }
    }, []);


    return (
        <View style={{ height: (radius+stroke)*2, width : (radius+stroke)*2, justifyContent: 'center', alignItems: 'center' }}>
            <Svg height="100%" width="100%">
                <G height="100%" width="100%">
                    <Circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke={strokeBackgroundColor}
                        strokeWidth={stroke}
                    />

                    <AnimatedCircle
                        ref={circleRef}
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke={strokeColor}
                        strokeWidth={stroke}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        transform={`rotate(-90 , ${origin}, ${origin})`}

                    />

                </G>
            </Svg>

            <AnimatedInput
                ref={textRef}
                editable={false}
                defaultValue="0"
                underlineColorAndroid={false}
                style={[
                    { position: 'absolute', fontSize: 0.75 * radius, color: strokeColor, padding:16, textAlign: "center", fontWeight: 'bold' }]} />

        </View>
    )
}

export default Progress;