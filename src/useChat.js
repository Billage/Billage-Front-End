import {
    useEffect,
    useRef,
    useState
} from "react";
import moment from "moment";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const useChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
            timeStamp: moment().format('YYYY-MM-DD hh:mm'),
            date: moment().format('YYYY년 MM월 DD일'),
        });
    };

    return {
        messages,
        sendMessage
    };
};

export default useChat;