import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Dimensions, 
    TextInput
} from "react-native"

const {width, height} = Dimensions.get("window");

export default class ToDo extends Component {
    state ={
        isEditing: false,
        isCompleted: false,
        ToDoValue: ""
    };

    render() {
        const {isCompleted, isEditing} = this.state;
        const { text } = this.props;
        
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                <TouchableOpacity onPress={this._toggleComplete}>
                    <View style={[styles.circle, 
                        isCompleted ? styles.completedCircle : styles.uncompletedCircle]}>
                    </View>
                </TouchableOpacity>
                {isEditing? (
                    <TextInput 
                        style={[
                            styles.input, 
                            styles.text,
                            isCompleted ? styles.completedText : styles.uncompletedText
                        ]}
                        value={this.state.ToDoValue}
                        multiline={true}
                        onChangeText={this._controllInput}
                        returnKeyType={"done"}
                        onBlur={this._finishEditing}
                    />
                    ) : (
                    <Text 
                    style={[
                        styles.text, 
                        isCompleted ? styles.completedText : styles.uncompletedText
                        ]}
                    >
                        {text}
                    </Text>
                )}
                </View>
                    { isEditing ? (
                        <View style={styles.action}>
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✅</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.action}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✎</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>❌</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) }
            </View>
        );
    }
    _toggleComplete = () => {
        this.setState(prevState => {
            return{
                isCompleted: !prevState.isCompleted
            };
        });
    }
    _startEditing = () => {
        const {text} = this.props;
        this.setState({ isEditing: true, ToDoValue: text });
    };
    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };
    _controllInput = (text ) => {
        this.setState({ToDoValue : text});
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor:"#bbb"
    },
    uncompletedCircle: {
        borderColor: "#F23657"
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        marginVertical: 20
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
        justifyContent: "space-between"
    },
    action: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        marginVertical: 15
    }
});